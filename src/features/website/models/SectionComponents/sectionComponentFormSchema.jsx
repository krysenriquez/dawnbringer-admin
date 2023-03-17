import {string, object, array, number, boolean} from 'yup'
import sectionComponentFormModel from './sectionComponentFormModel'
const {
  formField: {
    pageComponent,
    name,
    title,
    subTitle,
    description1,
    description2,
    description3,
    promoText,
    buttonText,
    buttonLink,
    image,
    isPublished,
    isDeleted,
  },
} = sectionComponentFormModel

export default object().shape({
  [pageComponent.key]: string().required(`${pageComponent.requiredErrorMsg}`),
  [name.key]: string().required(`${name.requiredErrorMsg}`),
  [title.key]: string().required(`${title.requiredErrorMsg}`),
  [subTitle.key]: string(),
  [description1.key]: string().required(`${description1.requiredErrorMsg}`),
  [description2.key]: string(),
  [description3.key]: string(),
  [promoText.key]: string(),
  [buttonText.key]: string(),
  [buttonLink.key]: string(),
  [isPublished.key]: boolean(),
  [isDeleted.key]: boolean(),
})
