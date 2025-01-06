const listEl = document.getElementById("list");
const create_btn_el = document.getElementById("create");
const themeToggleBtn = document.getElementById("theme-toggle");

let todos = [];

create_btn_el.addEventListener("click", CreateNewTodo);
themeToggleBtn.addEventListener("click", toggleTheme);

function CreateNewTodo() {
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false
    };

    todos.unshift(item);

    const { itemEl, inputEl } = createTodoElement(item);

    listEl.prepend(itemEl);

    inputEl.removeAttribute("disabled");
    inputEl.focus();

    save();
}

function createTodoElement(item) {
    const itemEl = document.createElement('div');
    itemEl.classList.add("item");

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
    edit_btn_el.innerHTML = "<i class='fa fa-pen'></i>";

    const remove_btn_el = document.createElement("button");
    remove_btn_el.classList.add("FA-icons", "remove-btn");
    remove_btn_el.innerHTML = "<i class='fa fa-circle-minus'></i>";

    actionsEl.append(edit_btn_el);
    actionsEl.append(remove_btn_el);

    itemEl.append(checkbox);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);

    // Event Listeners
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
    });

    return { itemEl, inputEl, edit_btn_el, remove_btn_el };
}

function DisplayTodos() {
    load();

    const fragment = document.createDocumentFragment();

    todos.forEach(item => {
        const { itemEl } = createTodoElement(item);
        fragment.appendChild(itemEl);
    });

    listEl.appendChild(fragment);
}

DisplayTodos();

function save() {
    try {
        const save = JSON.stringify(todos);
        localStorage.setItem("my_todos", save);
    } catch (error) {
        console.error("Error saving to localStorage", error);
    }
}

function load() {
    try {
        const data = localStorage.getItem("my_todos");
        if (data) {
            todos = JSON.parse(data);
        }
    } catch (error) {
        console.error("Error loading from localStorage", error);
    }
}

function toggleTheme() {
    document.body.classList.toggle("dark-theme");
}

// CSS for responsiveness and themes
const style = document.createElement('style');
style.innerHTML = `
    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }
    .actions {
        display: flex;
        gap: 10px;
    }
    .dark-theme {
        background-color: #333;
        color: #fff;
    }
    .dark-theme .item {
        border-bottom: 1px solid #555;
    }
    @media (max-width: 600px) {
        .item {
            flex-direction: column;
            align-items: flex-start;
        }
        .actions {
            margin-top: 10px;
        }
    }
`;
document.head.appendChild(style);