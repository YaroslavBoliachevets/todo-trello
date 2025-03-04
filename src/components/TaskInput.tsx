import React, { useState } from 'react';
import { TaskInputProps } from '../types';

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
    <div>
      <form action="" className="add-task-form">
        <label htmlFor="">
          {' '}
          <textarea
            className="task-textarea"
            // type="text"
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
            placeholder="Enter your task"
          />
        </label>
        <div className="button-group">
          <button type="submit" className="add-button" onClick={handleSubmit}>
            Add a card
          </button>
          <button type="button" className="close-button" onClick={inputSwaper}>
            x
          </button>
        </div>
      </form>
    </div>
  );
};

export { TaskInput };
