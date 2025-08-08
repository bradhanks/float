// src/lib/scripts/import-gdoc-folder.ts

import { google, docs_v1, drive_v3 } from 'googleapis';
import { createClient, SanityClient } from '@sanity/client';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import 'dotenv/config';

// --- Sanity Configuration ---
const sanityConfig = {
  // Find these in your Sanity project management console
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN, // A write token is required
  useCdn: false, // `false` is required for write operations
  apiVersion: '2024-07-01', // Use a recent API version
};

// --- Google Cloud Configuration ---
const GCLOUD_PROJECT_CONFIG = {
  // Path to your service account key file
  keyFile: path.resolve(process.env.GCP_CREDENTIALS_PATH || 'path/to/your/credentials.json'),
  // Scopes must include both Docs (readonly) and Drive (readonly)
  scopes: [
    'https://www.googleapis.com/auth/documents.readonly',
    'https://www.googleapis.com/auth/drive.readonly',
  ],
};

// --- Folder to Watch ---
// The ID of the Google Drive folder you want to monitor
const GDRIVE_FOLDER_ID = process.env.GDRIVE_FOLDER_ID || 'YOUR_GDRIVE_FOLDER_ID';

// --- Author Reference ---
// The Sanity document ID for the default author of these posts
const DEFAULT_AUTHOR_ID = process.env.DEFAULT_AUTHOR_ID || 'author-id-in-sanity';

/**
 * ============================================================================
 * Google Doc to Sanity Portable Text Converter
 *
 * This is a simplified parser. It handles basic paragraphs, headings (H1-H6),
 * bulleted lists, and common text formatting (bold, italic, underline).
 * It does NOT handle images, tables, or complex styling.
 * ============================================================================
 */
async function convertGDocToPortableText(doc: docs_v1.Schema$Document): Promise<any[]> {
  const portableTextBody: any[] = [];
  if (!doc.body?.content) {
    return [];
  }

  for (const element of doc.body.content) {
    if (element.paragraph) {
      const paragraph = element.paragraph;
      const textElements = paragraph.elements;

      // --- Handle Headings ---
      const style = paragraph.paragraphStyle?.namedStyleType;
      let blockStyle = 'normal';
      if (style?.startsWith('HEADING_')) {
        blockStyle = `h${style.replace('HEADING_', '')}`;
      }

      // --- Handle List Items ---
      let listItem: string | undefined = undefined;
      if (paragraph.bullet) {
        listItem = 'bullet';
      }

      const children: any[] = textElements?.map((textElement) => {
        if (textElement.textRun && textElement.textRun.content) {
          const textRun = textElement.textRun;
          const marks: string[] = [];

          // --- Handle Marks (bold, italic, etc.) ---
          if (textRun.textStyle?.bold) marks.push('strong');
          if (textRun.textStyle?.italic) marks.push('em');
          if (textRun.textStyle?.underline) marks.push('underline');

          // Replace tabs and non-breaking spaces with regular spaces
          const textContent = textRun.content?.replace(/\v|\u00a0/g, ' ').replace(/\t/g, '');

          if (textContent?.trim().length === 0) return null;

          return {
            _type: 'span',
            text: textContent,
            marks: marks,
          };
        }
        return null;
      }).filter(Boolean) as any[];

      if (children.length > 0) {
        const block: any = {
          _type: 'block',
          _key: uuidv4(),
          style: blockStyle,
          markDefs: [],
          children: children,
        };

        if (listItem) {
          block.listItem = listItem;
          // Note: This simplified parser doesn't handle list levels.
          // For nested lists, you would need to inspect `paragraph.bullet.nestingLevel`.
        }

        portableTextBody.push(block);
      }
    }
  }
  return portableTextBody;
}


/**
 * ============================================================================
 * Main Import Logic
 * ============================================================================
 */
async function main() {
  console.log('🚀 Starting Google Docs import process...');

  if (!GDRIVE_FOLDER_ID || GDRIVE_FOLDER_ID === 'YOUR_GDRIVE_FOLDER_ID') {
    console.error('❌ Error: Google Drive Folder ID is not configured. Please set GDRIVE_FOLDER_ID in your environment.');
    process.exit(1);
  }

  // --- Initialize Clients ---
  const sanityClient = createClient(sanityConfig);
  const auth = new google.auth.GoogleAuth(GCLOUD_PROJECT_CONFIG);
  const drive = google.drive({ version: 'v3', auth });
  const docs = google.docs({ version: 'v1', auth });

  try {
    // 1. Get IDs of already imported documents from Sanity
    console.log('🔍 Fetching already imported document IDs from Sanity...');
    const query = '*[_type == "post" && defined(googleDocId)][].googleDocId';
    const importedDocIds = await sanityClient.fetch<string[]>(query);
    console.log(`✅ Found ${importedDocIds.length} previously imported documents.`);

    // 2. Get all documents from the specified Google Drive folder
    console.log(`📂 Fetching documents from Google Drive Folder ID: ${GDRIVE_FOLDER_ID}`);
    const res = await drive.files.list({
      q: `'${GDRIVE_FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.document' and trashed = false`,
      fields: 'files(id, name)',
    });
    const driveFiles = res.data.files;
    if (!driveFiles || driveFiles.length === 0) {
      console.log('No documents found in the Google Drive folder. Exiting.');
      return;
    }
    console.log(`✅ Found ${driveFiles.length} total documents in the folder.`);

    // 3. Filter out the documents that have already been imported
    const newFilesToImport = driveFiles.filter(
      (file) => file.id && !importedDocIds.includes(file.id)
    );

    if (newFilesToImport.length === 0) {
      console.log('✨ No new documents to import. All systems up to date!');
      return;
    }

    console.log(`⏳ Found ${newFilesToImport.length} new documents to import. Starting import...`);

    // 4. Process each new document
    for (const file of newFilesToImport) {
      const { id: documentId, name: title } = file;
      if (!documentId || !title) continue;

      console.log(`\n--- Importing: "${title}" (ID: ${documentId}) ---`);

      try {
        // Fetch the full document content
        const { data: doc } = await docs.documents.get({ documentId });
        console.log(`📄 Fetched document content for "${doc.title}"`);

        // Convert GDoc content to Portable Text
        const portableTextBody = await convertGDocToPortableText(doc);
        console.log('🔄 Converted to Portable Text.');

        // Prepare the document for Sanity
        const sanityDocument = {
          _type: 'post',
          // Add the googleDocId to prevent future re-imports
          googleDocId: documentId,
          title: doc.title || title,
          slug: {
            _type: 'slug',
            current: (doc.title || title).toLowerCase().replace(/\s+/g, '-').slice(0, 96),
          },
          author: {
            _type: 'reference',
            _ref: DEFAULT_AUTHOR_ID,
          },
          publishedAt: new Date().toISOString(),
          body: portableTextBody,
          excerpt: 'This post was imported from a Google Doc.',
        };

        // Create the document in Sanity
        const createdDocument = await sanityClient.create(sanityDocument);
        console.log(`🎉 Successfully created document in Sanity with ID: ${createdDocument._id}`);

      } catch (importError) {
        console.error(`❌ Failed to import document "${title}" (ID: ${documentId})`);
        console.error(importError);
      }
    }

    console.log('\n✅ Import process finished.');

  } catch (error) {
    console.error('❌ An unexpected error occurred during the main process:');
    console.error(error);
    process.exit(1);
  }
}

main();
