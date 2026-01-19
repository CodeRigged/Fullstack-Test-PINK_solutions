import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FhirEntry } from "shared/types"
import { useFhirStore } from "~/stores/fhirStore"

const StyledTableHeader = styled("th")(({ theme }) => ({
  textAlign: "left",
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
  fontWeight: 600,
}))

const StyledTableRow = styled("tr")(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "& td": {
    padding: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}))

const TodoList = () => {
  const { fetchPatients, patients, isPending, text: pendingMessage } = useFhirStore()
  const navigate = useNavigate()

  useEffect(() => {
    fetchPatients()
  }, [fetchPatients])

  return (
    <Box maxWidth={480} mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom align="center">
        Patients
      </Typography>
      {isPending && (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress size={32} />
          {pendingMessage && (
            <Typography ml={2} color="text.secondary">
              {pendingMessage}
            </Typography>
          )}
        </Box>
      )}
      {Array.isArray(patients?.entry) && patients.entry.length > 0 && (
        <Box my={2}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <StyledTableHeader>Name</StyledTableHeader>
                <StyledTableHeader>Gender</StyledTableHeader>
                <StyledTableHeader>Birth Date</StyledTableHeader>
                <StyledTableHeader></StyledTableHeader>
              </tr>
            </thead>
            <tbody>
              {patients.entry
                .filter((entry: FhirEntry) => entry.resource?.resourceType === "Patient")
                .map((entry: FhirEntry) => {
                  const patient = entry.resource
                  const nameObj = Array.isArray(patient.name) && patient.name.length > 0 ? patient.name[0] : {}
                  const family = nameObj.family || ""
                  const given = Array.isArray(nameObj.given) ? nameObj.given.join(" ") : ""
                  return (
                    <StyledTableRow key={patient.id}>
                      <td>{`${family} ${given}`.trim() || "-"}</td>
                      <td>{patient.gender || "-"}</td>
                      <td>{patient.birthDate || "-"}</td>
                      <td>
                        <Button variant="outlined" size="small" onClick={() => navigate(`/patients/${patient.id}`)}>
                          View
                        </Button>
                      </td>
                    </StyledTableRow>
                  )
                })}
            </tbody>
          </table>
        </Box>
      )}
    </Box>
  )
}

export default TodoList
