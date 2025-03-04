import { ColumnProps } from '../types';
import { Card } from './Card';
import { TaskInput } from './TaskInput';

import { Droppable } from '@hello-pangea/dnd';
import React, { useState } from 'react';

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
          </div>
        )}
      </Droppable>

      {!isFormOpen ? (
        <button
          type="button"
          className="column-button"
          onClick={() => setIsFormOpen(true)}
        >
          + add task
        </button>
      ) : (
        <TaskInput
          inputSwaper={newTaskClick}
          handleAddTask={(content) =>
            handleAddTask && handleAddTask(content, column.id)
          }
          columnId={column.id}
        />
      )}
    </div>
  );
};

export { Column };
