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

export default {
  [pageComponent.key]: '',
  [name.key]: '',
  [title.key]: '',
  [subTitle.key]: '',
  [description1.key]: '',
  [description2.key]: '',
  [description3.key]: '',
  [promoText.key]: '',
  [buttonText.key]: '',
  [buttonLink.key]: '',
  [image.key]: '',
  [isPublished.key]: false,
  [isDeleted.key]: false,
}
