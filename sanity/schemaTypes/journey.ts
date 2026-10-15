import { defineField, defineType } from 'sanity';

export const journeyType = defineType({
  name: 'journey',
  title: '旅行',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: '旅行名称', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: '网址标识',
      type: 'slug',
      options: { source: 'title', maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'summary', title: '简介', type: 'text', rows: 3 }),
    defineField({ name: 'totalDays', title: '总天数', type: 'number', validation: (rule) => rule.integer().positive() }),
    defineField({ name: 'startDate', title: '开始日期', type: 'date' }),
    defineField({ name: 'endDate', title: '结束日期', type: 'date' }),
  ],
  preview: { select: { title: 'title', subtitle: 'summary' } },
});
