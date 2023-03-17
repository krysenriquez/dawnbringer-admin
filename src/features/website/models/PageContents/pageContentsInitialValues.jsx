import pageContentsFormModel from './pageContentsFormModel'
const {
  formField: {
    internalName,
    pageTitle,
    pageSlug,
    isHome,
    metaDescription,
    metaRobots,
    metaKeywords,
    otherMetaData,
    isPublished,
    isDeleted,
  },
} = pageContentsFormModel

export default {
  [internalName.key]: '',
  [pageTitle.key]: '',
  [pageSlug.key]: '',
  [metaDescription.key]: '',
  [metaRobots.key]: [],
  [metaKeywords.key]: [],
  [otherMetaData.key]: '',
  [isHome.key]: false,
  [isPublished.key]: false,
  [isDeleted.key]: false,
}
