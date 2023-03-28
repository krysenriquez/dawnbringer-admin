import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Formik, Form, FieldArray} from 'formik'
import humps from 'humps'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {slugify} from '@/utils/stringUtils'
import {useBranch} from '@/providers/BranchProvider'
import {useProductVariantCreate} from '../../stores/ProductVariantCreateProvider'
import {
  arrayObjectToSelectOptions,
  arrayObjectToSelectOptionsWithGroup,
} from '@/utils/arrayToSelectOptions'
import {createProductVariant} from '../../api'
import CustomTabs from '@/components/elements/Tabs/CustomTabs'
import {Tab} from 'react-bootstrap'
import CustomCard from '@/components/elements/Card/CustomCard'
import ImageInputField from '@/components/elements/Input/ImageInputField'
import ImageDropzoneField from '@/components/elements/Input/ImageDropzoneField'
import InputField from '@/components/elements/Input/InputField'
import SelectField from '@/components/elements/Input/SelectField'
import SelectInputFieldWithGrouping from '@/components/elements/Input/SelectInputFieldWithGrouping'
import QuillField from '@/components/elements/Input/QuillField'
import TagField from '@/components/elements/Input/TagField'
import InputGroupField from '@/components/elements/Input/InputGroupField'

import productVariantFormModel from '../../models/productVariantFormModel'
import productVariantInitialValues from '../../models/productVariantInitialValues'
import productVariantSchema from '../../models/productVariantSchema'

const variantStatuses = [
  {
    value: null,
    label: 'Select Status',
  },
  {
    value: 'DRAFT',
    label: 'Draft',
  },
  {
    value: 'ACTIVE',
    label: 'Active',
  },
  {
    value: 'INACTIVE',
    label: 'Inactive',
  },
]

