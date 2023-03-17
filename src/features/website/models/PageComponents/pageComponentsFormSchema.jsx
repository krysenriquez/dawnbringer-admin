import {string, object, boolean, array} from 'yup'
import pageComponentsFormModel from './pageComponentsFormModel'
const {
  formField: {pageContent, name, isPublished, isDeleted},
} = pageComponentsFormModel

export default object().shape({
  [pageContent.key]: string().required(`${pageContent.requiredErrorMsg}`),
  [name.key]: string().required(`${name.requiredErrorMsg}`),
  [isPublished.key]: boolean(),
})
