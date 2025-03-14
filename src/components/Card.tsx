import { TaskProps } from '../types';
import { Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import { EditForm } from './EditForm';
import { Box, Text, Button, Stack } from '@chakra-ui/react';

const Card: React.FC<TaskProps> = ({
  task,
  index,
  onEditTask,
  onDeleteTask,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleSave(newContent: string) {
    if (onEditTask) {
      onEditTask(task.id, newContent);
    }
    setIsEditing(false);
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // className="card"
          bg="white"
          p={2}
          rounded="md"
          shadow="md"
          mb={2}
        >
          {!isEditing ? (
            <Stack direction="row">
              <Text fontSize="sm" color="grey.700">
                {task.content}
              </Text>
              <Button
                // type="button"
                size="xs"
                colorScheme="blue"
                color="#363636"
                ml={'auto'}
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                edit
              </Button>
            </Stack>
          ) : (
            <EditForm
              onCancel={() => setIsEditing(false)}
              onSave={handleSave}
              taskId={task.id}
              initialContent={task.content}
              onDeleteTask={onDeleteTask}
            />
          )}

          {/* <div className="card-button">
            
          </div> */}
        </Box>
      )}
    </Draggable>
  );
};

export { Card };
