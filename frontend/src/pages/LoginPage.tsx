import { Box, Button, Typography } from "@mui/material"
import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useFhirStore } from "~/stores/fhirStore"
import { useAppStore } from "../stores"

const LoginPage = () => {
  const { isPending } = useAppStore()
  const { startFhirClient, checkSession, isAuthenticated } = useFhirStore()

  useEffect(() => {
    checkSession()
  }, [checkSession])

  // Redirect to home if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleLogin = startFhirClient

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Typography variant="h4" gutterBottom>
        Welcome to FHIR Patient Portal
      </Typography>
      <Typography variant="body1" mb={4}>
        Please log in to start the FHIR client and access patient data.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogin} disabled={isPending} size="large">
        Connect to FHIR Client
      </Button>
    </Box>
  )
}

export default LoginPage
