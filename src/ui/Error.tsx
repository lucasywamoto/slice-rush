import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import LinkButton from './LinkButton'

function Error() {
  const error = useRouteError()
  console.log(error)

  let errorMessage = 'An unexpected error occurred'

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data || error.statusText
  } else if (error && typeof error === 'object' && 'message' in error) {
    errorMessage = (error as Error).message
  } else if (typeof error === 'string') {
    errorMessage = error
  }

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{errorMessage}</p>
      <LinkButton to={-1}>&larr; Go back</LinkButton>
    </div>
  )
}

export default Error
