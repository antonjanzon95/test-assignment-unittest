import { addTodo, removeAllTodos, changeTodo } from '../ts/functions';
import { Todo } from '../ts/models/Todo'

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