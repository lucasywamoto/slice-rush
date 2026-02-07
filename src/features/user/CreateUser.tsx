import { FormEvent, useState } from 'react'
import Button from '../../ui/Button'
import { updateName } from './userSlice'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes'
import { useAppDispatch } from '../../store'

function CreateUser() {
  const [username, setUsername] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!username) return

    dispatch(updateName(username))
    navigate(ROUTES.MENU)
  }

  return (
    <form onSubmit={handleSubmit} className="animate-scale-in">
      <p className="mb-4 text-sm text-slate-700 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-8 w-72"
      />

      {username !== '' && (
        <div className="animate-fade-in">
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  )
}

export default CreateUser
