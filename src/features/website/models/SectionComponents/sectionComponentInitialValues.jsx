import branchFormModel from './sectionComponentFormModel'
import sectionComponentsFormModel from './sectionComponentFormModel'
const {
  formField: {name, header, subHeader, promoText, buttonText, buttonLink, isPublished},
} = sectionComponentsFormModel

export default {
  [name.key]: '',
  [header.key]: '',
  [subHeader.key]: '',
  [promoText.key]: '',
  [buttonText.key]: '',
  [buttonLink.key]: '',
  [isPublished.key]: '',
}
