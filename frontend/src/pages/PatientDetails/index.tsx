import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { Box, Chip, Divider, Paper, Stack, Typography } from "@mui/material"
import { useEffect } from "react"
import { FormattedMessage } from "react-intl"
import { useParams } from "react-router-dom"
import { FhirPatient } from "shared/types"
import LinkIconButton from "~/components/inputs/buttons/LinkIconButton"
import { useFhirStore } from "~/stores/fhirStore"
import { useAppStore } from "~/stores/index"

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

const FieldRow = ({ label, value }: { label: React.ReactNode; value: string | number | undefined | null }) => (
  <Box display="flex" alignItems="center" mb={1}>
    <Typography variant="subtitle2" sx={{ minWidth: 120, color: "text.secondary" }}>
      {label}:
    </Typography>
    {value !== undefined && value !== null && value !== "" ? (
      <Typography variant="body1" sx={{ ml: 1 }}>
        {value}
      </Typography>
    ) : (
      <span style={{ marginLeft: 8 }}>
        <Chip label="N/A" size="small" />
      </span>
    )}
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
  const { isPending } = useAppStore()
  const { fetchPatientById, selectedPatient, setSelectedPatient } = useFhirStore()

  useEffect(() => {
    if (id) fetchPatientById(id)
  }, [id, fetchPatientById])

  useEffect(() => {
    return () => setSelectedPatient(null)
  }, [setSelectedPatient])

  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Box display="flex" alignItems="center" mb={2}>
        <LinkIconButton Icon={ArrowBackIcon} to="/" aria-label="Back to patients list" />
        <Typography variant="h4" gutterBottom align="center" flex={1}>
          <FormattedMessage id="pages.patientDetails.title" defaultMessage="Patient Details" />
        </Typography>
      </Box>
      {selectedPatient ? (
        <Paper elevation={3} sx={{ p: 3, my: 2 }}>
          <Stack spacing={2} divider={<Divider flexItem />}>
            <FieldRow
              label={<FormattedMessage id="pages.patientDetails.id" defaultMessage="ID" />}
              value={getFieldValue(selectedPatient, PatientField.Id)}
            />
            <FieldRow
              label={<FormattedMessage id="pages.patientDetails.active" defaultMessage="Active" />}
              value={getFieldValue(selectedPatient, PatientField.Active)}
            />
            <FieldRow
              label={<FormattedMessage id="pages.patientDetails.gender" defaultMessage="Gender" />}
              value={getFieldValue(selectedPatient, PatientField.Gender)}
            />
            <FieldRow
              label={<FormattedMessage id="pages.patientDetails.birthDate" defaultMessage="Birth Date" />}
              value={getFieldValue(selectedPatient, PatientField.BirthDate)}
            />
            <FieldRow
              label={<FormattedMessage id="pages.patientDetails.resourceType" defaultMessage="Resource Type" />}
              value={getFieldValue(selectedPatient, PatientField.ResourceType)}
            />
            <FieldRow
              label={<FormattedMessage id="pages.patientDetails.name" defaultMessage="Name" />}
              value={getFieldValue(selectedPatient, PatientField.Name)}
            />
            <FieldRow
              label={<FormattedMessage id="pages.patientDetails.telecom" defaultMessage="Telecom" />}
              value={getFieldValue(selectedPatient, PatientField.Telecom)}
            />
            <FieldRow
              label={<FormattedMessage id="pages.patientDetails.identifier" defaultMessage="Identifier" />}
              value={getFieldValue(selectedPatient, PatientField.Identifier)}
            />
            <FieldRow
              label={<FormattedMessage id="pages.patientDetails.contact" defaultMessage="Contact" />}
              value={getFieldValue(selectedPatient, PatientField.Contact)}
            />
            <FieldRow
              label={<FormattedMessage id="pages.patientDetails.lastUpdated" defaultMessage="Last Updated" />}
              value={getFieldValue(selectedPatient, PatientField.LastUpdated)}
            />
            <FieldRow
              label={<FormattedMessage id="pages.patientDetails.multipleBirth" defaultMessage="Multiple Birth" />}
              value={getFieldValue(selectedPatient, PatientField.MultipleBirth)}
            />
            <FieldRow
              label={<FormattedMessage id="pages.patientDetails.textStatus" defaultMessage="Text Status" />}
              value={getFieldValue(selectedPatient, PatientField.TextStatus)}
            />
          </Stack>
        </Paper>
      ) : (
        !isPending && (
          <Typography color="text.secondary">
            <FormattedMessage id="pages.patientDetails.noData" defaultMessage="No patient data found." />
          </Typography>
        )
      )}
    </Box>
  )
}

export default PatientDetails
