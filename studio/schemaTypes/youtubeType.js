import {defineField, defineType} from 'sanity'

export const youtubeType = defineType({
  name: 'youtube',
  title: 'Vídeo do YouTube',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'Link do vídeo',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'title',
      title: 'Título do vídeo',
      type: 'string',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      url: 'url',
    },

    prepare({title, url}) {
      return {
        title: title || 'Vídeo do YouTube',
        subtitle: url,
      }
    },
  },
})