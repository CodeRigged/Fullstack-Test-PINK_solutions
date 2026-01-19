import { Grid2 as Grid } from "@mui/material"
import { ReactElement, useEffect } from "react"
import { useNavigate } from "react-router-dom"

/**
 * Renders a simple logout page with a grid layout.
 *
 * @return {ReactElement} The rendered logout page.
 */
const LogoutPage = (): ReactElement => {
  const navigate = useNavigate()
  useEffect(() => {
    fetch("http://localhost:5000/fhir/stop", { method: "POST", credentials: "include" }).finally(() => {
      // Optionally clear frontend state here
      navigate("/login", { replace: true })
    })
  }, [navigate])
  return (
    <Grid className="logout-page" container alignItems="center" justifyContent="center" spacing={2}>
      <Grid size="auto">
        <h1>You have been logged out</h1>
      </Grid>
    </Grid>
  )
}

export default LogoutPage
