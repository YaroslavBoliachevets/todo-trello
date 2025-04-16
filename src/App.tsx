import './App.css';

import { BoardState } from './types';
import { Column } from './components/Column';

import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useState, useEffect } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';

import { initialData } from './initialData';
import { addTask, editTask, saveBoardToServer } from './utils/taskManager';

function App() {
  const [board, setBoard] = useState<BoardState | null>(null);

  // query to the server
  useEffect(() => {
    fetch('http://localhost:3000/board')
      .then((responce) => {
        return responce.json();
      })
      .then((data) => {
        console.log('data', data);
        setBoard(data);
      })
      .catch((err) => {
        console.log('Error:', err);
        setBoard(initialData);
      });
  }, []);

  useEffect(() => {
    // update data on the server when board updates
    if (board) {
      // console.log('board', board);
      localStorage.setItem('boardState', JSON.stringify(board));
      saveBoardToServer(board);
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
    if (!board) return;
    const updatedBoard = addTask(board, content, columnId);
    setBoard(updatedBoard);
  };

  const handleEditTask = (taskId: string, newContent: string) => {
    if (!board) return null;

    const updatedTask = editTask(board, taskId, newContent);
    setBoard(updatedTask);
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
    <Box minH="10vh" bgGradient="linear(to-b, #EDF2F7, #E2E8F0)">
      <Box textAlign="center" mb={6} pt={6}>
        <Heading
          as="h1"
          size="xl"
          textAlign="center"
          mb={6}
          color="#2D3748"
          textTransform="uppercase"
          letterSpacing="wide"
          fontWeight="bold"
          _hover={{ color: '#2C7A7B', transition: 'color 0.3s' }}
          position="relative"
          _after={{
            content: '""',
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '400px',
            height: '2px',
            bg: '#2C7A7B',
          }}
        >
          Trello board
        </Heading>
      </Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box p={4} minH="100vh" bg="#616161" m="auto">
          <Flex
            gap={6}
            wrap={{ base: 'wrap', md: 'nowrap' }}
            justifyContent="space-around"
            alignItems="baseline"
          >
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
          </Flex>
        </Box>
      </DragDropContext>
    </Box>
  );
}

export default App;

// json-server --watch db.json
