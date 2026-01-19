import { Document, Schema, model } from "mongoose";
import { Todo as TodoType } from "shared/types";

export type ITodo = TodoType & Document;

const todoSchema = new Schema<ITodo>({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

export const Todo = model<ITodo>("Todo", todoSchema);
