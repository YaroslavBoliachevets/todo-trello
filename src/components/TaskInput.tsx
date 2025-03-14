import React, { useState } from 'react';
import { TaskInputProps } from '../types';

import { Textarea, Button, HStack, Box } from '@chakra-ui/react';

const TaskInput: React.FC<TaskInputProps> = ({
  inputSwaper,
  handleAddTask,
  columnId,
}) => {
  const [taskContent, setTaskContent] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!taskContent.trim()) return;
    handleAddTask(taskContent, columnId);
    setTaskContent('');
    inputSwaper();
  }

  return (
    <Box as="form" onSubmit={handleSubmit} mt={4}>
      {/* <form action="" className="add-task-form"> */}
      {/* <Textarea htmlFor=""> */}
      {/* {' '} */}
      <Textarea
        // type="text"
        value={taskContent}
        onChange={(e) => setTaskContent(e.target.value)}
        placeholder="Enter your task"
        bg="#FFFFFF"
        color="#1A202C"
        border="1px solid"
        borderColor="#E2E8F0"
        rounded="md"
        p={3}
        minH="100px"
        _placeholder={{ color: '#A0AEC0' }}
        _focus={{ borderColor: '#2C7A7B', boxShadow: '0 0 0 1px #2C7A7B' }}
      />
      {/* </Textarea> */}
      <HStack mt={2}>
        <Button
          type="submit"
          bg="#2C7A7B"
          color="#FFFFFF"
          size="sm"
          fontWeight="medium"
          _hover={{ bg: '#4CB5B6' }}
          _active={{ bg: '#285E61' }}
          _focus={{ outline: 'none', boxShadow: 'none' }}
          onClick={handleSubmit}
        >
          Add a card
        </Button>
        <Button
          type="button"
          bg="#E53E3E"
          color="#FFFFFF"
          size="sm"
          fontWeight="medium"
          w="40px"
          h="32px"
          rounded="md"
          _hover={{ bg: '#F56565' }}
          _active={{ bg: '#C53030' }}
          _focus={{ outline: 'none', boxShadow: 'none' }}
          onClick={inputSwaper}
        >
          x
        </Button>
      </HStack>
      {/* </form> */}
    </Box>
  );
};

export { TaskInput };
