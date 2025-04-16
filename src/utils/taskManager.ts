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
  // if (!board) return null;
  // if (!board.tasks.[taskId]) {
  //   throw new Error(`task with id ${taskId} not found` )
  // }

  const updatedTask = { id: taskId, content: newContent };
  return {
    ...board,
    tasks: {
      ...board.tasks,
      [taskId]: { ...board.tasks[taskId], ...updatedTask },
    },
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

export { addTask, editTask, saveBoardToServer };
