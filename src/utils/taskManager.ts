import { BoardState, Task } from '../types';

const addTask = (board: BoardState, content: string, columnId: string) => {
  const newTaskId = `${Date.now()}`;
  const newTask: Task = { id: newTaskId, content };

  return {
    ...board,
    tasks: {
      ...board.tasks,
      [newTaskId]: newTask,
    },

    columns: {
      ...board.columns,
      [columnId]: {
        ...board.columns[columnId],
        taskIds: [...board.columns[columnId].taskIds, newTaskId],
      },
    },
  };
};

const editTask = (board: BoardState, taskId: string, newContent: string) => {
  if (!board.tasks[taskId]) {
    console.log(`task with id ${taskId} not found`);
    return board;
  }

  const updatedTask = { id: taskId, content: newContent };
  return {
    ...board,
    tasks: {
      ...board.tasks,
      [taskId]: { ...board.tasks[taskId], ...updatedTask },
    },
  };
};

const deleteTask = (board: BoardState, taskId: string): BoardState => {
  if (!board.tasks[taskId]) return board;

  return {
    ...board,
    columns: {
      ...board.columns,
      ...Object.fromEntries(
        Object.entries(board.columns).map(([colId, col]) => [
          colId,
          { ...col, taskIds: col.taskIds.filter((id) => id !== taskId) },
        ]),
      ),
    },

    tasks: Object.fromEntries(
      Object.entries(board.tasks).filter(([id]) => id !== taskId),
    ),
  };
};

const saveBoardToServer = (board: BoardState): Promise<void> => {
  return fetch('http://localhost:3000/board', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(board),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed ti update server: ${response.status}`);
      }
      console.log('task updated on server');
    })
    .catch((err) => console.error('Error updating on server:', err));
};

export { addTask, editTask, deleteTask, saveBoardToServer };
