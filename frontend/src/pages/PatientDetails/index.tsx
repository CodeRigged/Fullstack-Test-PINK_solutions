import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { Box, Chip, CircularProgress, Divider, Paper, Stack, Typography } from "@mui/material"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { FhirPatient } from "shared/types"
import LinkIconButton from "~/components/inputs/buttons/LinkIconButton"
import { useFhirStore } from "~/stores/fhirStore"

// Enum for patient detail fields
enum PatientField {
  Active = "active",
  BirthDate = "birthDate",
  Contact = "Contact",
  Gender = "gender",
  Id = "id",
  Identifier = "Identifier",
  LastUpdated = "Last Updated",
  MultipleBirth = "Multiple Birth",
  Name = "Name",
  ResourceType = "resourceType",
  Telecom = "Telecom",
  TextStatus = "Text Status",
}

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

function getFieldValue(patient: FhirPatient, field: PatientField): string {
  if (!patient) return ""
  switch (field) {
    case PatientField.Name:
      if (patient.name && patient.name.length > 0) {
        const n = patient.name[0]
        return `${n.family ?? ""} ${Array.isArray(n.given) ? n.given.join(" ") : ""}`.trim()
      }
      return ""
    case PatientField.Telecom:
      return Array.isArray(patient.telecom)
        ? patient.telecom.map(t => `${t.system ?? ""}: ${t.value ?? ""}`).join(", ")
        : ""
    case PatientField.Identifier:
      return Array.isArray(patient.identifier) ? patient.identifier.map(i => i.value ?? "").join(", ") : ""
    case PatientField.Contact:
      return Array.isArray(patient.contact)
        ? patient.contact.map(c => c.relationship?.[0]?.coding?.[0]?.code ?? "").join(", ")
        : ""
    case PatientField.LastUpdated:
      return patient.meta?.lastUpdated ?? ""
    case PatientField.MultipleBirth:
      return patient.multipleBirthInteger !== undefined ? String(patient.multipleBirthInteger) : ""
    case PatientField.TextStatus:
      return patient.text?.status ?? ""
    case PatientField.Id:
      return patient.id ?? ""
    case PatientField.Active:
      return patient.active ? "Yes" : "No"
    case PatientField.Gender:
      return patient.gender ?? ""
    case PatientField.BirthDate:
      return patient.birthDate ?? ""
    case PatientField.ResourceType:
      return patient.resourceType ?? ""
    default:
      return ""
  }
}

const PatientDetails = () => {
  const { id } = useParams()
  const { fetchPatientById, selectedPatient, isPending, text: pendingMessage } = useFhirStore()

  useEffect(() => {
    if (id) fetchPatientById(id)
  }, [id, fetchPatientById])

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Box display="flex" alignItems="center" mb={2}>
        <LinkIconButton Icon={ArrowBackIcon} to="/" aria-label="Back to patients list" />
        <Typography variant="h4" gutterBottom align="center" flex={1}>
          Patient Details
        </Typography>
      </Box>
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
            <FieldRow label="ID" value={getFieldValue(selectedPatient, PatientField.Id)} />
            <FieldRow label="Active" value={getFieldValue(selectedPatient, PatientField.Active)} />
            <FieldRow label="Gender" value={getFieldValue(selectedPatient, PatientField.Gender)} />
            <FieldRow label="Birth Date" value={getFieldValue(selectedPatient, PatientField.BirthDate)} />
            <FieldRow label="Resource Type" value={getFieldValue(selectedPatient, PatientField.ResourceType)} />
            <FieldRow label="Name" value={getFieldValue(selectedPatient, PatientField.Name)} />
            <FieldRow label="Telecom" value={getFieldValue(selectedPatient, PatientField.Telecom)} />
            <FieldRow label="Identifier" value={getFieldValue(selectedPatient, PatientField.Identifier)} />
            <FieldRow label="Contact" value={getFieldValue(selectedPatient, PatientField.Contact)} />
            <FieldRow label="Last Updated" value={getFieldValue(selectedPatient, PatientField.LastUpdated)} />
            <FieldRow label="Multiple Birth" value={getFieldValue(selectedPatient, PatientField.MultipleBirth)} />
            <FieldRow label="Text Status" value={getFieldValue(selectedPatient, PatientField.TextStatus)} />
          </Stack>
        </Paper>
      ) : (
        !isPending && <Typography color="text.secondary">No patient data found.</Typography>
      )}
    </Box>
  )
}

export default PatientDetails
