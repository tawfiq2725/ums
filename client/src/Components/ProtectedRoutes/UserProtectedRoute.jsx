import { verifyUserJWT } from '../../Util/verifyUserJWT'
import { Navigate } from 'react-router-dom'

function UserProtectedRoute({children}) {

  const userLogged = verifyUserJWT()

  return userLogged ? <> {children} </> : <Navigate to="/" />
}

export default UserProtectedRoute
