import { ITodo, Todo } from "../models/Todo";

/**
 * Fetch all todos from the database.
 * @returns {Promise<ITodo[]>} Array of todo documents
 */
export const getAllTodos = async (): Promise<ITodo[]> => {
  return Todo.find();
};

/**
 * Create a new todo with the given text.
 * @param {string} text - The text of the todo
 * @returns {Promise<ITodo>} The created todo document
 */
export const createTodo = async (text: string): Promise<ITodo> => {
  const todo = new Todo({ text });
  return todo.save();
};

/**
 * Update the text of a todo by its ID.
 * @param {string} id - The ID of the todo to update
 * @param {string} text - The new text for the todo
 * @returns {Promise<ITodo | null>} The updated todo document, or null if not found
 */
export const updateTodo = async (
  id: string,
  text: string
): Promise<ITodo | null> => {
  return Todo.findByIdAndUpdate(id, { text }, { new: true });
};

/**
 * Delete a todo by its ID.
 * @param {string} id - The ID of the todo to delete
 * @returns {Promise<ITodo | null>} The deleted todo document, or null if not found
 */
export const deleteTodo = async (id: string): Promise<ITodo | null> => {
  return Todo.findByIdAndDelete(id);
};
