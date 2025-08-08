import { type SchemaTypeDefinition } from 'sanity'

import { authorType } from './authorType'
import { blockContentType } from './array/blockContentType'
import { categoryType } from './categoryType'
import { eventType } from './eventType'
import { mediaType } from './mediaType'
import { menuType } from './menuType'
import { postType } from './postType'
import { pageType } from './pageType'
import { seoType } from './object/seoType'
import { subscriberType } from './subscriberType'
import { tagType } from './tagType'
import { faqType, faqGroupType } from './object/faqType'
import { reviewType } from './object/reviewType'
import { caseStudyType } from './caseStudyType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    authorType,
    blockContentType,
    caseStudyType,
    categoryType,
    eventType,
    mediaType,
    menuType,
    pageType,
    postType,
    seoType,
    subscriberType,
    tagType,
    faqType,
    faqGroupType,
    reviewType,
  ],
}
