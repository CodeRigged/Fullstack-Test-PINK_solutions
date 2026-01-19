import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useFhirStore } from "~/stores/fhirStore"

const LoginPage = () => {
  const { startFhirClient, isPending, text: pendingMessage, checkSession, isAuthenticated } = useFhirStore()
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
        {isPending ? (
          <>
            <CircularProgress size={20} color="inherit" />
            <span style={{ marginLeft: 8 }}>Starting...</span>
          </>
        ) : (
          "Connect to FHIR Client"
        )}
      </Button>
      {pendingMessage && (
        <Typography mt={2} color="text.secondary">
          {pendingMessage}
        </Typography>
      )}
    </Box>
  )
}

export default LoginPage
