import Signup from '../../Components/UserComponent/Signup'
import { verifyUserJWT } from '../../Util/verifyUserJWT'
import { Navigate } from 'react-router-dom'

function SignupPage() {
  console.log(`**** SignupPage *****`)
  const userLogged = verifyUserJWT()

  return userLogged ? <Navigate to="/user/home" /> : <Signup />
}

export default SignupPage
