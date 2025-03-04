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
  onEditTask?: (taskId: string, newContent: string) => void;
  onDeleteTask?: (taskId: string) => void;
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
  onEditTask: (taskId: string, newContent: string) => void;
  onDeleteTask?: (taskId: string) => void;
}

interface TaskInputProps {
  inputSwaper: InputSwaper;
  handleAddTask: HandleAddTask;
  columnId: string;
}

interface EditFormProps {
  initialContent: string;
  taskId: string;
  onSave: (newContent: string) => void;
  onCancel: () => void;
  onDeleteTask?: (taskId: string) => void;
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
  EditFormProps,
};
