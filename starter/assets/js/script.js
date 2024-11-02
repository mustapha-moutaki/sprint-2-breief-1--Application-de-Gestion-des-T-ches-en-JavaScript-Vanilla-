

///--------------------le debut-----------------------------------------///

function editTask(key) {
  const taskData = JSON.parse(localStorage.getItem(key));
  if (taskData) {
      // Populate form fields with task data
      document.getElementById("inputTitle").value = taskData.title;
      document.getElementById("description").value = taskData.description;
      document.getElementById("dateInput").value = taskData.date;
      document.querySelector(`input[name="flexRadioDefault"][value="${taskData.radioValue1}"]`).checked = true;

      // Show the "Save Changes" button and store the key for updating
      document.getElementById("task-update-btn").style.display = "block";
      document.getElementById("task-save-btn").style.display = "none";

      // Attach the save function to the "Save Changes" button
      document.getElementById("task-update-btn").onclick = function () {
          saveUpdatedTask(key);
          cleanForm()
      };
  }
}


function updateTask(key) {
  const updatedTask = {
      title: document.getElementById("inputTitle").value,
      description: document.getElementById("description").value,
      date: document.getElementById("dateInput").value,
      radioValue1: document.querySelector('input[name="flexRadioDefault"]:checked').value,
  };

  localStorage.setItem(key, JSON.stringify(updatedTask));
  createCards();

  // Reset form and buttons
  cleanForm();
  document.getElementById("task-update-btn").style.display = "none";
  document.getElementById("task-save-btn").style.display = "block";
  alert("Task updated successfully");
}

let countId = 0;

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

// Function to create cards
function createCards() {
    const allItemsArray = getAllLocalStorageItemsAsArray();
    let html = "";

    const containerToDo = document.getElementById('to-do-tasks');
    const containerDoing = document.getElementById('in-progress-tasks');
    const containerDone = document.getElementById('done-tasks');

    // Clear each container 
    containerToDo.innerHTML = "";
    containerDoing.innerHTML = "";
    containerDone.innerHTML = "";

    // Loop in all tasks and make theme in thir card task
    allItemsArray.forEach((item) => {
        const task = item.value;
        const taskHTML = `
            <button class="text-start p-2 d-flex">
                <div class="">
                    <i class="fas ${task.optionStatus === "1" ? 'fa-question-circle' : task.optionStatus === "2" ? 'fa-spinner fa-spin' : 'fa-check-circle'} text-success fs-1 me-2"></i>
                </div>
                <div>
                    <div class="fs-3 mb-1 title-box">${task.title}</div>
                    <div class="date-box">Created on: ${task.date}</div>
                    <div class="mb-2 task-box">${task.description}</div>
                    <div>
                        <span class="btn btn-primary">${task.optionFeatureBug}</span>
                        <span class="btn btn-outline-secondary">Feature</span>
                        
                        
                        
                        </span>
                        

                    </div>
                </div>
            </button>
        `;

        if (task.optionStatus === "1") {
            containerToDo.innerHTML += taskHTML;
        } else if (task.optionStatus === "2") {
            containerDoing.innerHTML += taskHTML;
        } else if (task.optionStatus === "3") {
            containerDone.innerHTML += taskHTML;
        }
    });
}

// Function to clear the form after submitting a task
function cleanForm() {
    document.getElementById("inputTitle").value = '';
    document.querySelector('input[name="flexRadioDefault"]:checked').checked = false;
    document.getElementById("selected-option-pri").value = '';
    document.getElementById("selected-option-stu").value = '';
    document.getElementById("dateInput").value = '';
    document.getElementById("description").value = '';
}

// Function to add a new task
function addTask() {
    let titleValue = document.getElementById("inputTitle").value;
    const selectedRadioValue = document.querySelector('input[name="flexRadioDefault"]:checked').value;
    let selectedValuePro = document.getElementById("selected-option-pri").value;
    let selectedValueStu = document.getElementById("selected-option-stu").value;
    let dateInput = document.getElementById("dateInput").value;
    let description = document.getElementById("description").value;

    const task = {
        title: titleValue,
        optionFeatureBug: selectedRadioValue,
        optionPripority: selectedValuePro,
        optionStatus: selectedValueStu,
        description: description,
        date: dateInput,
        createdAt: new Date().toISOString()
    };

    let taskString = JSON.stringify(task);
    localStorage.setItem(`task_${countId}`, taskString);
    countId++;
    createCards();
    cleanForm();
}

// Event listeners for toggling form visibility and adding tasks
document.getElementById("form").style.display = "none";

document.getElementById("addTask").addEventListener("click", function () {
    document.getElementById("form").style.display = "block";
    document.getElementById("app").style.filter = "blur(7px)";
    document.getElementById("task-update-btn").style.display = "none";
    document.getElementById("task-delete-btn").style.display = "none";
});

document.getElementById("inputGroup-sizing-sm").addEventListener("click", function () {
    document.getElementById("form").style.display = "none";
    document.getElementById("app").style.filter = "none";
});

document.getElementById("x-mark").addEventListener("click", function () {
    document.getElementById("form").style.display = "none";
    document.getElementById("app").style.filter = "none";
   
});

document.getElementById('task-save-btn').addEventListener('click', function () {
    addTask();
    document.getElementById("form").style.display = "none";
    document.getElementById("app").style.filter = "none"
    
});

createCards();


console.log("hello world")