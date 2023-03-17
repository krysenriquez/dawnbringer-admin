import {useState, useEffect} from 'react'
import {Formik, Form} from 'formik'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useModalContext} from '@/components/elements/Modal/CustomModal'
import {usePageComponentsListQueryContext} from '@/features/website/stores/PageComponents/PageComponentsListQueryProvider'
import {usePageComponentCreate} from '@/features/website/stores/PageComponents/PageComponentCreateProvider'
import {arrayObjectToSelectOptions} from '@/utils/arrayToSelectOptions'
import {createPageComponent} from '@/features/website/api'
import InputField from '@/components/elements/Input/InputField'
import SelectField from '@/components/elements/Input/SelectField'
import CheckboxField from '@/components/elements/Input/CheckboxField'

import pageComponentsFormModel from '@/features/website/models/PageComponents/pageComponentsFormModel'
import pageComponentsFormSchema from '@/features/website/models/PageComponents/pageComponentsFormSchema'
import pageComponentsInitialValues from '@/features/website/models/PageComponents/pageComponentsInitialValues'

const PageComponentCreateForm = () => {
  const {toggleModal} = useModalContext()
  const {refetch} = usePageComponentsListQueryContext()
  const {pageContents} = usePageComponentCreate()
  const swal = withReactContent(Swal)

  const [initialPageComponent, setInitialPageComponent] = useState(pageComponentsInitialValues)
  const {
    formId,
    formField: {pageContent, name, isPublished, isDeleted},
  } = pageComponentsFormModel

  const [pageContentOptions, setPageContentOptions] = useState([])
  useEffect(() => {
    if (pageContents) {
      setPageContentOptions(
        arrayObjectToSelectOptions(pageContents, 'id', 'internalName', 'Select Page Content')
      )
    }
  }, [pageContents])

  const cancel = (withRefresh) => {
    if (withRefresh) {
      refetch()
    }
    toggleModal()
  }

  const submit = async (values, actions) => {
    swal
      .fire({
        title: 'Create Page Component?',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: 'btn btn-primary',
        cancelButtonColor: 'btn btn-info',
        confirmButtonText: 'Create',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          actions.setSubmitting(true)
          try {
            const {data: response} = await createPageComponent(values)
            swal.fire('Page Component Created', response.detail, 'success')
            toast.success(response.message)
          } catch (ex) {
            toast.error(ex.response.data.detail)
          } finally {
            actions.resetForm()
          }
        }
      })
      .finally(() => {
        actions.setSubmitting(false)
        cancel(true)
      })
  }

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={pageComponentsFormSchema}
      initialValues={initialPageComponent}
      onSubmit={submit}
    >
      {(actions) => (
        <Form id={formId} className='form'>
          <div className='d-flex flex-column scroll-y me-n7 pe-4'>
            <div className='mb-7'>
              <SelectField
                className='form-select'
                name={pageContent.name}
                label={pageContent.label}
                data={pageContentOptions}
              />
            </div>
            <div className='mb-7'>
              <InputField className='form-control' name={name.name} label={name.label} required />
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
          </div>
          <div className='text-center pt-15'>
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
        </Form>
      )}
    </Formik>
  )
}

export default PageComponentCreateForm
