import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Formik, Form} from 'formik'
import humps from 'humps'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
  useProductTypeInfoQueryData,
  useProductTypeInfoQueryLoading,
  useProductTypeInfoQueryContext,
} from '../../stores/ProductTypeInfoQueryProvider'
import {updateProductType} from '../../api'
import CustomCard from '@/components/elements/Card/CustomCard'
import ImageInputField from '@/components/elements/Input/ImageInputField'
import InputField from '@/components/elements/Input/InputField'
import SelectField from '@/components/elements/Input/SelectField'
import QuillField from '@/components/elements/Input/QuillField'
import TagField from '@/components/elements/Input/TagField'
import productTypeFormModel from '@/features/product-type/models/productTypeFormModel'
import productTypeInitialValues from '@/features/product-type/models/productTypeInitialValues'
import productTypeSchema from '@/features/product-type/models/productTypeSchema'

const productTypeStatuses = [
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

const ProductTypeEditForm = () => {
  const navigate = useNavigate()
  const productTypeInfo = useProductTypeInfoQueryData()
  const isLoading = useProductTypeInfoQueryLoading()
  const {refetch} = useProductTypeInfoQueryContext()

  const swal = withReactContent(Swal)
  const [initialProductType, setInitialProductType] = useState(productTypeInitialValues)

  const {
    formId,
    formField: {
      productType,
      productTypeImage,
      productTypeStatus,
      productTypeDescription,
      productTypeTags,
      meta: {metaTagTitle, metaTagDescription, pageSlug},
    },
  } = productTypeFormModel

  useEffect(() => {
    if (productTypeInfo && !isLoading) {
      setInitialProductType((prevState) => {
        return {...prevState, ...productTypeInfo}
      })
    }
  }, [productTypeInfo, isLoading])

  const cancel = () => {
    navigate(`/product-types/${productTypeInfo.productTypeId}`, {
      state: {productTypeId: productTypeInfo.productTypeId},
    })
  }

  const submit = (values, actions) => {
    console.log(values)
    swal
      .fire({
        title: 'Update Product Type?',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: 'btn btn-primary',
        cancelButtonColor: 'btn btn-info',
        confirmButtonText: 'Update',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const formData = transformToFormData(values)
          actions.setSubmitting(true)
          try {
            const {data: response} = await updateProductType(formData)
            swal.fire('Product Type Updated', response.detail, 'success')
          } catch (ex) {
            toast.error(ex.response.data.detail)
          } finally {
            refetch()
          }
        }
      })
      .finally(() => {
        actions.setSubmitting(false)
      })
  }

  const transformToFormData = (values) => {
    const formData = new FormData()
    const thumbnail = values.productTypeImage
    const decamelizedValues = humps.decamelizeKeys(values)

    for (var keys in decamelizedValues) {
      if (keys != 'product_type_image') {
        formData.append(keys, JSON.stringify(decamelizedValues[keys]))
      }
    }

    if (thumbnail instanceof File) {
      formData.append(`product_type_image`, thumbnail)
    }

    return formData
  }

  return (
    <>
      {productTypeInfo && !isLoading && (
        <Formik
          enableReinitialize
          validateOnChange={false}
          validationSchema={productTypeSchema}
          initialValues={initialProductType}
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
                  <ImageInputField className='mb-3' name={productTypeImage.name} />
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
                    name={productTypeStatus.name}
                    data={productTypeStatuses}
                  />
                </CustomCard>
                <CustomCard
                  cardClassName='card-flush py-4'
                  hasHeader={true}
                  header={<h2>Details</h2>}
                  bodyClassName='pt-0'
                >
                  <TagField name={productTypeTags.name} label={productTypeTags.label} />
                </CustomCard>
              </div>
              <div className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'>
                <CustomCard
                  cardClassName='card-flush py-4'
                  hasHeader={true}
                  header={<h2>General</h2>}
                  bodyClassName='pt-0'
                >
                  <div className='mb-10'>
                    <InputField
                      className='form-control'
                      name={productType.name}
                      label={productType.label}
                      placeholder='Product Type'
                      required
                    />
                  </div>
                  <div>
                    <QuillField
                      name={productTypeDescription.name}
                      label={productTypeDescription.label}
                    />
                  </div>
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
                    <QuillField name={metaTagDescription.name} label={metaTagDescription.label} />
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
      )}
    </>
  )
}

export default ProductTypeEditForm
