showList();

let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", () => {
  let addTxt = document.getElementById("Area");
  if (addTxt.value != "") {
    let todoList = localStorage.getItem("List");
    if (todoList == null) {
      todoListObject = [];
    } else {
      todoListObject = JSON.parse(todoList);
    }
    todoListObject.push(addTxt.value);
    localStorage.setItem("List", JSON.stringify(todoListObject));
    addTxt.value = "";
    showList();
  }
});

function showList() {
  let todoList = localStorage.getItem("List");
  if (todoList == null) {
    todoListObject = [];
  } else {
    todoListObject = JSON.parse(todoList);
  }
  let HTML = "";

  todoListObject.forEach((element, index) => {
    HTML += `
        <div class="note marg" id="${index}">
            <h3 class="padd-left">${element}</h3>
            <div class="icons" id="icons">
                <ion-icon id='important' class="important-icon padd-right" name="star-outline" onclick="important(${index})"></ion-icon>
                <ion-icon id='done' class="done-icon padd-right" name="checkmark-done-outline" onclick="done(${index})"></ion-icon>
                <ion-icon id='delet' class="close-icon padd-right" name="close-outline" onclick="delet(${index})"></ion-icon>
            </div>
        </div>
        `;
  });
  let list = document.getElementById("List");
  if (todoListObject.length != 0) {
    list.innerHTML = HTML;
  } else {
    list.innerHTML = `<h4>Added Task Showen Here</h4>`;
  }
}

function delet(id) {
  let todoList = localStorage.getItem("List");
  if (todoList == null) {
    todoListObject = [];
  } else {
    todoListObject = JSON.parse(todoList);
  }

  todoListObject.splice(id, 1);
  localStorage.setItem("List", JSON.stringify(todoListObject));
  showList();
}

function important(id) {
  let ele = document.getElementById(id);
  ele.style.background = '#DA1212';
  ele.style.color = '#EEEEEE';
}

function done(id) {
    let ele = document.getElementById(id);
    ele.style.background = '#74ff3b';
    ele.style.color = '#11468F';
}

let search = document.getElementById("searchBox");

search.addEventListener("input", () => {
  let inputVal = search.value;
  let tasks = document.getElementsByClassName("note");
  Array.from(tasks).forEach((element) => {
    let task = element.getElementsByTagName("h3")[0].innerText;

    if (task.includes(inputVal)) {
      element.style.display = "flex";
    } else {
      element.style.display = "none";
    }
  });
});

let clear = document.getElementById('clear');

clear.addEventListener('click', ()=>{
    localStorage.clear();
    showList();
})