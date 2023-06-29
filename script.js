document.addEventListener('DOMContentLoaded', function() {
    var todos = [];
  
    var newTodoInput = document.getElementById('newTodo');
    var addBtn = document.getElementById('addBtn');
    var todoList = document.getElementById('todoList');
  
    addBtn.addEventListener('click', addTodo);
  
    function addTodo() {
      var newTodo = newTodoInput.value.trim();
      if (newTodo !== '') {
        var todoItem = {
          id: Date.now(),
          title: newTodo,
          completed: false,
          priority: 0,
        };
        todos.push(todoItem);
        renderTodos();
        newTodoInput.value = '';
      }
    }
  
    function toggleComplete(id) {
      todos = todos.map(function(todo) {
        if (todo.id === id) {
          return Object.assign({}, todo, { completed: !todo.completed });
        }
        return todo;
      });
      renderTodos();
    }
  
    function setPriority(id, priority) {
      todos = todos.map(function(todo) {
        if (todo.id === id) {
          return Object.assign({}, todo, { priority: parseInt(priority) });
        }
        return todo;
      });
      renderTodos();
    }
  
    function renderTodos() {
      todoList.innerHTML = '';
      todos.forEach(function(todo) {
        var listItem = document.createElement('li');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', function() {
          toggleComplete(todo.id);
        });
  
        var todoText = document.createTextNode(todo.title);
  
        var select = document.createElement('select');
        select.value = todo.priority;
        select.addEventListener('change', function() {
          setPriority(todo.id, select.value);
        });
  
        var option1 = document.createElement('option');
        option1.value = 0;
        option1.text = '일반';
        var option2 = document.createElement('option');
        option2.value = 1;
        option2.text = '중요';
        var option3 = document.createElement('option');
        option3.value = 2;
        option3.text = '매우 중요';
  
        select.appendChild(option1);
        select.appendChild(option2);
        select.appendChild(option3);
  
        listItem.appendChild(checkbox);
        listItem.appendChild(todoText);
        listItem.appendChild(select);
        todoList.appendChild(listItem);
      });
    }
  });
  