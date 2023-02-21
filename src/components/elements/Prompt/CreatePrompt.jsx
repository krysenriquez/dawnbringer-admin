import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const CreatePrompt = () => {
  const swal = withReactContent(Swal)

  return swal
    .fire({
      title: 'Create Supply Request?',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: 'btn btn-primary',
      cancelButtonColor: 'btn btn-info',
      confirmButtonText: 'Submit',
    })
    .then(async (result) => {
      if (result.isConfirmed) {
      }
    })
}

export default CreatePrompt
