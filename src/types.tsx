interface BoardState {
  columns: Record<string, ColumnState>;
  tasks: Record<string, Task>;
}

interface Task {
  id: string;
  content: string;
}

interface TaskProps {
  task: Task;
  index: number;
}

interface ColumnState {
  id: string;
  title: string;
  taskIds: string[];
}

interface ColumnProps {
  column: ColumnState;
  tasks: Record<string, Task>;
  handleAddTask: HandleAddTask;
}

interface TaskInputProps {
  inputSwaper: InputSwaper;
  handleAddTask: HandleAddTask;
  columnId: string;
}

type HandleAddTask = (content: string, columnId: string) => void;

type InputSwaper = () => void;

export type {
  BoardState,
  ColumnState,
  ColumnProps,
  Task,
  TaskProps,
  TaskInputProps,
};