const ProductVariantCreateForm = () => {
  const {products, membershipLevels} = useProductVariantCreate()
  const {defaultBranch} = useBranch()
  const navigate = useNavigate()
  const swal = withReactContent(Swal)
  const [initialProductVariant, setInitialProductVariant] = useState(productVariantInitialValues)
  const [tab, setTab] = useState('general')

  const {
    formId,
    formField: {
      product,
      sku,
      variantName,
      variantImage,
      variantStatus,
      variantDescription,
      variantTags,
      quantity,
      media,
      price: {basePrice, discountedPrice},
      meta: {metaTagTitle, metaTagDescription, pageSlug},
      pointValues: [{pointValue, membershipLevel}],
    },
  } = productVariantFormModel

  const [productOptions, setProductOptions] = useState([])
  useEffect(() => {
    if (products) {
      setProductOptions(
        arrayObjectToSelectOptionsWithGroup(
          products,
          'id',
          'productName',
          'productTypeName',
          'Select Product Name'
        )
      )
    }
  }, [products])

  useEffect(() => {}, [defaultBranch])

  useEffect(() => {
    if (membershipLevels) {
      let pointValues = []
      membershipLevels.map((level) => {
        return pointValues.push({
          membershipLevelLabel: level.name,
          membershipLevel: level.level,
          pointValue: 0,
        })
      })

      setInitialProductVariant((prevState) => {
        return {...prevState, pointValues: pointValues}
      })
    }
  }, [membershipLevels])

  const cancel = () => {
    navigate('/product-variants')
  }

  const submit = async (values, actions) => {
    swal
      .fire({
        title: 'Create Product Variant?',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: 'btn btn-primary',
        cancelButtonColor: 'btn btn-info',
        confirmButtonText: 'Create',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          values.meta.pageSlug = slugify(values.meta.pageSlug)
          const formData = transformToFormData(values)
          actions.setSubmitting(true)
          try {
            const {data: response} = await createProductVariant(formData)
            swal.fire('Product Variant Created', response.detail, 'success')
          } catch (ex) {
            toast.error(ex.response.data.detail)
          } finally {
            actions.resetForm()
          }
        }
      })
      .finally(() => {
        actions.setSubmitting(false)
      })
  }

  const transformToFormData = (values) => {
    const formData = new FormData()
    const thumbnail = values.variantImage
    const medias = values.media
    const decamelizedValues = humps.decamelizeKeys(values)

    for (var keys in decamelizedValues) {
      if (keys != 'variant_image' && keys != 'media') {
        formData.append(keys, JSON.stringify(decamelizedValues[keys]))
      }
    }

    if (thumbnail instanceof File) {
      formData.append(`variant_image`, thumbnail)
    }

    if (medias.length > 0) {
      medias.forEach((media) => {
        formData.append('media', media)
      })
    }

    return formData
  }

  return (
    <Formik
      enableReinitialize
      validateOnChange={false}
      validationSchema={productVariantSchema}
      initialValues={initialProductVariant}
      onSubmit={submit}
    >
      {(actions) => (
        <Form className='form d-flex flex-column flex-lg-row' id={formId}>
          <div className='d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10'>
            <CustomCard
              cardClassName='card-flush py-4'
              hasHeader={true}
              header={<h2>Thumbnail</h2>}
              bodyClassName='text-center pt-0'
            >
              <ImageInputField className='mb-3' name={variantImage.name} />
              <div className='text-muted fs-7'>
                Set the category thumbnail image. Only *.png, *.jpg and *.jpeg image files are
                accepted
              </div>
            </CustomCard>
            <CustomCard
              cardClassName='card-flush py-4'
              hasHeader={true}
              header={<h2>Status</h2>}
              bodyClassName='pt-0'
            >
              <SelectField
                className='form-select'
                name={variantStatus.name}
                data={variantStatuses}
              />
            </CustomCard>
            <CustomCard
              cardClassName='card-flush py-4'
              hasHeader={true}
              header={<h2>Details</h2>}
              bodyClassName='pt-0'
            >
              <div className='mb-10'>
                <SelectInputFieldWithGrouping
                  name={product.name}
                  label={product.label}
                  data={productOptions}
                />
              </div>
              <div className='mb-0'>
                <TagField name={variantTags.name} label={variantTags.label} />
              </div>
            </CustomCard>
          </div>
          <div className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'>
            <CustomTabs
              className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold'
              defaultActiveKey='general'
              activeKey={tab}
              onSelect={(k) => setTab(k)}
            >
              <Tab
                eventKey='general'
                title='General'
                className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'
                tabClassName='text-active-primary'
              >
                {tab == 'general' ? (
                  <>
                    <CustomCard
                      cardClassName='card-flush py-4'
                      hasHeader={true}
                      header={<h2>General</h2>}
                      bodyClassName='pt-0'
                    >
                      <div className='mb-10'>
                        <InputField
                          className='form-control'
                          name={variantName.name}
                          label={variantName.label}
                          placeholder='Product Variant Name'
                          required
                        />
                      </div>
                      <div className='mb-10'>
                        <InputField
                          className='form-control'
                          name={sku.name}
                          label={sku.label}
                          placeholder='SKU'
                          required
                        />
                      </div>
                      {/* <div className='mb-10'>
                        <InputField
                          className='form-control'
                          name={quantity.name}
                          label={quantity.label}
                          placeholder='Initial Quantity'
                          required
                        />
                      </div> */}
                      <div>
                        <QuillField
                          name={variantDescription.name}
                          label={variantDescription.label}
                        />
                      </div>
                    </CustomCard>
                    <CustomCard
                      cardClassName='card-flush py-4'
                      hasHeader={true}
                      header={<h2>Pricing</h2>}
                      bodyClassName='pt-0'
                    >
                      <div className='mb-10'>
                        <InputGroupField
                          className='form-control'
                          name={basePrice.name}
                          label={basePrice.label}
                          labelPrepend='₱'
                          placeholder='Product Variant Price'
                          required
                        />
                      </div>
                      <div className='mb-10'>
                        <InputGroupField
                          className='form-control'
                          name={discountedPrice.name}
                          label={discountedPrice.label}
                          labelPrepend='₱'
                          placeholder='Product Variant Discount'
                          required
                        />
                      </div>
                    </CustomCard>
                    <CustomCard
                      cardClassName='card-flush py-4'
                      hasHeader={true}
                      header={<h2>Media</h2>}
                      bodyClassName='pt-0'
                    >
                      <ImageDropzoneField name={media.name} />
                    </CustomCard>
                  </>
                ) : (
                  <></>
                )}
              </Tab>
              <Tab
                eventKey='advanced'
                title='Advanced'
                className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'
                tabClassName='text-active-primary'
              >
                {tab == 'advanced' ? (
                  <>
                    <CustomCard
                      cardClassName='card-flush py-4'
                      hasHeader={true}
                      header={<h2>Point Values</h2>}
                      bodyClassName='pt-0'
                    >
                      <FieldArray
                        name='pointValues'
                        render={(arrayHelpers) => (
                          <div>
                            {actions.values.pointValues &&
                              actions.values.pointValues.map((level, index) => {
                                return (
                                  <div className='row mb-5' key={level.membershipLevelLabel}>
                                    <div className='col-4 col-form-label required fw-semibold fs-6'>
                                      {level.membershipLevelLabel}
                                    </div>
                                    <div className='col-8'>
                                      <InputField
                                        className='form-control'
                                        name={`pointValues[${index}][${pointValue.name}]`}
                                        placeholder={level.membershipLevelLabel + ' Point Value'}
                                        required
                                      />
                                    </div>
                                  </div>
                                )
                              })}
                          </div>
                        )}
                      />
                    </CustomCard>
                    <CustomCard
                      cardClassName='card-flush py-4'
                      hasHeader={true}
                      header={<h2>Meta Options</h2>}
                      bodyClassName='pt-0'
                    >
                      <div className='mb-10'>
                        <InputField
                          className='form-control'
                          name={metaTagTitle.name}
                          label={metaTagTitle.label}
                          placeholder='Meta Tag Name'
                          required
                        />
                      </div>
                      <div className='mb-10'>
                        <QuillField
                          name={metaTagDescription.name}
                          label={metaTagDescription.label}
                        />
                      </div>
                      <div className='mb-10'>
                        <InputField
                          className='form-control'
                          name={pageSlug.name}
                          label={pageSlug.label}
                          placeholder='Page Slug'
                          required
                        />
                      </div>
                    </CustomCard>
                  </>
                ) : (
                  <></>
                )}
              </Tab>
            </CustomTabs>
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
      )}
    </Formik>
  )
}

export default ProductVariantCreateForm
