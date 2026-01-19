import { createBrowserRouter, Navigate, Outlet } from "react-router-dom"
import AppLayout from "~/layouts/AppLayout"
import LandingPage from "~/pages/Landing"
import LoginPage from "~/pages/LoginPage"
import LogoutPage from "~/pages/LogoutPage"
import ProfilePage from "~/pages/Profile"
import SettingsPage from "~/pages/Settings"
import { useFhirStore } from "~/stores/fhirStore"
// ProtectedRoute: redirects to login if not authenticated
function ProtectedRoute() {
  const { isAuthenticated } = useFhirStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        element: <ProtectedRoute />, // All children here require auth
        children: [
          { path: "/", element: <LandingPage /> },
          { path: "/profile", element: <ProfilePage /> },
          { path: "/settings", element: <SettingsPage /> },
        ],
      },
      { path: "/logout", element: <LogoutPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "*", element: <div>404 Not Found</div> },
    ],
  },
])

export default router
