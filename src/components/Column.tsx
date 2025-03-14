import { ColumnProps } from '../types';
import { Card } from './Card';
import { TaskInput } from './TaskInput';

import { Droppable } from '@hello-pangea/dnd';
import React, { useState } from 'react';

import { Box, Button, VStack, Text } from '@chakra-ui/react';

const Column: React.FC<ColumnProps> = ({
  column,
  tasks,
  handleAddTask,
  onEditTask,
  onDeleteTask,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  function newTaskClick() {
    setIsFormOpen(!isFormOpen);
  }

  return (
    <Box
      w="300px"
      bgGradient="linear(to-b, #2D3748, #1A202C)"
      p={4}
      rounded="xl"
      shadow="md"
      border="1px solid"
      borderColor="#4A5568"
    >
      <Box
        as="h2"
        fontSize="lg"
        fontWeight="bold"
        color="#FFFFFF"
        mb={4}
        textTransform="uppercase"
        letterSpacing="wide"
      >
        {column.title}
      </Box>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <VStack
            ref={provided.innerRef}
            {...provided.droppableProps}
            align="stretch"
            p={2}
            rounded="md"
            border={column.taskIds.length === 0 ? '2px dashed' : 'none'}
            borderColor="#718096"
          >
            {column.taskIds.length === 0 && (
              <Text color="#A0AEC0" fontSize="sm" textAlign="center">
                No tasks yet
              </Text>
            )}

            {column.taskIds.map((taskId, index) => {
              // find the task in tasks objby matching its ID, then render Card if found
              const task = Object.values(tasks).find((el) => el.id == taskId);
              if (task) {
                return (
                  <Card
                    key={task.id}
                    task={task}
                    index={index}
                    onEditTask={onEditTask}
                    onDeleteTask={onDeleteTask}
                  />
                );
              }
              return null;
            })}

            {provided.placeholder}
          </VStack>
        )}
      </Droppable>

      {!isFormOpen ? (
        <Button
          mt={4}
          w="full"
          // colorScheme="blue"
          bg="#2C7A7B"
          color="#FFFFFF"
          size="sm"
          fontWeight="medium"
          // color="#363636"
          _hover={{ bg: '#4CB5B6' }}
          _active={{ outline: 'none', bg: '#285E61' }}
          onClick={() => setIsFormOpen(true)}
        >
          + Add a card
        </Button>
      ) : (
        <TaskInput
          inputSwaper={newTaskClick}
          handleAddTask={(content) =>
            handleAddTask && handleAddTask(content, column.id)
          }
          columnId={column.id}
        />
      )}
    </Box>
  );
};

export { Column };
