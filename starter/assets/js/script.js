

//parsley validation code
/*
$(function() { 
    $('#form').parsley(); //verifiy if the form is valid
    cleanForm();

    $('#form').on('submit', function(e) {
        e.preventDefault(); // 
        
        if ($(this).parsley().isValid()) {
            alert('done with success'); // if thi form is valid with paresley  validation

        }
    });
});
*/


//update  task
function updateit(key){
    editTask(key);
    document.getElementById("task-update-btn").addEventListener('click', function() {
        updateTask(key);
    });
}


//edit task function
function editTask(key) {
    const taskData = JSON.parse(localStorage.getItem(key));
    if (taskData) {
         document.getElementById('form').style.display = 'block';
        // Populate form fields with task data
        document.getElementById("inputTitle").value = taskData.title;
        document.getElementById("description").value = taskData.description;
        document.getElementById("dateInput").value = taskData.date;
        document.querySelector(`input[name="flexRadioDefault"][value="${taskData.radioValue1}"]`).checked = true;
       
  
        // Show the "update" button
        document.getElementById("task-update-btn").style.display = "block";
        document.getElementById("task-save-btn").style.display = "none";
  
        // save changes
        document.getElementById("task-update-btn").onclick = function () {
            updateTask(key);
            
            
        };
    }cleanForm()
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
    document.getElementById("task-update-btn").style.display = "none";//here
    document.getElementById("task-save-btn").style.display = "block";
    alert("Task updated successfully");
    console.log("updatetask")
    deleteData(key)
  }
  
  let countId = localStorage.length;
  
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
      console.log(itemsArray)
      return itemsArray;
  }
  
  // Function to create tasks cards
  function createCards() {
      const allItemsArray = getAllLocalStorageItemsAsArray();
  
      const containerToDo = document.getElementById('to-do-tasks');
      const containerDoing = document.getElementById('in-progress-tasks');
      const containerDone = document.getElementById('done-tasks');
  
      // Clear each container 
      containerToDo.innerHTML = "";
      containerDoing.innerHTML = "";
      containerDone.innerHTML = "";
  
      // Loop in all tasks and make theme in thir card task
      let i =0;
      let taskHTML;
      allItemsArray.forEach((item) => {
        console.log("hello")
          const task = item.value;
           taskHTML = `
              <button class="text-start p-2 d-flex">
                  <div class="">
                      <i class="fas ${task.optionStatus === "1" ? 'fa-question-circle' : task.optionStatus === "2" ? 'fa-spinner fa-spin' : 'fa-check-circle'} text-success fs-1 me-2"></i>
                  </div>
                  <div>
                      <div class="fs-3 mb-1 title-box">${task.title}</div>
                      <div class="date-box">Created on: ${task.date}</div>
                      <div class="mb-2 task-box" >${task.description}</div>
                      <div>
                          <span class="btn btn-primary">${task.optionFeatureBug}</span>
                          <span class="btn btn-outline-secondary">${task.optionStatus === "1" ? 'Heigh' : task.optionStatus === "2" ? 'Medium' : 'Low'}</span>
                          


 <a type="submit" name="delete" class="btn btn-danger task-action-btn" id="task-delete-btn" onclick="deleteData('${item.key}')">Delete</a>
        <a type="submit" name="update" class="btn btn-warning task-action-btn" id="task-update-btn"  onclick = "updateit('${item.key}')">Update</a>
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
  createCards()
  // Function to clear the form after submitting a task
  function cleanForm() {
      document.getElementById("inputTitle").value = '';
      document.querySelector('input[name="flexRadioDefault"]:checked').checked = false;
      document.getElementById("selected-option-pri").value = '';
      document.getElementById("selected-option-stu").value = '';
      document.getElementById("dateInput").value = '';
      document.getElementById("description").value = '';
    //   $('#form').parsley().reset(); // Reset Parsley validation it;s way when u click on add task  button validation comments invisible

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
      console.log(countId)
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
      cleanForm();

  });
  
  document.getElementById('task-save-btn').addEventListener('click', function () {
      addTask();
      document.getElementById("form").style.display = "none";
      document.getElementById("app").style.filter = "none"
      
  });
  
  createCards();
  
  
  console.log("hello world")
//   localStorage.clear()

// function deleteData(i){
//     taskData.splice(i,1);
//     localStorage.taskData = json.stringify(taskData);
//     // createCards();
// }


function deleteData(key) {
    // Remove the specific task from local storage
    localStorage.removeItem(key);
    // Recreate the cards to reflect the deletion
    createCards();
    
}



document.getElementById("panel-title").innerHTML =span;

document.getElementById('to-do-tasks-count').innerHTML =`
<span id="to-do-tasks-count">${taskData.length}</span>
`
