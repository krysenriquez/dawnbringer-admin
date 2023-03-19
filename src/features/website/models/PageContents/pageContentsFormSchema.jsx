import {string, object, boolean, array} from 'yup'
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

export default object().shape({
  [internalName.key]: string().required(`${internalName.requiredErrorMsg}`),
  [pageTitle.key]: string().required(`${pageTitle.requiredErrorMsg}`),
  [pageSlug.key]: string().required(`${pageSlug.requiredErrorMsg}`),
  [metaDescription.key]: string().nullable(),
  [metaRobots.key]: array().of(string()),
  [metaKeywords.key]: array().of(string()),
  [otherMetaData.key]: string().nullable(),
  [isPublished.key]: boolean(),
  [isHome.key]: boolean(),
})
