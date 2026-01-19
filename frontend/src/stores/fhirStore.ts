import { FhirBundle, FhirPatient } from "shared/types"
import { create } from "zustand"
import { apiFetch } from "~/utils/api"
import { createPendingSlice, PendingState } from "./state-handlers"

interface FhirStore extends PendingState {
  checkSession: () => Promise<void>
  fetchPatientById: (id: string) => Promise<void>
  fetchPatients: () => Promise<void>
  isAuthenticated: boolean
  patients: FhirBundle | null
  selectedPatient: FhirPatient | null
  setIsAuthenticated: (auth: boolean) => void
  startFhirClient: () => void
}

const PATIENTS_API_ENDPOINT = "/fhir"

export const useFhirStore = create<FhirStore>((set, get, ...args) => ({
  ...createPendingSlice(set, get, ...args),
  patients: null,
  selectedPatient: null,
  isAuthenticated: false,
  setIsAuthenticated: (auth: boolean) => set({ isAuthenticated: auth }),
  startFhirClient: () => {
    window.location.href = "http://localhost:5000/fhir/start"
  },
  fetchPatients: async () => {
    const { setIsPending } = get()
    setIsPending(true, "Fetching patients...")
    try {
      const res = await apiFetch(`${PATIENTS_API_ENDPOINT}/patients`, {
        credentials: "include",
      })
      if (res.status === 401 || res.status === 403) {
        set({ patients: null })
        return
      }
      const data = await res.json()
      set({ patients: data })
    } catch {
      set({ patients: null })
    } finally {
      setIsPending(false)
    }
  },

  checkSession: async () => {
    const { setIsPending, setIsAuthenticated } = get()
    setIsPending(true, "Checking session...")
    try {
      const res = await apiFetch("/fhir/check-session", { credentials: "include" })
      if (res.status === 200) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    } catch {
      setIsAuthenticated(false)
    } finally {
      setIsPending(false)
    }
  },
  fetchPatientById: async (id: string) => {
    const { setIsPending } = get()
    setIsPending(true, "Fetching patient by ID...")
    try {
      const res = await apiFetch(`${PATIENTS_API_ENDPOINT}/patients/${id}`, { credentials: "include" })
      const data = await res.json()
      set({ selectedPatient: data })
    } finally {
      setIsPending(false)
    }
  },
}))
