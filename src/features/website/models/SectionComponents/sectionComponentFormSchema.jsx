import {string, object, array, number, boolean} from 'yup'
import sectionComponentsFormModel from './sectionComponentFormModel'
const {
  formField: {name, header, subHeader, promoText, buttonText, buttonLink, isPublished},
} = sectionComponentsFormModel

export default object().shape({
  [name.key]: string(),
  [header.key]: string(),
  [subHeader.key]: string(),
  [promoText.key]: string(),
  [buttonText.key]: string(),
  [buttonLink.key]: string(),
  [isPublished.key]: string(),
})
