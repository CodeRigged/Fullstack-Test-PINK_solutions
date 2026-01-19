import { create, StateCreator } from "zustand"
import { Nullable } from "~/types/utils"

interface ErrorStore {
  error: Nullable<Error>
  setError: (error?: Nullable<Error>) => void
}

export const useErrorStore = create<ErrorStore>(set => ({
  error: null,
  setError: (error = null) => set({ error }),
}))

export interface PendingState {
  isPending: boolean
  setIsPending: (pending: boolean, text?: Nullable<string>) => void
  text: Nullable<string>
}

export const createPendingSlice: StateCreator<PendingState> = set => ({
  isPending: false,
  text: null,
  setIsPending: (isPending, text = null) => set({ isPending, text }),
})
