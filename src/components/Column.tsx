import { ColumnProps } from '../types';
import { Card } from './Card';
import { Droppable } from '@hello-pangea/dnd';

const Column: React.FC<ColumnProps> = ({ column, tasks }) => {
  //   console.log('column', column);
  return (
    <div className="column">
      <p>{column.title}</p>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="column-content"
          >
            {column.taskIds.map((taskId, index) => {
              // find the task in tasks objby matching its ID, then render Card if found
              const task = Object.values(tasks).find((el) => el.id == taskId);
              if (task) {
                return <Card key={task.id} task={task} index={index} />;
              }
              return null;
            })}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button type="button" className="column-button">
        + add task
      </button>
    </div>
  );
};

export { Column };
