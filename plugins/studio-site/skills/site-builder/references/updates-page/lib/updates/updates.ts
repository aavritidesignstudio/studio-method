// Keep in step with docs/release/WHATS_NEW.md and RELEASE_LOG.md.
// Newest first. A new release is one new entry at the top of the array.

// SLOT: the product name shown in the page header copy and metadata.
export const PRODUCT = '<Product>';

export type UpdateItem = { lead: string; text: string };

export type Update = {
  date: string; // YYYY-MM-DD, the real date
  title: string; // 2 to 4 friendly words
  items: UpdateItem[]; // 3 to 6: bold lead ending in a period, plus one everyday sentence
  // Apps only (optional): store build vs over-the-air. See README "Apps vs web".
  version?: string; // "New app version, update from the store"
  needs?: string; // "Arrives on its own if you have version X or newer"
};

// How the timeline groups entries: one stop per distinct date.
export const UPDATES_STOPS = 'day' as const;

// ONE fictional example entry. Replace it with the real backfill (backfill.md).
export const updates: Update[] = [
  {
    date: '2026-01-15',
    title: 'Photos in chat',
    items: [
      { lead: 'Add a photo.', text: 'In a conversation, tap the photo button to take one or pick one from your gallery.' },
      { lead: 'Say what it is.', text: 'Add a short caption before you send, like "Our picnic spot".' },
      { lead: 'Find it later.', text: 'Every photo you send stays in the conversation, so you can scroll back to it.' },
    ],
  },
];
