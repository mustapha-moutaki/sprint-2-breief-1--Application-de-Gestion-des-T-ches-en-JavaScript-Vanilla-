

// //parsley validation code
// /*
// $(function() { 
//     $('#form').parsley(); //verifiy if the form is valid
//     cleanForm();

//     $('#form').on('submit', function(e) {
//         e.preventDefault(); // 
        
//         if ($(this).parsley().isValid()) {
//             alert('done with success'); // if thi form is valid with paresley  validation

//         }
//     });
// });
// */

let countId = localStorage.length;
createCards();

// Event listeners for form visibility
document.getElementById("form").style.display = "none";

// Add Task button functionality
document.getElementById("addTask").addEventListener("click", function () {
    document.getElementById("form").style.display = "block";
    document.getElementById("app").style.filter = "blur(7px)";
    document.getElementById("task-save-btn").style.display = "block";
    document.getElementById("task-update-btn").style.display = "none";
    cleanForm();
});

// Cancel button functionality
document.getElementById("inputGroup-sizing-sm").addEventListener("click", closeForm);

// X-mark button functionality
document.getElementById("x-mark").addEventListener("click", closeForm);

function closeForm() {
    document.getElementById("form").style.display = "none";
    document.getElementById("app").style.filter = "none";
    cleanForm();
}

// submit ..save  button functionality
document.getElementById("task-save-btn").addEventListener("click", function () {
    addTask();
    closeForm();
});

//Function to add a new task
function addTask() {
    let task = {
        title: document.getElementById("inputTitle").value,
        optionFeatureBug: document.querySelector('input[name="flexRadioDefault"]:checked').value,
        optionPripority: document.getElementById("selected-option-pri").value,
        optionStatus: document.getElementById("selected-option-stu").value,
        description: document.getElementById("description").value,
        date: document.getElementById("dateInput").value,
        createdAt: new Date().toISOString()
    };

    localStorage.setItem(`task_${countId}`, JSON.stringify(task));
    countId++;
    createCards();
    cleanForm();
}

// Function to create task cards
function createCards() {
    const allItemsArray = getAllLocalStorageItemsAsArray();
    const containerToDo = document.getElementById('to-do-tasks');
    const containerDoing = document.getElementById('in-progress-tasks');
    const containerDone = document.getElementById('done-tasks');

    containerToDo.innerHTML = "";
    containerDoing.innerHTML = "";
    containerDone.innerHTML = "";

    allItemsArray.forEach((item) => {
        const task = item.value;
        let taskHTML = `
            <button class="text-start p-2 d-flex">
                <div>
                    <i class="fas ${task.optionStatus === "1" ? 'fa-question-circle' : task.optionStatus === "2" ? 'fa-spinner fa-spin' : 'fa-check-circle'} text-success fs-1 me-2"></i>
                </div>
                <div>
                    <div class="fs-3 mb-1 title-box">${task.title}</div>
                    <div class="date-box">Created on: ${task.date}</div>
                    <div class="mb-2 task-box">${task.description}</div>
                    <div>
                        <span class="btn btn-primary">${task.optionFeatureBug}</span>
                        <span class="btn btn-outline-secondary">${task.optionStatus === "1" ? 'High' : task.optionStatus === "2" ? 'Medium' : 'Low'}</span>
                        <a class="btn btn-danger" onclick="deleteData('${item.key}')">Delete</a>
                        <a class="btn btn-warning" onclick="editTask('${item.key}')">Update</a>
                    </div>
                </div>
            </button>
        `;
        if (task.optionStatus === "1") containerToDo.innerHTML += taskHTML;
        else if (task.optionStatus === "2") containerDoing.innerHTML += taskHTML;
        else containerDone.innerHTML += taskHTML;
    });
}

// Function to get all tasks from localStorage as an array
function getAllLocalStorageItemsAsArray() {
    const itemsArray = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        try {
            const parsedValue = JSON.parse(value);
            itemsArray.push({ key: key, value: parsedValue });
        } catch (e) {
            console.error("Error parsing JSON:", e);
        }
    }
    return itemsArray;
}

// Function to clear form
function cleanForm() {
    document.getElementById("inputTitle").value = '';
    document.querySelector('input[name="flexRadioDefault"]:checked').checked = false;
    document.getElementById("selected-option-pri").value = '';
    document.getElementById("selected-option-stu").value = '';
    document.getElementById("dateInput").value = '';
    document.getElementById("description").value = '';
}

// Edit task function
function editTask(key) {
    const taskData = JSON.parse(localStorage.getItem(key));
    if (taskData) {
        document.getElementById('form').style.display = 'block';
        document.getElementById("app").style.filter = "blur(7px)";
        
        // Populate form fields
        document.getElementById("inputTitle").value = taskData.title;
        document.getElementById("description").value = taskData.description;
        document.getElementById("dateInput").value = taskData.date;
        document.getElementById("selected-option-stu").value = taskData.optionStatus;
        document.getElementById("selected-option-pri").value = taskData.optionPripority;
        document.querySelector(`input[name="flexRadioDefault"][value="${taskData.optionFeatureBug}"]`).checked = true;

        // Show update button, hide save button
        document.getElementById("task-update-btn").style.display = "block";
        document.getElementById("task-save-btn").style.display = "none";

        // Save changes
        document.getElementById("task-update-btn").onclick = function () {
            updateTask(key);
        };
    }
}

// Update task function
function updateTask(key) {
    const updatedTask = {
        title: document.getElementById("inputTitle").value,
        description: document.getElementById("description").value,
        date: document.getElementById("dateInput").value,
        optionPripority: document.getElementById("selected-option-pri").value,
        optionStatus: document.getElementById("selected-option-stu").value,
        optionFeatureBug: document.querySelector('input[name="flexRadioDefault"]:checked').value,
        createdAt: new Date().toISOString()
    };
    localStorage.setItem(key, JSON.stringify(updatedTask));
    createCards();
    closeForm();
    alert("Task updated successfully");
}

// Delete task function
function deleteData(key) {
    if (confirm("Do you want to proceed?")) {
        localStorage.removeItem(key);
        createCards();
    }
}
