import { createClient } from '@sanity/client';
import { journal as localJournal, type ChapterSlug, type JournalDay, type MediaItem } from '../data/media';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = import.meta.env.PUBLIC_SANITY_DATASET?.trim() || 'production';

type SanityMedia = {
  _type: 'cloudinaryPhoto' | 'cloudinaryMotion' | 'muxVideo';
  alt?: string;
  caption?: string;
  src?: string;
  poster?: string;
  width?: number;
  height?: number;
  playbackId?: string;
};

type SanityDay = Omit<JournalDay, 'media' | 'location'> & {
  location?: { name?: string };
  media?: SanityMedia[];
};

const query = `*[
  _type == "journalDay" &&
  chapter == $chapter &&
  journey->slug.current == "spain-13-days"
] | order(dayNumber asc) {
  "day": dayNumber,
  title,
  story,
  date,
  location { name },
  media[] {
    _type,
    alt,
    caption,
    _type == "cloudinaryPhoto" => {
      "src": asset.secure_url,
      "width": asset.width,
      "height": asset.height
    },
    _type == "cloudinaryMotion" => {
      "poster": poster.secure_url,
      "src": clip.secure_url
    },
    _type == "muxVideo" => {
      "playbackId": video.asset->playbackId
    }
  }
}`;

function normalizeMedia(item: SanityMedia): MediaItem | null {
  const common = { alt: item.alt || '旅行媒体', caption: item.caption };
  if (item._type === 'cloudinaryPhoto' && item.src) {
    return { kind: 'photo', src: item.src, width: item.width, height: item.height, ...common };
  }
  if (item._type === 'cloudinaryMotion' && item.src && item.poster) {
    return { kind: 'motion', src: item.src, poster: item.poster, ...common };
  }
  if (item._type === 'muxVideo' && item.playbackId) {
    return { kind: 'mux', playbackId: item.playbackId, ...common };
  }
  return null;
}

export const isSanityConfigured = Boolean(projectId);

export async function getJournalDays(chapter: ChapterSlug): Promise<JournalDay[]> {
  if (!projectId) return localJournal[chapter];

  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2026-10-15',
    useCdn: false,
    perspective: 'published',
  });

  const days = await client.fetch<SanityDay[]>(query, { chapter });
  return days.map((day) => ({
    ...day,
    location: day.location?.name,
    media: (day.media || []).map(normalizeMedia).filter((item): item is MediaItem => item !== null),
  }));
}
