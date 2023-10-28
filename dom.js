const listEl = document.getElementById("list");
const create_btn_el = document.getElementById("create"); 

let todos = [];

create_btn_el.addEventListener("click", CreateNewTodo);

function CreateNewTodo () {
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false
    }

    todos.unshift(item);

    const { itemEl, inputEl } = createTodoElement(item);

    listEl.prepend(itemEl);

    inputEl.removeAttribute("disabled");
    inputEl.focus();

    save();
}

function createTodoElement(item) {
    const itemEl = document.createElement('div');
    itemEl.classList.add("item")

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.complete;

    if (item.complete) {
        itemEl.classList.add("complete");
    }

    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.value = item.text;
    inputEl.setAttribute("disabled", "");

    const actionsEl = document.createElement("div");
    actionsEl.classList.add("actions");

    const edit_btn_el = document.createElement("button");
    edit_btn_el.classList.add("FA-icons", "edit-btn");
    edit_btn_el.innerHTML = "<i class='fa fa-pen'></i>"
    
    const remove_btn_el = document.createElement("button");
    edit_btn_el.classList.add("FA-icons", "remove-btn");
    remove_btn_el.innerHTML = "<i class='fa fa-circle-minus'></i>";

    actionsEl.append(edit_btn_el);
    actionsEl.append(remove_btn_el);
    
    itemEl.append(checkbox);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);

    // MY EVENTS
    checkbox.addEventListener("change", () => {
        item.complete = checkbox.checked;

        if (item.complete) {
            itemEl.classList.add("complete");
        } else {
            itemEl.classList.remove("complete");
        }

        save();
    });

    inputEl.addEventListener('input', () => {
        item.text = inputEl.value;
    });

    inputEl.addEventListener("blur", () => {
        inputEl.setAttribute("disabled", "");
        save();
    });

    edit_btn_el.addEventListener("click", () => {
        inputEl.removeAttribute("disabled");
        inputEl.focus();
    });

    remove_btn_el.addEventListener("click", () => {
        todos = todos.filter(t => t.id != item.id);

        itemEl.remove();

        save();
    })

    return {itemEl, inputEl, edit_btn_el, remove_btn_el };
}

function DisplayTodos(){
    load ();

    for (let i = 0; i < todos.length; i++) {
        const item = todos[i];

        const { itemEl } = createTodoElement(item);

        listEl.append(itemEl);
    }
}

DisplayTodos();

function save() {
    const save = JSON.stringify(todos);

    localStorage.setItem("my_todos", save);
}

function load() {
    const data = localStorage.getItem("my_todos");
    if (data) {
        todos = JSON.parse(data);
    }
}