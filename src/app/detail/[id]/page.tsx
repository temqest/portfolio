import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCaseStudy, getAllCaseStudies } from '@/data/case-studies';
import { CaseStudyView } from '@/components/case-study/CaseStudyView';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const study = getCaseStudy(id);
  if (!study) return { title: 'Case Study — Patrick' };

  return {
    title: `${study.name} — Engineering Case Study`,
    description: study.executiveSummary,
  };
}

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: 'unite' },
    { id: 'ap-silang' },
    { id: 'apsilang' },
    { id: 'rtc-clearance' },
    { id: 'rtc-clearance-express' },
  ];
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const study = getCaseStudy(id);

  if (!study) {
    notFound();
  }

  return <CaseStudyView study={study} />;
}
