import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Patrick — Founder & Systems Engineer',
  description:
    'Co-founder of UNITE (blood bank logistics startup) and architect of ap-silang (municipal maternal health platform). Engineering high-consequence systems that hold up.',
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return children;
}
