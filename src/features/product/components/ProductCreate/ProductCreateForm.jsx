import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Formik, Form} from 'formik'
import humps from 'humps'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useProductCreate} from '@/features/product/stores/ProductCreateProvider'
import {arrayObjectToSelectOptions, arrayToSelectOptions} from '@/utils/arrayToSelectOptions'
import {createProduct} from '../../api'
import CustomFormCard from '@/components/elements/Card/CustomFormCard'
import ImageInputField from '@/components/elements/Input/ImageInputField'
import InputField from '@/components/elements/Input/InputField'
import SelectField from '@/components/elements/Input/SelectField'
import QuillField from '@/components/elements/Input/QuillField'
import TagField from '@/components/elements/Input/TagField'
import productCreateFormModel from '../../models/productCreateFormModel'
import productCreateInitialValues from '../../models/productCreateInitialValues'
import productCreateSchema from '../../models/productCreateSchema'

const productStatuses = [
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

const ProductCreateForm = () => {
  const {productTypes} = useProductCreate()
  const navigate = useNavigate()
  const swal = withReactContent(Swal)
  const [initialProduct, setInitialProduct] = useState(productCreateInitialValues)

  const {
    formId,
    formField: {
      productType,
      productName,
      productImage,
      productStatus,
      productDescription,
      productTags,
      meta: {metaTagTitle, metaTagDescription, pageSlug},
    },
  } = productCreateFormModel

  const [productTypeOptions, setProductTypeOptions] = useState([])
  useEffect(() => {
    if (productTypes) {
      setProductTypeOptions(
        arrayObjectToSelectOptions(productTypes, 'id', 'productType', 'Select Product Type')
      )
    }
  }, [productTypes])

  const cancel = () => {
    navigate('/products')
  }

  const submit = async (values, actions) => {
    const formData = new FormData()
    const thumbnail = values.productImage
    const decamelizedValues = humps.decamelizeKeys(values)

    for (var keys in decamelizedValues) {
      if (keys != 'product_image') {
        formData.append(keys, JSON.stringify(decamelizedValues[keys]))
      }
    }

    if (thumbnail instanceof File) {
      formData.append(`product_image`, thumbnail)
    }

    actions.setSubmitting(true)
    try {
      const {data: response} = await createProduct(formData)
      swal.fire('Product Created', response.message, 'success')
    } catch (ex) {
      toast.error(ex.response.data.message)
    } finally {
      actions.setSubmitting(true)
      actions.resetForm()
    }
  }

  return (
    <Formik
      enableReinitialize
      validateOnChange={false}
      validationSchema={productCreateSchema}
      initialValues={initialProduct}
      onSubmit={submit}
    >
      {(actions) => (
        <Form className='form d-flex flex-column flex-lg-row' id={formId}>
          <div className='d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10'>
            <CustomFormCard
              cardClassName='card-flush py-4'
              hasHeader={true}
              header={<h2>Thumbnail</h2>}
              bodyClassName='text-center pt-0'
            >
              <ImageInputField className='mb-3' name={productImage.name} />
              <div className='text-muted fs-7'>
                Set the category thumbnail image. Only *.png, *.jpg and *.jpeg image files are
                accepted
              </div>
            </CustomFormCard>
            <CustomFormCard
              cardClassName='card-flush py-4'
              hasHeader={true}
              header={<h2>Status</h2>}
              bodyClassName='pt-0'
            >
              <SelectField
                className='form-select'
                name={productStatus.name}
                data={productStatuses}
              />
            </CustomFormCard>
            <CustomFormCard
              cardClassName='card-flush py-4'
              hasHeader={true}
              header={<h2>Details</h2>}
              bodyClassName='pt-0'
            >
              <div className='mb-10'>
                <SelectField
                  className='form-select'
                  name={productType.name}
                  label={productType.label}
                  data={productTypeOptions}
                />
              </div>
              <div className='mb-0'>
                <TagField name={productTags.name} label={productTags.label} />
              </div>
            </CustomFormCard>
          </div>
          <div className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'>
            <CustomFormCard
              cardClassName='card-flush py-4'
              hasHeader={true}
              header={<h2>General</h2>}
              bodyClassName='pt-0'
            >
              <div className='mb-10'>
                <InputField
                  className='form-control'
                  name={productName.name}
                  label={productName.label}
                  placeholder='Product Name'
                  required
                />
              </div>
              <div>
                <QuillField name={productDescription.name} label={productDescription.label} />
              </div>
            </CustomFormCard>
            <CustomFormCard
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
                    Please wait...
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

export default ProductCreateForm
