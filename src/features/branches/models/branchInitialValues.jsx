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

export default {
  [branchName.key]: '',
  [address1.key]: '',
  [address2.key]: '',
  [city.key]: '',
  [zip.key]: '',
  [province.key]: '',
  [country.key]: '',
  [phone.key]: '',
  [emailAddress.key]: '',
  [isMain.key]: false,
  [canDeliver.key]: false,
  [canSupply.key]: false,
  [isActive.key]: false,
}
