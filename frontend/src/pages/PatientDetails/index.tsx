import { Box, Chip, CircularProgress, Divider, Paper, Stack, Typography } from "@mui/material"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useFhirStore } from "~/stores/fhirStore"

const FieldRow = ({ label, value }: { label: string; value: string | number | undefined | null }) => (
  <Box display="flex" alignItems="center" mb={1}>
    <Typography variant="subtitle2" sx={{ minWidth: 120, color: "text.secondary" }}>
      {label}:
    </Typography>
    <Typography variant="body1" sx={{ ml: 1 }}>
      {value !== undefined && value !== null && value !== "" ? value : <Chip label="N/A" size="small" />}
    </Typography>
  </Box>
)

const PatientDetails = () => {
  const { id } = useParams()
  const { fetchPatientById, selectedPatient, isPending, text: pendingMessage } = useFhirStore()

  useEffect(() => {
    if (id) fetchPatientById(id)
  }, [id, fetchPatientById])

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom align="center">
        Patient Details
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
      {selectedPatient ? (
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <Stack spacing={2} divider={<Divider flexItem />}>
            <FieldRow label="ID" value={selectedPatient.id} />
            <FieldRow label="Active" value={selectedPatient.active ? "Yes" : "No"} />
            <FieldRow label="Gender" value={selectedPatient.gender} />
            <FieldRow label="Birth Date" value={selectedPatient.birthDate} />
            <FieldRow label="Resource Type" value={selectedPatient.resourceType} />
            {selectedPatient.name && selectedPatient.name.length > 0 && (
              <FieldRow
                label="Name"
                value={`${selectedPatient.name[0].family ?? ""} ${Array.isArray(selectedPatient.name[0].given) ? selectedPatient.name[0].given.join(" ") : ""}`.trim()}
              />
            )}
            {selectedPatient.telecom && (
              <FieldRow
                label="Telecom"
                value={
                  Array.isArray(selectedPatient.telecom)
                    ? selectedPatient.telecom.map(t => `${t.system ?? ""}: ${t.value ?? ""}`).join(", ")
                    : ""
                }
              />
            )}
            {selectedPatient.identifier && (
              <FieldRow
                label="Identifier"
                value={
                  Array.isArray(selectedPatient.identifier)
                    ? selectedPatient.identifier.map(i => i.value ?? "").join(", ")
                    : ""
                }
              />
            )}
            {selectedPatient.contact && (
              <FieldRow
                label="Contact"
                value={
                  Array.isArray(selectedPatient.contact)
                    ? selectedPatient.contact.map(c => c.relationship?.[0]?.coding?.[0]?.code ?? "").join(", ")
                    : ""
                }
              />
            )}
            {selectedPatient.meta && <FieldRow label="Last Updated" value={selectedPatient.meta.lastUpdated} />}
            {selectedPatient.multipleBirthInteger !== undefined && (
              <FieldRow label="Multiple Birth" value={selectedPatient.multipleBirthInteger} />
            )}
            {selectedPatient.text && <FieldRow label="Text Status" value={selectedPatient.text.status} />}
          </Stack>
        </Paper>
      ) : (
        !isPending && <Typography color="text.secondary">No patient data found.</Typography>
      )}
    </Box>
  )
}

export default PatientDetails
