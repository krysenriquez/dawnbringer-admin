import {useEffect, useState, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {Formik, Form, FieldArray} from 'formik'
import humps from 'humps'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import {useBranch} from '@/providers/BranchProvider'
import {useSupplyCreate} from '../../stores/SupplyCreateProvider'
import {
  arrayObjectToSelectOptions,
  arrayObjectToSelectOptionsFiltered,
  arrayObjectToSelectOptionsWithGroup,
} from '@/utils/arrayToSelectOptions'
import {createSupply} from '../../api'
import CustomFormCard from '@/components/elements/Card/CustomFormCard'
import InputField from '@/components/elements/Input/InputField'
import SelectField from '@/components/elements/Input/SelectField'
import SelectInputFieldNonFormik from '@/components/elements/Input/SelectInputFieldNonFormik'
import TextAreaField from '@/components/elements/Input/TextAreaField'
import supplyCreateFormModel from '../../models/SupplyCreate/supplyCreateFormModel'
import supplyCreateInitialValues from '../../models/SupplyCreate/supplyCreateInitialValues'
import supplyCreateFormSchema from '../../models/SupplyCreate/supplyCreateFormSchema'

const SupplyCreateForm = () => {
  const navigate = useNavigate()
  const swal = withReactContent(Swal)
  const {branches, productVariants} = useSupplyCreate()
  const {defaultBranch} = useBranch()
  const [initialSupply, setInitialSupply] = useState(supplyCreateInitialValues)
  const [selectedVariant, setSelectedVariant] = useState(undefined)
  const [disableAddVariant, setDisableAddVariant] = useState(true)
  const arrayHelpersRef = useRef(null)
  const formikActions = useRef(null)

  const {
    formId,
    formField: {
      branchFrom,
      branchTo,
      trackingNumber,
      carrier,
      referenceNumber,
      comment,
      details: [{variant, quantity}],
    },
  } = supplyCreateFormModel

  const [branchFromOptions, setBranchFromOptions] = useState([])
  useEffect(() => {
    if (branches) {
      setBranchFromOptions(
        arrayObjectToSelectOptionsFiltered(
          branches,
          'id',
          'branchName',
          'canSupply',
          'Select Branch'
        )
      )
    }
  }, [branches])

  const [branchToOptions, setBranchToOptions] = useState([])
  useEffect(() => {
    if (branches) {
      setBranchToOptions(arrayObjectToSelectOptions(branches, 'id', 'branchName', 'Select Branch'))
    }
  }, [branches])

  const [productVariantOptions, setProductVariantOptions] = useState([])
  useEffect(() => {
    if (productVariants) {
      setProductVariantOptions(
        arrayObjectToSelectOptionsWithGroup(
          productVariants,
          'id',
          'variantName',
          'productName',
          'Select Product Variant'
        )
      )
    }
  }, [productVariants])

  useEffect(() => {
    if (selectedVariant) {
      setDisableAddVariant(false)
    }
  }, [selectedVariant])

  const cancel = () => {
    navigate('/supplies')
  }

  const addVariant = () => {
    const variantToAdd = productVariants
      .filter((variant) => variant.id == selectedVariant)
      .reduce((acc, variant) => {
        return {
          productName: variant.productName,
          sku: variant.sku,
          variantImage: variant.variantImage,
          variantName: variant.variantName,
          variant: variant.id,
          quantity: 0,
        }
      }, {})

    const found = formikActions.current.values.details.some(
      (detail) => detail.variant == variantToAdd.variant
    )
    if (!found) {
      arrayHelpersRef.current.push(variantToAdd)
    } else {
      toast.error('Product Variant already added')
    }
  }

  const removeVariant = (e) => {
    console.log(e)
  }

  const submit = async (values, actions) => {
    console.log(values)
    // actions.setSubmitting(true)
    // try {
    //   const {data: response} = await createSupply(values)
    //   swal.fire('Supply Created', response.detail, 'success')
    // } catch (ex) {
    //   toast.error(ex.response.data.detail)
    // } finally {
    //   actions.setSubmitting(true)
    //   actions.resetForm()
    // }
  }

  return (
    <Formik
      enableReinitialize
      validateOnChange={false}
      validationSchema={supplyCreateFormSchema}
      initialValues={initialSupply}
      onSubmit={submit}
    >
      {(actions) => {
        formikActions.current = actions
        return (
          <Form className='form d-flex flex-column flex-lg-row container-xxl' id={formId}>
            <div className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'>
              <CustomFormCard
                cardClassName='card-flush py-4'
                hasHeader={true}
                header={<h2>Supply Details</h2>}
                bodyClassName='pt-0'
              >
                <div className='row'>
                  <div className='col-lg-6 mb-7'>
                    <SelectField
                      className='form-select'
                      name={branchFrom.name}
                      label={branchFrom.label}
                      data={branchFromOptions}
                      required
                    />
                  </div>
                  <div className='col-lg-6 mb-7'>
                    <SelectField
                      className='form-select'
                      name={branchTo.name}
                      label={branchTo.label}
                      data={branchToOptions}
                      required
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-lg-4 mb-7'>
                    <InputField
                      className='form-control'
                      name={referenceNumber.name}
                      label={referenceNumber.label}
                      placeholder='Reference Number'
                    />
                  </div>
                  <div className='col-lg-4 mb-7'>
                    <InputField
                      className='form-control'
                      name={trackingNumber.name}
                      label={trackingNumber.label}
                      placeholder='Tracking Number'
                    />
                  </div>
                  <div className='col-lg-4 mb-7'>
                    <InputField
                      className='form-control'
                      name={carrier.name}
                      label={carrier.label}
                      placeholder='Carrier'
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12 mb-10'>
                    <TextAreaField
                      className='form-control'
                      name={comment.name}
                      label={comment.label}
                    />
                  </div>
                </div>
                <div className='mb-0'>
                  <h5 className='mb-4'>Product Variants:</h5>
                  <div className='row mb-7'>
                    <div className='col-6'>
                      <div className='d-flex align-self-center'>
                        <div className='flex-grow-1 me-3'>
                          <SelectInputFieldNonFormik
                            setValue={setSelectedVariant}
                            data={productVariantOptions}
                          />
                        </div>
                        <button
                          onClick={() => addVariant()}
                          type='button'
                          className='btn btn-icon btn-light btn-active-icon-primary flex-shrink-0'
                          disabled={disableAddVariant}
                        >
                          <CustomSVG path='/media/icons/actions/add.svg' className='svg-icon-1' />
                        </button>
                      </div>
                    </div>
                  </div>
                  <FieldArray
                    name='details'
                    render={(arrayHelpers) => {
                      arrayHelpersRef.current = arrayHelpers
                      return (
                        <div className='table-responsive'>
                          <table className='table align-middle table-row-dashed fs-6 gy-4 mb-0'>
                            <thead>
                              <tr className='border-bottom border-gray-200 text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                                <th>Variant Name</th>
                                <th>SKU</th>
                                <th>Quantity</th>
                                <th className='text-center'>Actions</th>
                              </tr>
                            </thead>
                            <tbody className='fw-semibold text-gray-800'>
                              {actions.values.details.length > 0 ? (
                                actions.values.details.map((detail, index) => {
                                  return (
                                    <tr key={detail.variant}>
                                      <td>
                                        <label className='w-150px'>{detail.variantName}</label>
                                      </td>
                                      <td>{detail.sku}</td>
                                      <td className='text-center'>
                                        <InputField
                                          className='form-control w-100px'
                                          name={`details[${index}][${quantity.name}]`}
                                          placeholder={0}
                                          required
                                        />
                                      </td>
                                      <td className='text-center'>
                                        <button
                                          onClick={() => arrayHelpers.remove(index)}
                                          type='button'
                                          className='btn btn-icon btn-active-icon-danger btn-light btn-sm border-0 me-2'
                                        >
                                          <CustomSVG
                                            path='/media/icons/actions/close.svg'
                                            className='svg-icon-2'
                                          />
                                        </button>
                                      </td>
                                    </tr>
                                  )
                                })
                              ) : (
                                <tr>
                                  <td colSpan={4} className='text-center'>
                                    No Product Variants added
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )
                    }}
                  />
                </div>
              </CustomFormCard>
              <div className='d-flex justify-content-end'>
                <button
                  type='reset'
                  onClick={() => cancel()}
                  className='btn btn-light me-3'
                  disabled={actions.isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='btn btn-primary'
                  disabled={actions.isSubmitting || !actions.isValid || !actions.touched}
                >
                  <span className='indicator-label'>Submit</span>
                  {actions.isSubmitting && (
                    <span className='indicator-progress'>
                      Please wait...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default SupplyCreateForm
