import { EditFormProps } from '../types';
import React, { useState } from 'react';

import { Input, Button, HStack, Box } from '@chakra-ui/react';

const EditForm: React.FC<EditFormProps> = ({
  taskId,
  initialContent,
  onSave,
  onCancel,
  onDeleteTask,
}) => {
  const [content, setContent] = useState(initialContent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() !== initialContent) {
      onSave(content);
    }
    onCancel();
  };

  const handleDelete = () => {
    if (onDeleteTask) onDeleteTask(taskId);
    onCancel();
  };

  return (
    <Box as="form" onSubmit={handleSubmit} mt={2}>
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        bg="#FFFFFF"
        color="#1A202C"
        border="1px solid"
        borderColor="#E2E8F0"
        rounded="md"
        p={2}
        _focus={{ borderColor: '#2C7A7B', boxShadow: '0 0 0 1px #2C7A7B' }}
        _hover={{ borderColor: '#CBD5E0' }}
        transition="all 0.2s"
      />
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
        >
          Save
        </Button>
        <Button
          type="button"
          bg="#4A5568"
          color="#FFFFFF"
          size="sm"
          fontWeight="medium"
          _hover={{ bg: '#718096' }}
          _active={{ bg: '#2D3748' }}
          _focus={{ outline: 'none', boxShadow: 'none' }}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          type="button"
          bg="#E53E3E"
          color="#FFFFFF"
          size="sm"
          fontWeight="medium"
          w="32px"
          h="32px"
          rounded="md"
          _hover={{ bg: '#F56565' }}
          _active={{ bg: '#C53030' }}
          _focus={{ outline: 'none', boxShadow: 'none' }}
          onClick={onCancel}
        >
          x
        </Button>
      </HStack>
    </Box>
  );
};

export { EditForm };
