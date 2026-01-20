import { Box, Button, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useEffect } from "react"
import { FormattedMessage } from "react-intl"
import { useNavigate } from "react-router-dom"
import { FhirEntry } from "shared/types"
import { useFhirStore } from "~/stores/fhirStore"
import { useAppStore } from "~/stores/index"

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

const FhirPatientsList = () => {
  const { isPending } = useAppStore()
  const { fetchPatients, patients } = useFhirStore()
  const navigate = useNavigate()

  useEffect(() => {
    fetchPatients()
  }, [fetchPatients])

  return (
    <Box maxWidth={480} mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom align="center">
        <FormattedMessage id="pages.landing.patientsTitle" defaultMessage="Patients" />
      </Typography>
      {Array.isArray(patients?.entry) && patients.entry.length > 0 && !isPending && (
        <Box my={2}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <StyledTableHeader>
                  <FormattedMessage id="pages.landing.name" defaultMessage="Name" />
                </StyledTableHeader>
                <StyledTableHeader>
                  <FormattedMessage id="pages.landing.gender" defaultMessage="Gender" />
                </StyledTableHeader>
                <StyledTableHeader>
                  <FormattedMessage id="pages.landing.birthDate" defaultMessage="Birth Date" />
                </StyledTableHeader>
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
                          <FormattedMessage id="pages.landing.view" defaultMessage="View" />
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

export default FhirPatientsList
