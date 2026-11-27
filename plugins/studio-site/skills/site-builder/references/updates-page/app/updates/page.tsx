import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import UpdatesTimeline from '@/components/updates/UpdatesTimeline';
import { PRODUCT } from '@/lib/updates/updates';
import './updates.css';

export const metadata: Metadata = {
  title: `What's new - ${PRODUCT}`,
  description: `The latest improvements to ${PRODUCT}, newest first.`,
  openGraph: { title: "What's new", description: `The latest improvements to ${PRODUCT}, newest first.`, type: 'website' },
};

export default function UpdatesPage() {
  return (
    <main className="ud-root">
      {/* Sticky and fully solid: a translucent header lets scrolling text show through. */}
      <header className="ud-head">
        <div className="ud-head-in">
          {/* SLOT: the product logo (an <a href="/"> is fine). Keep it inside this flex row. */}
          <span className="ud-logo">{PRODUCT}</span>
          {/* Goes to the home page, not history.back(), so a shared link still has somewhere to go. */}
          <Link href="/" className="ud-back" aria-label="Back to the home page">
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back</span>
          </Link>
        </div>
      </header>
      <UpdatesTimeline />
      {/* SLOT: the site footer, if there is one. */}
    </main>
  );
}
