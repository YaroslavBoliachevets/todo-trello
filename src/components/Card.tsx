import { TaskProps } from '../types';
import { Draggable } from '@hello-pangea/dnd';

const Card: React.FC<TaskProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="card"
        >
          <p>{task.content}</p>
        </div>
      )}
    </Draggable>
  );
};

export { Card };
