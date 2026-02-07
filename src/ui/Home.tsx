import CreateUser from '../features/user/CreateUser'
import { resetUser } from '../features/user/userSlice'
import { ROUTES } from '../routes'
import { useAppDispatch, useAppSelector } from '../store'
import Button from './Button'

function Home() {
  const username = useAppSelector((state) => state.user?.username)
  const dispatch = useAppDispatch()

  return (
    <div className="my-10 animate-fade-in px-4 text-center sm:my-16">
      <h1 className="mb-8 animate-slide-up text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="animate-bounce-subtle bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {!username ? (
        <CreateUser />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <Button to={ROUTES.MENU} type="primary">
            Continue ordering as {username}
          </Button>
          <button
            onClick={() => dispatch(resetUser())}
            className="text-sm text-primary-600 transition-colors duration-200 hover:text-primary-700 hover:underline"
          >
            I'm not {username}
          </button>
        </div>
      )}
    </div>
  )
}

export default Home
