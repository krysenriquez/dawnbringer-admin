import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Formik, Form} from 'formik'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {slugify} from '@/utils/stringUtils'
import {updatePageContent} from '@/features/website/api'
import CustomCard from '@/components/elements/Card/CustomCard'
import InputField from '@/components/elements/Input/InputField'
import CheckboxField from '@/components/elements/Input/CheckboxField'
import TagField from '@/components/elements/Input/TagField'
import QuillField from '@/components/elements/Input/QuillField'
import {
  usePageContentInfoQueryData,
  usePageContentInfoQueryLoading,
  usePageContentInfoQueryContext,
} from '@/features/website/stores/PageContents/PageContentInfoQueryProvider'
import pageContentsFormModel from '@/features/website/models/PageContents/pageContentsFormModel'
import pageContentsFormSchema from '@/features/website/models/PageContents/pageContentsFormSchema'
import pageContentsInitialValues from '@/features/website/models/PageContents/pageContentsInitialValues'
import RolePermissionComponent from '@/providers/Permissions/RolePermissionComponent'

const PageContentInfoForm = () => {
  const navigate = useNavigate()
  const pageContentInfo = usePageContentInfoQueryData()
  const isLoading = usePageContentInfoQueryLoading()
  const {refetch} = usePageContentInfoQueryContext()

  const swal = withReactContent(Swal)

  const [initialPageContent, setInitialPageContent] = useState(pageContentsInitialValues)
  const {
    formId,
    formField: {
      internalName,
      pageTitle,
      pageSlug,
      metaDescription,
      metaRobots,
      metaKeywords,
      otherMetaData,
      isHome,
      isPublished,
    },
  } = pageContentsFormModel

  useEffect(() => {
    if (pageContentInfo && !isLoading) {
      setInitialPageContent((prevState) => {
        return {...prevState, ...pageContentInfo}
      })
    }
  }, [pageContentInfo, isLoading])

  const cancel = () => {
    navigate('/website/page-contents')
  }

  const submit = async (values, actions) => {
    swal
      .fire({
        title: 'Update Page Content?',
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
            values.pageSlug = slugify(values.pageSlug)
            values.metaRobots = values.metaRobots.join()
            values.metaKeywords = values.metaKeywords.join()
            const {data: response} = await updatePageContent(values)
            swal.fire('Page Content Updated', response.detail, 'success')
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
      {pageContentInfo && !isLoading && (
        <Formik
          enableReinitialize={true}
          validateOnChange={false}
          validationSchema={pageContentsFormSchema}
          initialValues={initialPageContent}
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
                  <div className='row mb-7'>
                    <div className='col'>
                      <InputField
                        className='form-control'
                        name={internalName.name}
                        label={internalName.label}
                        required
                      />
                    </div>
                  </div>
                  <div className='row mb-7'>
                    <div className='col-6'>
                      <InputField
                        className='form-control'
                        name={pageTitle.name}
                        label={pageTitle.label}
                      />
                    </div>
                    <div className='col-6'>
                      <InputField
                        className='form-control'
                        name={pageSlug.name}
                        label={pageSlug.label}
                      />
                    </div>
                  </div>
                  <div className='mb-7'>
                    <QuillField name={metaDescription.name} label={metaDescription.label} />
                  </div>
                  <div className='row mb-7'>
                    <div className='col-6'>
                      <TagField name={metaRobots.name} label={metaRobots.label} />
                    </div>
                    <div className='col-6'>
                      <TagField name={metaKeywords.name} label={metaKeywords.label} />
                    </div>
                  </div>
                  <div className='mb-7'>
                    <QuillField name={otherMetaData.name} label={otherMetaData.label} />
                  </div>
                  <div className='row'>
                    <div className='col-6'>
                      <div className='mb-7'>
                        <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                          <span>Set page content to be the homepage?</span>
                        </label>
                        <label className='form-check form-switch form-check-custom form-check-solid'>
                          <CheckboxField name={isHome.name} label={isHome.label} required />
                        </label>
                      </div>
                    </div>
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

export default PageContentInfoForm
