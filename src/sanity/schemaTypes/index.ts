import { type SchemaTypeDefinition } from 'sanity'

import { authorType } from './authorType'
import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { eventType } from './eventType'
import { mediaType } from './mediaType'
import { menuType } from './menuType'
import { postType } from './postType'
import { pageType } from './pageType'
import { seoType } from './seoType'
import { subscriberType } from './subscriberType'
import { tagType } from './tagType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    authorType,
    blockContentType,
    categoryType,
    eventType,
    mediaType,
    menuType,
    pageType,
    postType,
    seoType,
    subscriberType,
    tagType,
  ],
}
