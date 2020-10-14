document.addEventListener('DOMContentLoaded', function () {
  const state = getStoredStateOrDefault({ 
    counter: 0
  })

  const $incrButton = document.querySelector('.incr')
  const $decrButton = document.querySelector('.decr')

  const $gauge = document.querySelector('.gauge')
  setGaugePercent($gauge, state.counter)
  
  $incrButton.addEventListener('click', function() {
    state.counter = Math.min(state.counter + 10, 100)
    saveState(state)
    setGaugePercent($gauge, state.counter)
  })

  $decrButton.addEventListener('click', function() {
    state.counter = Math.max(state.counter - 10, 0)
    saveState(state)
    setGaugePercent($gauge, state.counter)
  })
})

/**/

let addMessage = document.querySelector('.message');
todo = document.querySelector('.todo');
// Массив с данными
let todoList = [];
//Если данные есть в localStorage,тогда преобразуем в массив и выводим на страницу
if(localStorage.getItem('todo'))
{
  todoList = JSON.parse(localStorage.getItem('todo'));
  displayMessages();
}
//Добавить данные
addMessage.addEventListener('keydown', function(e) {
  if (e.keyCode === 13)
  {
   if(!addMessage.value) return ;
    let newTodo = 
 {
  todo: addMessage.value,
  checked:false
 };
 todoList.unshift(newTodo);
 displayMessages();
 localStorage.setItem('todo', JSON.stringify(todoList));
 addMessage.value = '';
}
});
//Выводим данные на страницу
function displayMessages(){
  let displayMessage = '';
  if(todoList.length === 0) 
  todo.innerHTML = '';

  todoList.forEach(function(item, i) {
   displayMessage += `
    <li>
    <input type ='checkbox' id='item_${i}' ${item.checked ? 'checked':''}>
    <label for='item_${i}'>${item.todo}</label>
    </li>
     `;
  todo.innerHTML = displayMessage;
});
//Сохраняем нажание на чекбокс в localStorage
todo.addEventListener('change', function(Event){
  let idInput = Event.target.getAttribute('id');
  let forLabel = todo.querySelector('[for='+ idInput + ']');
  let valueLabel = forLabel.innerHTML;

todoList.forEach(function(item){
  if (item.todo === valueLabel){
  item.checked = !item.checked;
  localStorage.setItem('todo', JSON.stringify(todoList));
}
});

});
//delete
todo.addEventListener('contextmenu',function(e){
  e.preventDefault();
  todoList.forEach(function(item,i){
    if(item.todo === e.target.innerHTML){
      if(e.ctrlKey){
        todoList.splice(i,1);
      }
      displayMessages();
      localStorage.setItem('todo',JSON.stringify(todoList));
    }
});
});
}
