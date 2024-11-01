let countId;
function getAllLocalStorageItemsAsArray() {
  const itemsArray = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);


    const parsedValue = JSON.parse(value);
    itemsArray.push({ key: key, value: parsedValue });

  }

  return itemsArray;
}

// Usage
function createCards(){
    const allItemsArray = getAllLocalStorageItemsAsArray();
// console.log(allItemsArray[0])

let html = "";
const container = document.getElementById('to-do-tasks');
const containerDoing = document.getElementById('in-progress-tasks')
const containerDone = document.getElementById('done-tasks')


// if(selectedValueStu = 1)




allItemsArray.forEach((item) => {
  html += `
  <button class="text-start p-2 d-flex" >
                  <div class="">
                    <i class="fas fa-question-circle text-success fs-1 me-2"></i>
                  </div>
                  <div class="">
                    <div class="fs-3 mb-1 title-box">     
                    ${item.value.title}
                    </div>
                    <div class="">
                      <div class=" date-box">created in ${item.value.date}</div>
                      <div
                        class="mb-2 task-box text-break"
                        title="There is hardly anything more frustrating than having to look for current requirements in tens of comments under the actual description or having to decide which commenter is actually authorized to change the requirements. The goal here is to keep all the up-to-date requirements and details in the main/primary description of a task. Even though the information in comments may affect initial criteria, just update this primary description accordingly."
                      >
                      ${item.value.description}
                      </div>
                    </div>
                    <div class="">
                      <span class="btn btn-primary">${item.value.radioValue1}</span>
                      <span class="btn btn-outline-secondary">Feature</span>
                    </div>
                  </div>
                </button>
  `;
});

// Append the generated HTML to the itemList div
container.innerHTML = html;
}
createCards()


// adding ===========================================

function selectedType(){

    const selectedRadio = document.querySelector('input[name="flexRadioDefault"]:checked').value;
// let selectValue = selectedRadio.value;
console.log(selectedRadio);

    let levelType = document.getElementById('type-level').value;
    levelType.value = 'selectedRadio';
    console.log(levelType)
}


document.getElementById("form").style.display = "none";

document.getElementById("addTask").addEventListener("click", function () {
  document.getElementById("form").style.display = "block";
  document.getElementById("task-update-btn").style.display = "none";
  document.getElementById("task-delete-btn").style.display = "none";
  document.getElementById("app").style.filter = "blur(7px)";
  
});

document
  .getElementById("inputGroup-sizing-sm")
  .addEventListener("click", function () {
    document.getElementById("form").style.display = "none";
    document.getElementById("app").style.filter = "none";
  });

document.getElementById("x-mark").addEventListener("click", function () {
  document.getElementById("form").style.display = "none";
  document.getElementById("app").style.filter = "none";
});

document.getElementById('task-save-btn').addEventListener('click', function(){
    document.getElementById("form").style.display = "none";
    document.getElementById("app").style.filter = "none"
    // selectedType();
})


// last option for validation

// sweet alert
// let titleValue = document.getElementById('input-title').value;
// function formValidation(){
//     if(titleValue == ''){
//         alert("Please fill the forme!");
//     }
// }


     function cleanForm() {
        document.getElementById("inputTitle").value = '';
        document.getElementById("flexRadioDefault1").checked = false;
        document.getElementById("flexRadioDefault2").checked = false;
        document.getElementById("selected-option-pri").value = '';
        document.getElementById("selected-option-stu").value = '';
        document.getElementById("dateInput").value = '';
        document.getElementById("to-do-tasks-count").value = '';
        document.getElementById("description").value = '';
    }



let tasks = [];
function addTask() {

  let titleValue = document.getElementById("inputTitle").value;
  //type : bugs or feature
//   let radioValue1 = document.getElementById("flexRadioDefault1").checked;
//   let radioValue2 = document.getElementById("flexRadioDefault2").checked;
  const selectedRadioValue = document.querySelector('input[name="flexRadioDefault"]:checked').value;
  //status : do or doing or done
  let selectedValuePro = document.getElementById("selected-option-pri").value;
  let selectedValueStu = document.getElementById("selected-option-stu").value;

  let dateInput = document.getElementById("dateInput").value;
  let tasksCount = document.getElementById("to-do-tasks-count").value;
  let description = document.getElementById("description").value;



alert(selectedRadioValue);
alert("do/doin/done" + selectedValueStu);






  const task = {
    title: titleValue,
    // optionFeature: flexRadioDefault1,
    optionFeatureBug :selectedRadioValue,
    // function selectedType(){

    //     const selectedRadio = document.querySelector('input[name="flexRadioDefault"]:checked').value;
    // // let selectValue = selectedRadio.value;
    // console.log(selectedRadio);
    
    //     // let levelType = document.getElementById('type-level').value;
    //     // levelType.innerHTML = 'selectedRadio';
    //     // console.log(levelType)
    // }
    // ,
    // optionbug: radioValue2,
    optionPripority: selectedValuePro,
    optionStatus: selectedValueStu,
    description : description,
    date: dateInput,
    tasksCount: tasksCount,
    createdAt: new Date().toISOString(), // time
  };
  tasks.push(task);

  let taskString = JSON.stringify(task);
  localStorage.setItem(`tasks${countId}`, taskString);
  countId = countId + 1; 
  createCards()
  localStorage.clear()
  alert("your infos added to local  storage");
cleanForm();
}



// console.log(countId)


//---------------------------------not mine-------------------------------

// document.getElementById('task-save-btn').addEventListener('click', function (){
//     let counter = 1;
//     counter++;

// })
// document.getElementById('to-do-tasks-count').innerHTML = 'counter';
// function addTask(taskText) {
//     const task = {
//         id: Date.now().toString(),
//         text: taskText,
//         completed: false
//     };
//     tasks.push(task);
//     renderTasks();

//     // SweetAlert pour confirmer l'ajout
//     Swal.fire({
//         title: 'Task Added!',
//         text: `You have added a new task: "${taskText}"`,
//         icon: 'success',
//         confirmButtonText: 'Nice!'
//     });
// }
//---------------------------------not mine-------------------------------

// // local storage
// function addItem (){
//     let itemName = document.getElementById('title-name').value;
//     let itemValue = document.getElementById('inputTitle').value;

//     localStorage.setItem(itemName, itemValue);
//     alert("your infos added to local  storage");
// }

// function showItem(){

//     let itemName = document.querySelector('#title-name').value;

//     alert('Item Value = ' + localStorage.getItem(itemName));
// }
// // tasks.push(task);
