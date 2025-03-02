import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { BoardState, Task } from './types';
import { Column } from './components/Column';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useState, useEffect } from 'react';

function App() {
  const initialData: BoardState = {
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'Нужно сделать',
        taskIds: ['6', '4', '2', '5', '1'],
      },
      'column-2': { id: 'column-2', title: 'В работе', taskIds: ['3'] },
      'column-3': { id: 'column-3', title: 'Готово', taskIds: [] },
    },
    tasks: {
      'task-1': { id: '1', content: 'Порефакторить код' },
      'task-2': { id: '2', content: 'Пройти тесты' },
      'task-3': { id: '3', content: 'Покушать кашу' },
      'task-4': { id: '4', content: 'Пойти погулять' },
      'task-5': { id: '5', content: 'Записаться на занятие' },
      'task-6': { id: '6', content: 'Посмотреть видео' },
    },
  };

  const [board, setBoard] = useState<BoardState>(() => {
    const savedBoard = localStorage.getItem('boardState');
    return savedBoard ? JSON.parse(savedBoard) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('boardState', JSON.stringify(board));
  }, [board]);

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    // drop out of the destination zone
    if (!destination) {
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
    setBoard((prevBoard) =>
      // console.log(prevBoard);

      ({
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
      }),
    );
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + Reac1t</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="workspace">
          {Object.values(board.columns).map((columnData) => (
            // console.log(columnData.id);
            <Column
              column={columnData}
              tasks={board.tasks}
              key={columnData.id}
              handleAddTask={handleAddTask}
            />
          ))}
        </div>
      </DragDropContext>
    </>
  );
}

export default App;
