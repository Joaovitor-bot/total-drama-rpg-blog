import {defineType, defineArrayMember} from 'sanity'

/**
 * Esta é a definição do campo de texto rico usado nos posts do blog.
 *
 * Esse tipo de campo permite escrever textos completos dentro do Sanity,
 * com parágrafos, títulos, listas, links, imagens e vídeos.
 *
 * Quando esse tipo for usado em outro arquivo, ele pode ser chamado assim:
 *
 * {
 *   name: 'body',
 *   title: 'Conteúdo do post',
 *   type: 'blockContent'
 * }
 */
export default defineType({
  title: 'Conteúdo do post',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Texto',
      type: 'block',

      // Estilos disponíveis no editor de texto.
      // Eles aparecem para quem estiver escrevendo o post no Sanity.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Título principal', value: 'h1'},
        {title: 'Título grande', value: 'h2'},
        {title: 'Subtítulo', value: 'h3'},
        {title: 'Título menor', value: 'h4'},
        {title: 'Citação', value: 'blockquote'},
      ],

      // Tipos de lista disponíveis no texto.
      lists: [{title: 'Lista com marcadores', value: 'bullet'}],

      marks: {
        // Opções de formatação do texto.
        decorators: [
          {title: 'Negrito', value: 'strong'},
          {title: 'Itálico', value: 'em'},
        ],

        // Anotações extras, como links.
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'Endereço do link',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),

    // Permite colocar imagens no meio do texto do post.
    defineArrayMember({
      type: 'image',
      title: 'Imagem',
      options: {hotspot: true},
    }),

    // Permite colocar vídeos do YouTube no meio do post.
    defineArrayMember({
      type: 'youtube',
      title: 'Vídeo do YouTube',
    }),
  ],
})