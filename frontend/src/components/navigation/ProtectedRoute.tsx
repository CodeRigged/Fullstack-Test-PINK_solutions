import { Navigate, Outlet } from "react-router-dom"
import { useFhirStore } from "~/stores/fhirStore"

const ProtectedRoute = () => {
  const { isAuthenticated } = useFhirStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}
export default ProtectedRoute
