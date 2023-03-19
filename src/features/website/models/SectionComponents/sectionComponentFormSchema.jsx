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
  [subTitle.key]: string().nullable(),
  [description1.key]: string().nullable(),
  [description2.key]: string().nullable(),
  [description3.key]: string().nullable(),
  [promoText.key]: string().nullable(),
  [buttonText.key]: string().nullable(),
  [buttonLink.key]: string().nullable(),
  [isPublished.key]: boolean(),
  [isDeleted.key]: boolean(),
})
