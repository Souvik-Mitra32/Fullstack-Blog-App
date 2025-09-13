import type { Todo } from "../pages/TodoList"

type TodoItemProps = Pick<Todo, "title" | "completed">

export function TodoItem({ title, completed }: TodoItemProps) {
  return <li className={completed ? "strike-through" : undefined}>{title}</li>
}
