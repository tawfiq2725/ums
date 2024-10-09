import { Navigate } from "react-router-dom"
import verifyAdminJWT from "../../Util/verifyAdminJWT"


function AdminProtectedRoute({children}) {
    const  adminLoggined = verifyAdminJWT()

    return adminLoggined ? <>{children}</> : <Navigate to="/admin" />
}

export default AdminProtectedRoute
