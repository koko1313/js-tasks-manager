// Денят е кратък работата никога не свършва, а вие сте млади и ентусиазирани студенти, които трябва да си разпределят времето адекватно. 
// Да се създаде приложение за обработка на задачи, тип TODO LIST.

// Task : #1 
// Списъка трябва да съдържа набор от три полета:
// Текстово поле, за въвеждане на заглавието на задачата : Да си напиша домашното
// Падащо меню, за задаване на приоритет : Нисък / Среден / Висок
// Бутон за съхранение на задачата

var tasks = [];
var archivedTasks = [];
var tasksList = document.querySelector("#tasksList");
var archiveTasksList = document.querySelector("#archiveTasksList");

var taskConstructor = function(title, priority) {
    var task = {
        title : title,
        priority : priority,
        isEnded : false,
        isSelected : false,
        isDeleted : false,
    }

    return task;
}

var save = function(title, priority) {
    var task = taskConstructor(title, priority);
    tasks.push(task);
    listTasks();
}

var saveButton = document.querySelector("#saveButton");
saveButton.addEventListener("click", function() {
    var title = document.querySelector("#taskTitle").value;
    var priority = document.querySelector("#prioritySelect").value;

    save(title, priority);
});

var editButton = document.querySelector("#editButton");
editButton.addEventListener("click", function() {
    var id = document.querySelector("#editId").value;
    var title = document.querySelector("#taskTitle").value;
    var priority = document.querySelector("#prioritySelect").value;

    saveEdited(id, title, priority);
});


var finalizeButton = document.querySelector("#finalizeSelectedTasks");
finalizeButton.addEventListener("click", function() {
    for(var i = 0; i<tasks.length; i++) {
        if(tasks[i].isSelected) {
            endTask(i);
            tasks[i].isSelected = false;
        }
    }

    listTasks();
});

var openButton = document.querySelector("#openSelectedTasks");
openButton.addEventListener("click", function() {
    for(var i = 0; i<tasks.length; i++) {
        if(tasks[i].isSelected) {
            openTask(i);
            tasks[i].isSelected = false;
        }
    }

    listTasks();
});


var deleteButton = document.querySelector("#deleteSelectedTasks");
deleteButton.addEventListener("click", function() {
    
    for(var i = 0; i<tasks.length; i++) {
        if(tasks[i].isSelected) {
            if(tasks[i].isEnded) {
                deleteTask(i);
                i=0;
            }

            tasks[i].isSelected = false;
        }
    }

    listTasks();
});


var archiveButton = document.querySelector("#archiveSelectedTasks");
archiveButton.addEventListener("click", function() {
    for(var i = 0; i<tasks.length; i++) {
        if(tasks[i].isSelected) {
            tasks[i].isSelected = false;
            archiveTask(i);
            i=0;
        }
    }

    listTasks();
});



// Task : #2
// Запазената задача се листва в рамките на списъка, като се визуализира нейното име и приоритета и. Всички задачи се сортират по приоритет.
var listTasks = function() {

    tasks.sort(function(a, b){
        return a.priority - b.priority;
    });

    tasksList.innerHTML = "";
    for(var i = 0; i < tasks.length; i++) {
        var li = document.createElement("li");
            li.setAttribute("taskId", i);
        var text = document.createTextNode(tasks[i].title + "(" + tasks[i].priority + ")" + " - " + tasks[i].isEnded);

        li.addEventListener("click", function() {
            selectOrDeselectTask(this);
        });

        li.addEventListener("contextmenu", function(e) {
            e.preventDefault();
            editTask(this);
        });

        li.appendChild(text);
        tasksList.appendChild(li);
    }
}

var listArchivedTasks = function() {
    archiveTasksList.innerHTML = "";
    for(var i = 0; i < archivedTasks.length; i++) {
        var li = document.createElement("li");
            li.setAttribute("taskId", i);
        var text = document.createTextNode(archivedTasks[i].title + "(" + archivedTasks[i].priority + ")" + " - " + archivedTasks[i].isEnded);

        li.addEventListener("click", function() {
            selectOrDeselectTask(this);
        });

        li.appendChild(text);
        archiveTasksList.appendChild(li);
    }
}


// Task : #3
// Задачата трябва да може да се селектира. Селектираните задачи биват визуализирани по начин, различен от не селектираните такива. Например, оцветяват се различно, получават специфична цветова рамка или се позиционират на различно място спрямо останалите елементи.
var selectOrDeselectTask = function(li) {
    var id = li.getAttribute("taskId");
    if(tasks[id].isSelected) {
        deselectTask(li);
    } else {
        selectTask(li);
    }
}

var selectTask = function(li) {
    var id = li.getAttribute("taskId");
    tasks[id].isSelected = true;
    li.style.background = "yellow";
}

var deselectTask = function(li) {
    var id = li.getAttribute("taskId");
    tasks[id].isSelected = false;
    li.style.background = "";
}

// Task : #4
// Системата разпознава два статуса за задачите в нея.
// * Една задача е в състояние отворена в момента в който е създадена, 
// * Една задача е в състояние финализирана, когато статуса и бъде сменен ръчно от потребителя.

// Task : #5
// Селектираната задача трябва да може да бъде финализирана, Финализираната задача се визуализира, с черта която пресича цялото заглавие на задачата.
var endTask = function(id) {
    // var id = li.getAttribute("taskId");
    // tasks[id].isEnded = true;
    // li.style.border = "1px dashed grey";
    tasks[id].isEnded = true;
}

// Task : #6
// Селектирана, финализирана задача трябва да може да бъде отваряна отново. 
var openTask = function(id) {
    tasks[id].isEnded = false;
}

// Task : #7
// Селектираната задача трябва да може да бъде изтривана. Изтритата задача, се премахва от списъка.
var deleteTask = function(id) {
    tasks.splice(id, 1);
}


// Task : #8
// Селектирана задача трябва да може да бъде архивирана, архивираните задачи се визуализират в списък, наречен архив
var archiveTask = function(id) {
    var task = tasks[id];
    deleteTask(id);
    archivedTasks.push(task);
    listTasks();
    listArchivedTasks();
}

// Task : #9
// Селектирана задача трябва да може да бъде редактирана. Редактираната задача, се визуализира в специфична контрола в рамките на нейната позиция. Една задача може да получи ново заглавие, както и да смени настоящият си приоритет.
var editTask = function(li) {
    var id = li.getAttribute("taskId");
    var titleInput = document.querySelector("#taskTitle");
    var priorityInput = document.querySelector("#prioritySelect");
    var editIdInput = document.querySelector("#editId");

    editIdInput.value = id;
    titleInput.value = tasks[id].title;
    priorityInput.value = tasks[id].priority;
}

var saveEdited = function(id, title, priority) {
    tasks[id].title = title;
    tasks[id].priority = priority;

    listTasks();
    listArchivedTasks();
}