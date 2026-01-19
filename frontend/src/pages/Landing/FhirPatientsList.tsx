import { Box, CircularProgress, Typography } from "@mui/material"
import { useEffect } from "react"
import { useFhirStore } from "~/stores/fhirStore"

const TodoList = () => {
  const { fetchPatients, patients, isPending, text: pendingMessage } = useFhirStore()

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
      <pre>{JSON.stringify(patients, null, 2)}</pre>
    </Box>
  )
}

export default TodoList
