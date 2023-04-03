import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Formik, Form} from 'formik'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
  usePageComponentInfoQueryData,
  usePageComponentInfoQueryLoading,
  usePageComponentInfoQueryContext,
} from '@/features/website/stores/PageComponents/PageComponentInfoQueryProvider'
import {usePageComponentCreate} from '@/features/website/stores/PageComponents/PageComponentCreateProvider'
import {arrayObjectToSelectOptions} from '@/utils/arrayToSelectOptions'
import {updatePageComponent} from '@/features/website/api'
import CustomCard from '@/components/elements/Card/CustomCard'
import InputField from '@/components/elements/Input/InputField'
import SelectField from '@/components/elements/Input/SelectField'
import CheckboxField from '@/components/elements/Input/CheckboxField'
import pageComponentsFormModel from '@/features/website/models/PageComponents/pageComponentsFormModel'
import pageComponentsFormSchema from '@/features/website/models/PageComponents/pageComponentsFormSchema'
import pageComponentsInitialValues from '@/features/website/models/PageComponents/pageComponentsInitialValues'
import RolePermissionComponent from '@/providers/Permissions/RolePermissionComponent'

const PageComponentInfoForm = () => {
  const navigate = useNavigate()
  const {pageContents} = usePageComponentCreate()
  const pageComponentInfo = usePageComponentInfoQueryData()
  const isLoading = usePageComponentInfoQueryLoading()
  const {refetch} = usePageComponentInfoQueryContext()
  const swal = withReactContent(Swal)

  const [initialPageComponent, setInitialPageComponent] = useState(pageComponentsInitialValues)
  const {
    formId,
    formField: {pageContent, name, isPublished, isDeleted},
  } = pageComponentsFormModel

  useEffect(() => {
    if (pageComponentInfo && !isLoading) {
      setInitialPageComponent((prevState) => {
        return {...prevState, ...pageComponentInfo}
      })
    }
  }, [pageComponentInfo, isLoading])

  const [pageContentOptions, setPageContents] = useState([])
  useEffect(() => {
    if (pageContents) {
      setPageContents(
        arrayObjectToSelectOptions(pageContents, 'id', 'internalName', 'Select Page Content')
      )
    }
  }, [pageContents])

  const cancel = () => {
    navigate('/website/page-components')
  }

  const submit = async (values, actions) => {
    swal
      .fire({
        title: 'Update Page Component?',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: 'btn btn-primary',
        cancelButtonColor: 'btn btn-info',
        confirmButtonText: 'Update',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          actions.setSubmitting(true)
          try {
            const {data: response} = await updatePageComponent(values)
            swal.fire('Page Component Updated', response.detail, 'success')
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
        refetch()
      })
  }

  return (
    <>
      {pageComponentInfo && !isLoading && (
        <Formik
          enableReinitialize={true}
          validateOnChange={false}
          validationSchema={pageComponentsFormSchema}
          initialValues={initialPageComponent}
          onSubmit={submit}
        >
          {(actions) => (
            <Form className='form d-flex flex-column flex-lg-row container-xxl' id={formId}>
              <div className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'>
                <CustomCard
                  cardClassName='card-flush py-4'
                  hasHeader={true}
                  header={<h2>Page Content</h2>}
                  bodyClassName='pt-0'
                >
                  <div className='mb-7'>
                    <SelectField
                      className='form-select'
                      name={pageContent.name}
                      label={pageContent.label}
                      data={pageContentOptions}
                    />
                  </div>
                  <div className='mb-7'>
                    <InputField
                      className='form-control'
                      name={name.name}
                      label={name.label}
                      required
                    />
                  </div>
                  <div className='row'>
                    <div className='col-6'>
                      <div className='mb-7'>
                        <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                          <span>Set page content to be viewable on the website?</span>
                        </label>
                        <label className='form-check form-switch form-check-custom form-check-solid'>
                          <CheckboxField
                            name={isPublished.name}
                            label={isPublished.label}
                            required
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </CustomCard>
                <div className='d-flex justify-content-end'>
                  <RolePermissionComponent moduleName='Content Management' permission='canUpdate'>
                    <>
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
                    </>
                  </RolePermissionComponent>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  )
}

export default PageComponentInfoForm
