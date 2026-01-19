import { Todo } from "shared/types"
import { create } from "zustand"
import { apiFetch } from "~/utils/api"
import { createPendingSlice, PendingState } from "./state-handlers"

interface TodoStore extends PendingState {
  addTodo: (text: string) => Promise<void>
  deleteTodo: (id: Todo["_id"]) => Promise<void>
  fetchTodos: () => Promise<void>
  todos: Todo[]
  updateTodo: (id: Todo["_id"], updates: Partial<Pick<Todo, "text">>) => Promise<void>
}

const TODO_API_ENDPOINT = "/todos"

export const useTodoStore = create<TodoStore>((set, get, ...args) => ({
  ...createPendingSlice(set, get, ...args),
  todos: [],
  fetchTodos: async () => {
    const { setIsPending } = get()
    setIsPending(true, "Fetching todos...")
    try {
      const res = await apiFetch(TODO_API_ENDPOINT)
      const data = await res.json()
      set({ todos: data.todos })
    } finally {
      setIsPending(false)
    }
  },
  addTodo: async text => {
    const { setIsPending, fetchTodos } = get()
    setIsPending(true, "Adding todo...")
    try {
      await apiFetch(TODO_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })
      await fetchTodos()
    } finally {
      setIsPending(false)
    }
  },
  updateTodo: async (id, updates) => {
    const { setIsPending, fetchTodos } = get()
    setIsPending(true, "Updating todo...")
    try {
      await apiFetch(`${TODO_API_ENDPOINT}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      await fetchTodos()
    } finally {
      setIsPending(false)
    }
  },
  deleteTodo: async id => {
    const { setIsPending, fetchTodos } = get()
    setIsPending(true, "Deleting todo...")
    try {
      await apiFetch(`${TODO_API_ENDPOINT}/${id}`, { method: "DELETE" })
      await fetchTodos()
    } finally {
      setIsPending(false)
    }
  },
}))
