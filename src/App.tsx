import './App.css';

import { BoardState, Task } from './types';
import { Column } from './components/Column';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useState, useEffect } from 'react';

function App() {
  const [board, setBoard] = useState<BoardState | null>(null);

  // query to the server
  useEffect(() => {
    fetch('http://localhost:3000/board')
      .then((responce) => {
        return responce.json();
      })
      .then((data) => setBoard(data))
      .catch((err) => console.log('Error:', err));
  }, []);

  useEffect(() => {
    if (board) {
      // console.log('board', board);
      localStorage.setItem('boardState', JSON.stringify(board));

      // update data on the server
      fetch('http://localhost:3000/board', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(board),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to update server: ${response.status}`);
          }
          console.log('server updated');
        })
        .catch((err) => console.error('Error:', err));
    }
  }, [board]);

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    // drop out of the destination zone
    if (!board || !destination) {
      return;
    }

    // drop in the same place
    if (
      source.droppableId === destination?.droppableId &&
      source.index === destination?.index
    ) {
      return;
    }

    // drop in a new palce
    const newBoard = { ...board };

    const sourceColumn = newBoard.columns[source.droppableId];
    const destColumn = newBoard.columns[destination.droppableId];
    const [movedTaskId] = sourceColumn.taskIds.splice(source.index, 1); // del task from pre column
    destColumn.taskIds.splice(destination.index, 0, movedTaskId); // add to current column

    // Update states
    setBoard(newBoard);
  }

  const handleAddTask = (content: string, columnId: string) => {
    const newTaskId = `${Date.now()}`;
    const newTask: Task = { id: newTaskId, content };

    setBoard((prevBoard) => {
      if (!prevBoard) return null;

      return {
        ...prevBoard,
        tasks: {
          ...prevBoard.tasks,
          [newTaskId]: newTask,
        },

        columns: {
          ...prevBoard.columns,
          [columnId]: {
            ...prevBoard.columns[columnId],
            taskIds: [...prevBoard.columns[columnId].taskIds, newTaskId],
          },
        },
      };
    });
  };

  const handleEditTask = (taskId: string, newContent: string) => {
    if (!board) return null;

    setBoard((prevBoard) => {
      if (!prevBoard) return null;
      const updatedTask = { id: taskId, content: newContent };
      const updatedBoard = {
        ...prevBoard,
        tasks: {
          ...prevBoard.tasks,
          [taskId]: { ...prevBoard.tasks[taskId], ...updatedTask },
        },
      };
      fetch('http://localhost:3000/board', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBoard),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed ti update server: ${response.status}`);
          }
          console.log('task updated on server');
        })
        .catch((err) => console.error('Error updating on server:', err));
      return updatedBoard;
    });
  };

  const handleDeleteTask = (taskId: string) => {
    if (!board) return null;
    setBoard((prevBoard) => {
      if (!prevBoard) {
        return null;
      }

      const updatedBoard = {
        ...prevBoard,
        columns: {
          ...prevBoard.columns,
          ...Object.fromEntries(
            Object.entries(prevBoard.columns).map(([colId, col]) => [
              colId,
              { ...col, taskIds: col.taskIds.filter((id) => id !== taskId) },
            ]),
          ),
        },

        tasks: Object.fromEntries(
          Object.entries(prevBoard.tasks).filter(([id]) => id !== taskId),
        ),
      };
      // console.log('updatedBoard after del', updatedBoard);
      fetch('http://localhost:3000/board', {
        method: 'PUT',
        headers: { 'Content-Type': ' application/json' },
        body: JSON.stringify(updatedBoard),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `failed to upd server (del task): ${response.status}`,
            );
          }
          console.log('task deleted from server');
        })
        .catch((err) => console.error('Error del task from server:', err));
      return updatedBoard;
    });
  };

  if (!board) return <div>Loading...</div>;
  return (
    <>
      <h1>Trello board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="workspace">
          {board
            ? Object.values(board.columns).map((columnData) => (
                <Column
                  column={columnData}
                  tasks={board.tasks}
                  key={columnData.id}
                  handleAddTask={handleAddTask}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                />
              ))
            : ''}
        </div>
      </DragDropContext>
    </>
  );
}

export default App;
