import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Patrick — Web Developer for Small Businesses',
  description:
    'I build web systems for small businesses that hold up with real users. Full-stack React, Next.js, Node.js and PostgreSQL solutions.',
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return children;
}
