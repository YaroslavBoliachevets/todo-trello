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

    handleAddTask(taskContent, columnId);
    setTaskContent('');
    inputSwaper();
  }

  return (
    <div>
      <form action="">
        <label htmlFor="">
          {' '}
          enter your task
          <input
            type="text"
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>
          add task
        </button>
        <button type="button" onClick={inputSwaper}>
          x
        </button>
      </form>
    </div>
  );
};

export { TaskInput };
