/**
 * @jest-environment jsdom
 */

import * as main  from '../ts/main';
import * as functions from '../ts/functions';
import { Todo } from '../ts/models/Todo'

describe('creating new todo', () => {
  test('todo should be added', () => {
    // arrange
    document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
    let text: string = 'Random string';
    let todos: Todo[] = [];
    
    // act
    main.createNewTodo(text, todos);
  
    // assert
    let ul = document.body.innerHTML;
    expect(ul).toBe(`<ul id="todos" class="todo"><li class=\"todo__text\">Random string</li></ul>`);
  });

  test('todo should not be added and error should be thrown', () => {
    // arrange
    document.body.innerHTML = `<div id="error" class="error"></div>`;
    let textIsTooShort: string = 'F';
    let todos: Todo[] = [];
    let spyOnCreateHtml = jest.spyOn(main, 'createHtml');

    // act
    main.createNewTodo(textIsTooShort, todos);

    // assert
    expect(spyOnCreateHtml).toBeCalledTimes(0);
    let errorMessage = document.body.innerHTML;
    expect(errorMessage).toEqual(`<div id="error" class="error show">Du måste ange minst tre bokstäver</div>`);
  });
});

describe('clearing all todos', () => {
  test('should clear all todos', () => {
    // arrange
    let emptyUl = '<ul id="todos" class="todo"></ul>';
    document.body.innerHTML = `<ul id="todos" class="todo"><li class=\"todo__text\">Vakna</li><li class=\"todo__text\">Drick vatten</li><li class=\"todo__text\">Borsta tänderna</li></ul>`;
    let todos: Todo[] = [
      new Todo('Vakna', false), 
      new Todo('Drick vatten', false), 
      new Todo('Borsta tänderna', false)
  ];
  
    let spyOnRemoveAllTodos = jest.spyOn(functions, 'removeAllTodos');
    let spyOnCreateHtml = jest.spyOn(main, 'createHtml');
  
  
    // act
    main.clearTodos(todos);
  
    // assert
    let ulAfter = document.body.innerHTML;
    expect(spyOnRemoveAllTodos).toHaveBeenCalled();
    expect(spyOnCreateHtml).toHaveBeenCalled();
    expect(todos).toEqual([]);
    expect(ulAfter).toEqual(emptyUl);
  });
});
