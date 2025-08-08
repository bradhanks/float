// src/app/case-studies/[slug]/page.tsx
import { caseStudyPathsQuery, caseStudyQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import { client } from '@/sanity/lib/client';
import { SanityCaseStudy } from '@/components/SanityCaseStudy';
import AppLayout from '@/components/AppLayout'; // Or your main AppLayout
import { ContactSection } from '@/components/ContactSection';
import { Metadata } from 'next';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const caseStudies = await client.fetch(caseStudyPathsQuery);
  return caseStudies;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const caseStudy = await sanityFetch({ query: caseStudyQuery, params: resolvedParams });

  if (!caseStudy) {
    return { title: 'Case Study not found' };
  }

  return {
    title: caseStudy.data.title,
    description: caseStudy.data.summary,
    openGraph: {
      title: caseStudy.data.title,
      description: caseStudy.data.summary,
      //... other OG tags
    },
  };
}

const CaseStudyPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const caseStudy = await sanityFetch({ query: caseStudyQuery, params: resolvedParams });
  // You'll also need a query to fetch other case studies for the "More case studies" section
  // const moreCaseStudies = await sanityFetch({...});

  return (
    <AppLayout>
      <SanityCaseStudy caseStudy={caseStudy.data} />
      {/*
      {moreCaseStudies.length > 0 && (
        <PageLinks
          className="mt-24 sm:mt-32 lg:mt-40"
          title="More case studies"
          pages={moreCaseStudies}
        />
      )}
      */}
      <ContactSection />
    </AppLayout>
  );
};

export default CaseStudyPage;
