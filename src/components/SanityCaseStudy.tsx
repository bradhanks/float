// src/components/SanityCaseStudy.tsx
'use client';

import { SanityDocument } from '@sanity/client';
import { Container } from '@/components/Container';
import { FadeIn } from '@/components/FadeIn';
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage';
import { PageIntro } from '@/components/PageIntro';
import { PortableTextRenderer } from '@/components/PortableTextRenderer';
import { useNextSanityImage } from 'next-sanity-image';
import { client } from '@/sanity/lib/client';
import { Button } from './Button';

// --- Main Component ---
export const SanityCaseStudy = ({ caseStudy }: { caseStudy: SanityDocument }) => {
  // --- Not Found State ---
  if (!caseStudy) {
    return (
      <PageIntro eyebrow="Error" title="Case Study not found">
        <p>This case study could not be found. Please check the URL.</p>
        <Button href="/work" className="mt-8">
          Back to Case Studies
        </Button>
      </PageIntro>
    );
  }

  const featuredImageProps = useNextSanityImage(
    client,
    caseStudy.featuredImage
  ) as { src: string;[key: string]: any } | null;

  return (
    <article className="mt-24 sm:mt-32 lg:mt-40">
      <header>
        <PageIntro eyebrow="Case Study" title={caseStudy.title} centered>
          <p>{caseStudy.summary}</p>
        </PageIntro>

        <FadeIn>
          <div className="mt-24 border-t border-neutral-200 bg-white/50 sm:mt-32 lg:mt-40">
            <Container>
              <div className="mx-auto max-w-5xl">
                <dl className="-mx-6 grid grid-cols-1 text-sm text-neutral-950 sm:mx-0 sm:grid-cols-3">
                  <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-t-0 sm:border-l">
                    <dt className="font-semibold">Client</dt>
                    <dd>{caseStudy.client?.name || 'N/A'}</dd>
                  </div>
                  <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-t-0 sm:border-l">
                    <dt className="font-semibold">Year</dt>
                    <dd>
                      <time dateTime={caseStudy.date.split('-')}>
                        {caseStudy.date.split('-')}
                      </time>
                    </dd>
                  </div>
                  <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-t-0 sm:border-l">
                    <dt className="font-semibold">Service</dt>
                    <dd>{caseStudy.service}</dd>
                  </div>
                </dl>
              </div>
            </Container>
          </div>

          {featuredImageProps?.src && (
            <div className="border-y border-neutral-200 bg-neutral-100">
              <div className="mx-auto -my-px max-w-304 bg-neutral-200">
                <GrayscaleTransitionImage
                  {...featuredImageProps}
                  quality={90}
                  className="w-full"
                  sizes="(min-width: 1216px) 76rem, 100vw"
                  alt={caseStudy.featuredImage?.alt || ''}
                />
              </div>
            </div>
          )}
        </FadeIn>
      </header>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          {/* Here we use our generic renderer for the main content */}
          <div className="prose prose-lg max-w-none">
            {caseStudy.content && <PortableTextRenderer value={caseStudy.content} />}
          </div>
        </FadeIn>
      </Container>
    </article>
  );
};
