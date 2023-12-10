/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.task = [];
  }

  add(todo) {
    this.task.push(todo);
  }

  remove(index) {
    if (index < 0 || index >= this.task.length) {
      return this.getAll();
    }
    this.task.splice(index, 1);
  }

  update(index, todo) {
    if (index < 0 || index >= this.task.length) {
      return this.getAll();
    }

    const newArray = [...this.task];
    newArray[index] = todo;
    this.task = newArray;
    return this.task;
  }

  getAll() {
    return this.task;
  }

  get(index) {
    if (index < 0 || index >= this.task.length) {
      return null;
    }
    return this.task[index];
  }

  clear() {
    this.task = [];
    return this.task;
  }
}

const todo = new Todo();
todo.add("fuck"); 
todo.add("eat");
todo.add("sleep");
todo.add("repeat");
console.log(todo.getAll());
console.log(todo.update(1, "fuck"));
console.log(todo.clear());
module.exports = Todo;
