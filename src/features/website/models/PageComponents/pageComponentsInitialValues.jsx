import pageComponentsFormModel from './pageComponentsFormModel'
const {
  formField: {pageContent, name, isPublished, isDeleted},
} = pageComponentsFormModel

export default {
  [pageContent.key]: '',
  [name.key]: '',
  [isPublished.key]: false,
  [isDeleted.key]: false,
}
