import { addTask, editTask, deleteTask } from './taskManager';
import { BoardState } from '../types';

const mockBoard: BoardState = {
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'first-column',
      taskIds: ['3'],
    },
    'column-2': {
      id: 'column-2',
      title: 'second-column',
      taskIds: ['1', '2'],
    },
  },
  tasks: {
    '1': {
      id: '1',
      content: 'lorem',
    },
    '2': {
      id: '2',
      content: 'lorem21',
    },
    '3': {
      id: '3',
      content: 'lorem31',
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
      expect(updatedBoard.columns[columnId].taskIds).toHaveLength(2);
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

      expect(Object.keys(updatedBoard.tasks)).toHaveLength(3);
      expect(updatedBoard.tasks[taskId]).toBeDefined();
    });
  });

  describe('delete task', () => {
    it('should delete task from tasks and columns', () => {
      const taskId = '1';
      const updatedBoard = deleteTask(mockBoard, taskId);

      expect(updatedBoard.tasks).toBeDefined();
      expect(Object.keys(updatedBoard.tasks)).toHaveLength(2);
      expect(updatedBoard.columns['column-1'].taskIds).not.toContain(taskId);
      expect(updatedBoard.columns['column-2'].taskIds).toEqual(['2']);
    });
  });
});
