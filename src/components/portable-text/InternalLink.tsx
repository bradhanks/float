// src/components/portable-text/InternalLink.tsx
'use client';

import Link from 'next/link';

interface InternalLinkProps {
  children: React.ReactNode;
  value?: {
    slug?: string;
    type?: string;
  };
}

export function InternalLink({ children, value }: InternalLinkProps) {
  if (!value?.slug || !value?.type) {
    return <span className="text-red-500">[Internal link is broken]</span>;
  }

  // Construct the URL based on the document type
  // Assumes a pluralized route, e.g., /posts/[slug], /caseStudies/[slug]
  const href = `/${value.type}s/${value.slug}`;

  return (
    <Link href={href} className="text-emerald-600 hover:underline">
      {children}
    </Link>
  );
}
