/**
 * @jest-environment jsdom
 */

import * as main  from '../ts/main';
import * as functions from '../ts/functions';
import { Todo } from '../ts/models/Todo';

beforeEach(() => {
  document.body.innerHTML = '';
  localStorage.clear();
  jest.restoreAllMocks();
});

describe('event listeners should be added and called on event', () => {
  test('should toggle todos on click', () => {
    // assign
    document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
    let todos: Todo[] = [new Todo('Programmera', false)];
    
    main.createHtml(todos);

    // act
    document.querySelector('li')?.click();

    // assert
    expect(todos[0].done).toBe(true);  
  });

  test('should call clearTodos-function on click', () => {
    // assign
    document.body.innerHTML = `<button type="button" id="clearTodos">Rensa lista</button>`;

    let spyOnClearTodos = jest.spyOn(main, 'clearTodos').mockReturnValue();

    main.testButtonClick();

    // act
    (document.querySelector('#clearTodos') as HTMLButtonElement)?.click();

    // assert
    expect(spyOnClearTodos).toHaveBeenCalled();
  
    spyOnClearTodos.mockReset();
  });
});

describe('creating html', () => {
  test('should create html', () => {
    // assign
    document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
    let todos: Todo[] = [
      new Todo('Vakna', true),
      new Todo('Drick vatten', false), 
      new Todo('Borsta tänderna', false)
    ];

    // act
    main.createHtml(todos);

    // assert
    expect(document.body.innerHTML).toBe(
      `<ul id="todos" class="todo">` +
      `<li class="todo__text--done todo__text">${todos[0].text}</li>` +
      `<li class="todo__text">${todos[1].text}</li>` +
      `<li class="todo__text">${todos[2].text}</li>` +
      `</ul>`
    );
  });
});

describe('creating new todo', () => {
  test('todo should be added', () => {
    // arrange
    let text: string = 'Random string';
    let todos: Todo[] = [];
    let spyOnCreateHtml = jest.spyOn(main, 'createHtml').mockReturnValue();
    
    // act
    main.createNewTodo(text, todos);
  
    // assert
    expect(spyOnCreateHtml).toHaveBeenCalled();
    expect(todos.length).toBe(1);

    spyOnCreateHtml.mockReset();
    });

  test('todo should not be added and error msg should be presented', () => {
    // arrange
    document.body.innerHTML = `<div id="error" class="error"></div>`;
    let textIsTooShort: string = 'F';
    let todos: Todo[] = [];
    let spyOnCreateHtml = jest.spyOn(main, 'createHtml').mockReturnValue();

    // act
    main.createNewTodo(textIsTooShort, todos);

    // assert
    let errorMessage = document.body.innerHTML;
    expect(spyOnCreateHtml).toBeCalledTimes(0);
    expect(errorMessage).toEqual(`<div id="error" class="error show">Du måste ange minst tre bokstäver</div>`);
    
    spyOnCreateHtml.mockReset();
  });
});

describe('clearing all todos', () => {
  test('should clear all todos', () => {
    // arrange
    let todos: Todo[] = [
      new Todo('Vakna', false), 
      new Todo('Drick vatten', false), 
      new Todo('Borsta tänderna', false)
    ];
    
    let spyOnRemoveAllTodos = jest.spyOn(functions, 'removeAllTodos').mockReturnValue();
    let spyOnCreateHtml = jest.spyOn(main, 'createHtml').mockReturnValue();
  
    // act
    main.clearTodos(todos);
  
    // assert
    expect(spyOnRemoveAllTodos).toHaveBeenCalled();
    expect(spyOnCreateHtml).toHaveBeenCalled();

    spyOnRemoveAllTodos.mockReset();
    spyOnCreateHtml.mockReset();
  });
});

describe('displaying error', () => {
  test('should display error message', () => {
    // arrange
    document.body.innerHTML = `<div id="error" class="error"></div>`;
    let errorMsg: string = 'Du har framkallat ett fel.';

    // act
    main.displayError(errorMsg, true);

    // assert
    expect(document.body.innerHTML).toBe(`<div id="error" class="error show">${errorMsg}</div>`);
  });

  test('should not display error message', () => {
    // arrange
    document.body.innerHTML = `<div id="error" class="error"></div>`;
    let errorMsg: string = 'Du har inte framkallat ett fel.';

    // act
    main.displayError(errorMsg, false);

    // assert
    expect(document.body.innerHTML).toBe(`<div id="error" class="error">${errorMsg}</div>`);
  });
});

describe('toggling todos', () => {
  test('should toggle todos', () => {
    // arrange
    let todo: Todo = new Todo('Träna', false);
    let spyOnChangeTodo = jest.spyOn(functions, 'changeTodo').mockReturnValue();
    let spyOnCreateHtml = jest.spyOn(main, 'createHtml').mockReturnValue();
    
    // act
    main.toggleTodo(todo);

    // assert
    expect(spyOnChangeTodo).toHaveBeenCalled();
    expect(spyOnCreateHtml).toHaveBeenCalled();

    spyOnChangeTodo.mockReset();
    spyOnCreateHtml.mockReset();
  });
});

