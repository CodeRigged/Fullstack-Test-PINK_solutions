/**
 * Zustand store for FHIR-related state and actions.
 * Handles authentication, patient data, and FHIR client session management.
 */
import { FhirBundle, FhirPatient } from "shared/types"
import { create } from "zustand"
import { Nullable } from "~/types/utils"
import { apiFetch } from "~/utils/api"
import { useAppStore } from "./index"

/**
 * FHIR store interface defining state and actions.
 */
interface FhirStore {
  checkSession: () => Promise<void>
  fetchPatientById: (id: string) => Promise<void>
  fetchPatients: () => Promise<void>
  isAuthenticated: boolean
  logout: () => Promise<void>
  patients: Nullable<FhirBundle>
  selectedPatient: Nullable<FhirPatient>
  setIsAuthenticated: (auth: boolean) => void
  setSelectedPatient: (patient: Nullable<FhirPatient>) => void
  startFhirClient: () => void
}

const PATIENTS_API_ENDPOINT = "/fhir"

export const useFhirStore = create<FhirStore>((set, get) => ({
  /**
   * The FHIR Bundle of patients, or null if not loaded.
   */
  patients: null,
  /**
   * The currently selected FHIR patient, or null if none.
   */
  selectedPatient: null,
  /**
   * Whether the user is authenticated with the FHIR server.
   */
  isAuthenticated: false,

  /**
   * Sets the selected patient.
   */
  setSelectedPatient: (patient: Nullable<FhirPatient>) => set({ selectedPatient: patient }),
  /**
   * Sets the authentication state.
   */
  setIsAuthenticated: (auth: boolean) => set({ isAuthenticated: auth }),

  /**
   * Starts the FHIR OAuth client flow by redirecting the browser.
   */
  startFhirClient: () => {
    window.location.href = "http://localhost:5000/fhir/start"
  },

  /**
   * Logs out the user and clears FHIR-related state.
   */
  logout: async () => {
    const { setIsPending } = useAppStore.getState()
    setIsPending(true, "Logging out...")
    try {
      await apiFetch("/fhir/stop", { method: "POST", credentials: "include" })
    } finally {
      set({
        isAuthenticated: false,
        patients: null,
        selectedPatient: null,
      })
      setIsPending(false)
    }
  },

  /**
   * Fetches all patients from the FHIR server and updates the store.
   */
  fetchPatients: async () => {
    const { setIsPending } = useAppStore.getState()
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

  /**
   * Checks if the user has a valid FHIR session and updates authentication state.
   */
  checkSession: async () => {
    const { setIsPending } = useAppStore.getState()
    const { setIsAuthenticated } = get()
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

  /**
   * Fetches a single patient by ID from the FHIR server and updates selectedPatient.
   */
  fetchPatientById: async (id: string) => {
    const { setIsPending } = useAppStore.getState()
    setIsPending(true, "Fetching patient by ID...")
    try {
      const res = await apiFetch(`${PATIENTS_API_ENDPOINT}/patients/${id}`, { credentials: "include" })
      if (res.status === 401 || res.status === 403) {
        set({ selectedPatient: null })
        return
      }
      if (!res.ok) {
        set({ selectedPatient: null })
        return
      }
      const data = await res.json()
      set({ selectedPatient: data })
    } catch {
      set({ selectedPatient: null })
    } finally {
      setIsPending(false)
    }
  },
}))
