// src/components/PortableTextRenderer.tsx
'use client';

import { PortableText, PortableTextComponents } from '@portabletext/react';
import { SanityImage } from '@/components/portable-text/SanityImage'; // We'll create this
import { CodeBlock, InlineCode } from '@/components/mdx/CodeBlock';
import { Button } from '@/components/Button';
import { Blockquote } from '@/components/Blockquote';
import { InternalLink } from '@/components/portable-text/InternalLink'; // We'll create this

// This is the central mapping of Sanity types to React components.
// It can be used for any Portable Text field in your project.
const components: PortableTextComponents = {
  // Custom block types
  types: {
    image: ({ value }) => <SanityImage value={value} />,
    code: ({ value }) => <CodeBlock language={value.language}>{value.code}</CodeBlock>,
    callToAction: ({ value }) => (
      <div className="my-8 text-center">
        <Button href={value.link} mode={value.style ?? 'primary'}>
          {value.text}
        </Button>
      </div>
    ),
    // Add other custom types for case studies here, e.g., pullQuote, statsBlock
  },

  // Custom mark decorators
  marks: {
    internalLink: InternalLink,
    link: ({ children, value }) => {
      const rel = value?.href && !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value?.href} rel={rel} target={value?.blank ? '_blank' : '_self'} className="text-emerald-600 hover:underline">
          {children}
        </a>
      );
    },
    code: ({ children }) => <InlineCode>{children}</InlineCode>,
  },

  // Custom block styles
  block: {
    h2: ({ children }) => <h2 className="text-3xl font-bold my-6">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold my-4">{children}</h3>,
    blockquote: ({ children }) => (
      <Blockquote
        className="my-8"
        author={{ name: '', role: '' }}
        image={undefined}
      >
        {children}
      </Blockquote>
    ),
  },

  // Custom list styles
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside my-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside my-4 space-y-2">{children}</ol>,
  },
};

export function PortableTextRenderer({ value }: { value: any }) {
  return <PortableText value={value} components={components} />;
}
