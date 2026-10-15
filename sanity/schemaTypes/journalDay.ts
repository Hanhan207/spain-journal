import { defineArrayMember, defineField, defineType } from 'sanity';

const captionFields = [
  defineField({ name: 'alt', title: '画面描述（无障碍）', type: 'string', validation: (rule) => rule.required() }),
  defineField({ name: 'caption', title: '图注', type: 'string' }),
];

export const journalDayType = defineType({
  name: 'journalDay',
  title: '每日游记',
  type: 'document',
  fields: [
    defineField({
      name: 'journey',
      title: '所属旅行',
      type: 'reference',
      to: [{ type: 'journey' }],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'date', title: '日期', type: 'date' }),
    defineField({ name: 'dayNumber', title: '章节内第几天', type: 'number', validation: (rule) => rule.required().integer().positive() }),
    defineField({
      name: 'chapter',
      title: '章节',
      type: 'string',
      options: {
        list: [
          { title: '巴塞罗那', value: 'barcelona' },
          { title: '马德里', value: 'madrid' },
          { title: '朝圣之路', value: 'camino' },
          { title: '待确认', value: 'pending' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'title', title: '当天标题', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'story', title: '当天文字', type: 'text', rows: 10 }),
    defineField({
      name: 'location',
      title: '地点',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: '地点名称', type: 'string' }),
        defineField({ name: 'coordinates', title: '地图坐标', type: 'geopoint' }),
      ],
    }),
    defineField({
      name: 'media',
      title: '照片与视频',
      description: '可拖动调整前台展示顺序。动态照片由一张封面和一段短视频组成。',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'cloudinaryPhoto',
          title: '照片',
          type: 'object',
          fields: [
            defineField({ name: 'asset', title: 'Cloudinary 图片', type: 'cloudinary.asset', validation: (rule) => rule.required() }),
            ...captionFields,
          ],
          preview: { select: { title: 'caption', subtitle: 'alt', media: 'asset' }, prepare: ({ title, subtitle, media }) => ({ title: title || '照片', subtitle, media }) },
        }),
        defineArrayMember({
          name: 'cloudinaryMotion',
          title: '动态照片',
          type: 'object',
          fields: [
            defineField({ name: 'poster', title: 'Cloudinary 静态封面', type: 'cloudinary.asset', validation: (rule) => rule.required() }),
            defineField({ name: 'clip', title: 'Cloudinary 短视频', type: 'cloudinary.asset', validation: (rule) => rule.required() }),
            ...captionFields,
          ],
          preview: { select: { title: 'caption', subtitle: 'alt', media: 'poster' }, prepare: ({ title, subtitle, media }) => ({ title: title || '动态照片', subtitle, media }) },
        }),
        defineArrayMember({
          name: 'muxVideo',
          title: '视频',
          type: 'object',
          fields: [
            defineField({ name: 'video', title: 'Mux 视频', type: 'mux.video', validation: (rule) => rule.required() }),
            ...captionFields,
          ],
          preview: { select: { title: 'caption', subtitle: 'alt' }, prepare: ({ title, subtitle }) => ({ title: title || '视频', subtitle }) },
        }),
      ],
    }),
  ],
  orderings: [
    { title: '日期（从早到晚）', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }] },
    { title: '章节内顺序', name: 'dayAsc', by: [{ field: 'dayNumber', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', day: 'dayNumber', chapter: 'chapter', location: 'location.name' },
    prepare: ({ title, day, chapter, location }) => ({ title: `Day ${day ?? '?'} · ${title}`, subtitle: [chapter, location].filter(Boolean).join(' · ') }),
  },
});
