import Login from '../Login/Login.tsx'
import { Dispatch, SetStateAction } from 'react'

const UnauthorisedView = ({
  setIsAuthorised
}: {
  setIsAuthorised: Dispatch<SetStateAction<boolean>>
}) => {
  return <Login setIsAuthorised={setIsAuthorised} />
}

export default UnauthorisedView
