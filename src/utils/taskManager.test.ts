import { addTask, editTask } from './taskManager';
import { BoardState } from '../types';

const mockBoard: BoardState = {
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'first-column',
      taskIds: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'second-column',
      taskIds: ['1'],
    },
  },
  tasks: {
    '1': {
      id: '1',
      content: 'lorem',
    },
  },
};

describe('Task manager functions', () => {
  describe('addTask', () => {
    it('should add new task on the right column', () => {
      const newContent = 'new content';
      const columnId = 'column-1';
      const updatedBoard = addTask(mockBoard, newContent, columnId);

      //   check that task have been added in column
      const newTaskId = Object.keys(updatedBoard.tasks).find(
        (id) => updatedBoard.tasks[id].content === newContent,
      );

      expect(newTaskId).toBeDefined();
      expect(updatedBoard.tasks[newTaskId!]).toEqual({
        id: newTaskId,
        content: newContent,
      });

      expect(updatedBoard.columns[columnId].taskIds).toContain(newTaskId);
      expect(updatedBoard.columns[columnId].taskIds).toHaveLength(1);
    });
  });

  describe('editTask', () => {
    it('should update the content of an existing task', () => {
      const taskId = '1';
      const updatedContent = 'new content';
      const updatedBoard = editTask(mockBoard, taskId, updatedContent);

      expect(updatedBoard.tasks[taskId].content).toBe(updatedContent);
      expect(updatedBoard.tasks[taskId].id).toBe(taskId);
    });

    it('should not modify other tasks', () => {
      const taskId = '1';
      const updatedContent = 'new content';
      const updatedBoard = editTask(mockBoard, taskId, updatedContent);

      expect(Object.keys(updatedBoard.tasks)).toHaveLength(1);
      expect(updatedBoard.tasks[taskId]).toBeDefined();
    });
  });
});
