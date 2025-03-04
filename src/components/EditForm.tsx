import { EditFormProps } from '../types';
import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></input>
      <div className="button-edit-group">
        <button type="submit">save</button>
        <button type="button" onClick={onCancel}>
          x
        </button>
        <button type="button" onClick={handleDelete}>
          delete
        </button>
      </div>
    </form>
  );
};

export { EditForm };
