import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Formik, Form} from 'formik'
import humps from 'humps'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useSectionComponentCreate} from '@/features/website/stores/SectionComponents/SectionComponentCreateProvider'
import {arrayObjectToSelectOptions} from '@/utils/arrayToSelectOptions'
import {createSectionComponent} from '@/features/website/api'
import CustomCard from '@/components/elements/Card/CustomCard'
import ImageInputField from '@/components/elements/Input/ImageInputField'
import InputField from '@/components/elements/Input/InputField'
import SelectField from '@/components/elements/Input/SelectField'
import QuillField from '@/components/elements/Input/QuillField'
import CheckboxField from '@/components/elements/Input/CheckboxField'

import sectionComponentFormModel from '@/features/website/models/SectionComponents/sectionComponentFormModel'
import sectionComponentFormSchema from '@/features/website/models/SectionComponents/sectionComponentFormSchema'
import sectionComponentInitialValues from '@/features/website/models/SectionComponents/sectionComponentInitialValues'

const SectionComponentCreateForm = () => {
  const navigate = useNavigate()
  const {pageComponents} = useSectionComponentCreate()
  const swal = withReactContent(Swal)

  const [initialSectionComponent, setInitialSectionComponent] = useState(
    sectionComponentInitialValues
  )
  const {
    formId,
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

  const [pageComponentOptions, setPageComponentOptions] = useState([])
  useEffect(() => {
    if (pageComponents) {
      setPageComponentOptions(
        arrayObjectToSelectOptions(pageComponents, 'id', 'name', 'Select Page Component')
      )
    }
  }, [pageComponents])

  const cancel = () => {
    navigate('/website/section-components')
  }

  const submit = async (values, actions) => {
    swal
      .fire({
        title: 'Create Section Component?',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: 'btn btn-primary',
        cancelButtonColor: 'btn btn-info',
        confirmButtonText: 'Create',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const formData = transformToFormData(values)
          actions.setSubmitting(true)
          try {
            const {data: response} = await createSectionComponent(formData)
            swal.fire('Section Component Created', response.detail, 'success')
            toast.success(response.detail)
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
    const thumbnail = values.image
    const decamelizedValues = humps.decamelizeKeys(values)

    for (var keys in decamelizedValues) {
      if (keys != 'image') {
        formData.append(keys, JSON.stringify(decamelizedValues[keys]))
      }
    }

    if (thumbnail instanceof File) {
      formData.append(`image`, thumbnail)
    }

    return formData
  }

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={sectionComponentFormSchema}
      initialValues={initialSectionComponent}
      onSubmit={submit}
    >
      {(actions) => (
        <Form className='form d-flex flex-column flex-lg-row container-xxl' id={formId}>
          <div className='d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10'>
            <CustomCard
              cardClassName='card-flush py-4'
              hasHeader={true}
              header={<h2>Image</h2>}
              bodyClassName='text-center pt-0'
            >
              <ImageInputField className='mb-3' name={image.name} />
              <div className='text-muted fs-7'>
                Set the section component image. Only *.png, *.jpg and *.jpeg image files are
                accepted
              </div>
            </CustomCard>
          </div>
          <div className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'>
            <CustomCard
              cardClassName='card-flush py-4'
              hasHeader={true}
              header={<h2>Section Component</h2>}
              bodyClassName='pt-0'
            >
              <div className='row mb-7'>
                <div className='col-lg-6'>
                  <SelectField
                    className='form-select'
                    name={pageComponent.name}
                    label={pageComponent.label}
                    data={pageComponentOptions}
                  />
                </div>
                <div className='col-lg-6'>
                  <InputField
                    className='form-control'
                    name={name.name}
                    label={name.label}
                    required
                  />
                </div>
              </div>
              <div className='row mb-7'>
                <div className='col-lg-4'>
                  <InputField
                    className='form-control'
                    name={title.name}
                    label={title.label}
                    required
                  />
                </div>
                <div className='col-lg-4'>
                  <InputField
                    className='form-control'
                    name={subTitle.name}
                    label={subTitle.label}
                  />
                </div>
                <div className='col-lg-4'>
                  <InputField
                    className='form-control'
                    name={promoText.name}
                    label={promoText.label}
                  />
                </div>
              </div>
              <div className='mb-7'>
                <QuillField name={description1.name} label={description1.label} />
              </div>
              <div className='mb-7'>
                <QuillField name={description2.name} label={description2.label} />
              </div>
              <div className='mb-7'>
                <QuillField name={description3.name} label={description3.label} />
              </div>
              <div className='row mb-7'>
                <div className='col-lg-6'>
                  <InputField
                    className='form-control'
                    name={buttonText.name}
                    label={buttonText.label}
                  />
                </div>
                <div className='col-lg-6'>
                  <InputField
                    className='form-control'
                    name={buttonLink.name}
                    label={buttonLink.label}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-6'>
                  <div className='mb-7'>
                    <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                      <span>Set page content to be viewable on the website?</span>
                    </label>
                    <label className='form-check form-switch form-check-custom form-check-solid'>
                      <CheckboxField name={isPublished.name} label={isPublished.label} required />
                    </label>
                  </div>
                </div>
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
  )
}

export default SectionComponentCreateForm
