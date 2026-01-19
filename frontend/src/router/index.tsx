import { createBrowserRouter } from "react-router-dom"
import ProtectedRoute from "~/components/navigation/ProtectedRoute"
import AppLayout from "~/layouts/AppLayout"
import LandingPage from "~/pages/Landing"
import LoginPage from "~/pages/LoginPage"
import LogoutPage from "~/pages/LogoutPage"
import PatientDetailsPage from "~/pages/PatientDetails"
import ProfilePage from "~/pages/Profile"
import SettingsPage from "~/pages/Settings"

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
          { path: "/patients/:id", element: <PatientDetailsPage /> },
        ],
      },
      { path: "/logout", element: <LogoutPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "*", element: <div>404 Not Found</div> },
    ],
  },
])

export default router
