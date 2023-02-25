import {string, object, array, number, boolean} from 'yup'
import branchFormModel from './branchFormModel'
const {
  formField: {
    branchName,
    address1,
    address2,
    city,
    zip,
    province,
    country,
    phone,
    emailAddress,
    isMain,
    canDeliver,
    canSupply,
    isActive,
  },
} = branchFormModel

export default object().shape({
  [branchName.key]: string().required(`${branchName.requiredErrorMsg}`),
  [address1.key]: string().nullable(),
  [address2.key]: string().nullable(),
  [city.key]: string().nullable(),
  [zip.key]: string().nullable(),
  [province.key]: string().nullable(),
  [country.key]: string().nullable(),
  [phone.key]: string().nullable().required(`${phone.requiredErrorMsg}`),
  [emailAddress.key]: string()
    .email(`${emailAddress.invalidErrorMsg}`)
    .required(`${emailAddress.requiredErrorMsg}`),
  [isMain.key]: boolean(),
  [canDeliver.key]: boolean(),
  [canSupply.key]: boolean(),
  [isActive.key]: boolean(),
})
