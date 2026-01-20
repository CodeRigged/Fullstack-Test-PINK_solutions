import { Grid2 as Grid } from "@mui/material"
import { ReactElement, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFhirStore } from "~/stores/fhirStore"

/**
 * Renders a simple logout page with a grid layout.
 *
 * @return {ReactElement} The rendered logout page.
 */
const LogoutPage = (): ReactElement => {
  const navigate = useNavigate()
  const { logout } = useFhirStore()

  useEffect(() => {
    logout().finally(() => {
      navigate("/login", { replace: true })
    })
  }, [logout, navigate])

  return (
    <Grid className="logout-page" container alignItems="center" justifyContent="center" spacing={2}>
      <Grid size="auto">
        <h1>Logging out...</h1>
      </Grid>
    </Grid>
  )
}

export default LogoutPage
