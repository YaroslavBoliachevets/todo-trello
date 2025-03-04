import { TaskProps } from '../types';
import { Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import { EditForm } from './EditForm';

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
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="card"
        >
          {!isEditing ? (
            <>
              <p>{task.content}</p>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                edit
              </button>
            </>
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
        </div>
      )}
    </Draggable>
  );
};

export { Card };
