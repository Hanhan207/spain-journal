interface MediaBase {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export type MediaItem =
  | (MediaBase & { kind: 'photo' })
  | (MediaBase & { kind: 'motion'; poster: string })
  | (MediaBase & { kind: 'video'; poster?: string });

export interface JournalDay {
  /** 章节内的天数，从 1 开始；总行程顺序确认后再补全局 Day 编号。 */
  day: number;
  title?: string;
  story?: string;
  media: MediaItem[];
}

export type ChapterSlug = 'barcelona' | 'madrid' | 'camino';

/**
 * 真实素材登记入口。
 *
 * 文件放入 public/media/<chapter>/ 后，在对应日期加入记录即可。
 * 动态照片使用 kind: 'motion'，src 指向 mp4，poster 指向静态封面。
 * 不要把原始相册、定位信息或未压缩视频放进仓库。
 */
export const journal: Record<ChapterSlug, JournalDay[]> = {
  barcelona: [],
  madrid: [],
  camino: [],
};
