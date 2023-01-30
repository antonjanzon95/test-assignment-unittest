/**
 * @jest-environment jsdom
 */

import { addTodo, removeAllTodos, changeTodo, sortTodos } from '../ts/functions';
import { Todo } from '../ts/models/Todo'

beforeEach(() => {
  document.body.innerHTML = '';
  localStorage.clear();
  jest.restoreAllMocks();
});

describe('adding new todo', () => {
  test('should add new todo', () => {
    // arrange
    let todoText: string = 'Enough characters';
    let todos: Todo[] = [];
  
    // act
    const result = addTodo(todoText, todos);
  
    // assert
    expect(result.success).toBeTruthy();
    expect(result.error).toBe('');
    expect(todos[0].text).toContain(todoText);
  });
  
  test('should not add new todo', () => {
    // arrange
    let todoText: string = 'F';
    let todos: Todo[] = [];
  
    // act
    const result = addTodo(todoText, todos);
  
    // assert
    expect(result.success).toBeFalsy();
    expect(result.error).toBe('Du måste ange minst tre bokstäver');
  });
});

describe('changing todo', () => {
  test('should change todo', () => {
    // arrange
    let todo: Todo = new Todo('Vakna', false);

    // act
    changeTodo(todo);

    // assert
    expect(todo.done).toBe(true);
  });
});

describe('removing all todos', () => {
  test('should remove all todos', () => {
    // arrange
    let todos: Todo[] = [
      new Todo('Vakna', true), 
      new Todo('Drick vatten', true), 
      new Todo('Borsta tänderna', false)
    ];

    // act
    removeAllTodos(todos);

    // assert
    expect(todos.length).toBe(0);
    expect(todos).toEqual([]);
  });
});

describe('sorting list of todos', () => {
  test('sorting should work', () => {
    // assign
    let todos: Todo[] = [
      new Todo('Vakna', false), 
      new Todo('Drick vatten', true), 
      new Todo('Borsta tänderna', false),
      new Todo('Äta frukost', true)
    ];

    // act
    sortTodos(todos);

    // assert
    // expecting all todos that are done to be placed at the end of the array
    expect(todos[0].done).toBeFalsy();
    expect(todos[1].done).toBeFalsy();
    expect(todos[2].done).toBeTruthy();
    expect(todos[3].done).toBeTruthy();
  });
});