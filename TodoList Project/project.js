
const addTaskModal = document.getElementById('add-modal');
const editTaskModal = document.getElementById('edit-modal');
// const addTaskModal = document.querySelector('#add-modal');
// const addTaskModal = document.body.children[1];
const startAddTaskButton = document.getElementById('add-button');
// const startAddTaskButton = document.querySelector('header').lastElementChild;
const backdrop = document.getElementById('backdrop');
// const backdrop = document.body.firstElementChild;
const cancelAddTaskButton = addTaskModal.querySelector('.btn--passive');
const confirmAddTaskButton = cancelAddTaskButton.nextElementSibling;
const cancelEditTaskButton = editTaskModal.querySelector('.btn--passive');
const confirmEditTaskButton = cancelEditTaskButton.nextElementSibling;
const userInputs = addTaskModal.querySelectorAll('input');
const userInputsEdit = editTaskModal.querySelectorAll('input');
// const userInputs = addTaskModal.getElementsByTagName('input');
const entryTextSection = document.getElementById('entry-text');
const deleteTaskModal = document.getElementById('delete-modal');

const deleteTaskElementButton = document.getElementsByClassName('delete-btn');


const tasks = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const updateUI = () => {
  if (tasks.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

//----------------------------Deletion--------------------------------------------------------------------

const closeTaskDeletionModal = () => {
  toggleBackdrop();
  deleteTaskModal.classList.remove('visible');
};

const deleteTaskHandler = taskId => {
    let taskIndex = 0;
  for (const task of tasks) {
    if (task.id === taskId) {
      break;
    }
    taskIndex++;
  }
  tasks.splice(taskIndex, 1);
//   const editNewTaskElementButton = document.getElementsByClassName('edit-btn');
//   console.log(editNewTaskElementButton[taskIndex])
  const listRoot = document.getElementById('task-list');
//   const deleteNewTaskElementButton = document.getElementsByClassName('delete-btn')[taskIndex] ;
//     console.log(deleteNewTaskElementButton);
  listRoot.children[taskIndex].remove();
  //listRoot.removeChild(listRoot.children[taskIndex]);
  closeTaskDeletionModal();
  updateUI();
};





const startDeleteTaskHandler = taskId => {
    deleteTaskModal.classList.add('visible');
    toggleBackdrop();
  
    const cancelDeletionButton = deleteTaskModal.querySelector('.btn--passive');
    let confirmDeletionButton = deleteTaskModal.querySelector('.btn--danger');
  
    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
  
    confirmDeletionButton = deleteTaskModal.querySelector('.btn--danger');
  
    // confirmDeletionButton.removeEventListener('click', deleteTaskHandler.bind(null, taskId)); // will not work :(

        // let taskIndex = 0;
        // for (const task of tasks) {
        //   if (task.id === taskId) {
        //     break;
        //   }
        //   taskIndex++;
        // }
        // tasks.splice(taskIndex, 1);
        // deleteNewTaskElementButton = document.getElementsByClassName('delete-btn')[taskIndex] ;
        // console.log(deleteNewTaskElementButton);
      
    cancelDeletionButton.removeEventListener('click', closeTaskDeletionModal);
  
    cancelDeletionButton.addEventListener('click', closeTaskDeletionModal);
    confirmDeletionButton.addEventListener(
      'click',
      deleteTaskHandler.bind(null, taskId)
    );
  };

  function getDeleteTaskElementButton (taskId) {
    let taskIndex = 0;
    for (const task of tasks) {
      if (task.id === taskId) {
          //console.log(taskId);
        break;
      }
      taskIndex++;
    }
    tasks.splice(taskIndex, 1);
    const deleteNewTaskElementButton = document.getElementsByClassName('delete-btn')[taskIndex] ;
    //console.log(deleteNewTaskElementButton);

    deleteNewTaskElementButton.addEventListener('click', startDeleteTaskHandler.bind(null, taskId));
  }




//------------------------------------------------------------------------------------------------------------


//--------------------------add task---------------------------------------------------------------------------------

const renderNewTaskElement = (id, title, description,subtask) => {
  const newTaskElement = document.createElement('li');
  newTaskElement.className = 'task-element';
  newTaskElement.innerHTML = `
    <div class="task-element__info">
      <h2 id="title">${title}</h2>
      <h4 id="description">${description}</h4>
      <h5 id="subtask">${subtask}</h5>
    </div>
    <div class="task-element__buttons">
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
    </div>   
  `;
//   let taskIndex = 0;
//   for (const task of tasks) {
//     if (task.id === taskId) {
//       break;
//     }
//     taskIndex++;
//   }
//   tasks.splice(taskIndex, 1);
//   taskIndex = taskIndex - 1;
//   console.log(taskIndex);
//   const deleteNewTaskElementButton = document.getElementsByClassName('delete-btn');
//   console.log(deleteNewTaskElementButton);
  
  //newTaskElement.addEventListener('click', startDeleteTaskHandler.bind(null, id));
  newTaskElement.addEventListener('click',getDeleteTaskElementButton.bind(null, id));
  newTaskElement.addEventListener('click',getEditTaskElementButton.bind(null, id));
  const listRoot = document.getElementById('task-list');
  listRoot.append(newTaskElement);

};

const closeTaskModal = () => {
    addTaskModal.classList.remove('visible');
  };
  
  const showTaskModal = () => {
    // function() {}
    addTaskModal.classList.add('visible');
    toggleBackdrop();
  };

  const cancelAddTaskHandler = () => {
    closeTaskModal();
    toggleBackdrop();
    clearTaskInput();
  };

  const addTaskHandler = () => {
    const titleValue = userInputs[0].value;
    const descriptionValue = userInputs[1].value; 
    const subtaskValue = userInputs[2].value
  
    if (
      titleValue.trim() === '' ||
      descriptionValue.trim() === '' ||
      subtaskValue.trim() === '' 
    ) {
      alert('Please enter valid values.');
      return;
    }
  
    const newTask = {
      id: Math.random().toString(),
      title: titleValue,
      description: descriptionValue,
      subtask: subtaskValue
    };
  
    tasks.push(newTask);
    console.log(tasks);
    closeTaskModal();
    toggleBackdrop();
    clearTaskInput();
    renderNewTaskElement(
      newTask.id,
      newTask.title,
      newTask.description,
      newTask.subtask
    );
    updateUI();
  };  

//--------------------------------------------------------------------------------------------------------------

//---------------------edit task-----------------------------------------------------------------------------------


const startEditNewTaskElement = taskId => {
    showEditTaskModal();
    confirmEditTaskButton.addEventListener(
      'click',
      editTaskHandler.bind(null, taskId)
    );
  };


const closeEditTaskModal = () => {
    editTaskModal.classList.remove('visible');
}

const showEditTaskModal = () => {
    editTaskModal.classList.add('visible');
    toggleBackdrop();
}

const cancelEditTaskHandler = () => {
    closeEditTaskModal();
    toggleBackdrop();
    clearTaskInput();
}

const editTaskHandler = (taskId) => {
    const titleValue = userInputsEdit[0].value;
    const descriptionValue = userInputsEdit[1].value; 
    const subtaskValue = userInputsEdit[2].value;
    //console.log(titleValue);
  
    // if (
    //   titleValue.trim() === '' ||
    //   descriptionValue.trim() === ''||
    //   subtaskValue.trim() === '' 
    // ) {
    //   alert('Please enter valid values fuck.');
    //   return;
    // }
    let taskIndex = 0;
  for (const task of tasks) {
    if (task.id === taskId) {
      break;
    }
    taskIndex++;
    }
    tasks.splice(taskIndex, 1);
    //const listRoot = document.getElementById('task-list').children;
    //listRoot.children[taskIndex].remove();
    //listRoot.children[taskIndex]
    //.getElementById('title').innerHTML = titleValue;
    newTaskElementEdit = document.getElementsByClassName('task-element__info')[taskIndex];
    console.log(titleValue);
    newTaskElementEdit.querySelector('h2').innerHTML = titleValue;
    newTaskElementEdit.querySelector('h4').innerHTML = "is";
    newTaskElementEdit.querySelector('h5').innerHTML = "demo example";
    console.log(newTaskElementEdit.querySelector('h2').innerHTML)
    // newTaskElementEdit.querySelector('h4').innerHTML = descriptionValue;
    // newTaskElementEdit.querySelector('h5').innerHTML = subtaskValue;
    //console.log(newTaskElementEdit);
    closeEditTaskModal();
    toggleBackdrop();
    clearTaskInputEdit();
}    

    function getEditTaskElementButton (taskId) {
        let taskIndex = 0;
        for (const task of tasks) {
        if (task.id === taskId) {
            //console.log(taskId);
            break;
        }
        taskIndex++;
        }
        tasks.splice(taskIndex, 1);
        const editNewTaskElementButton = document.getElementsByClassName('edit-btn')[taskIndex] ;
        //console.log(editNewTaskElementButton);

        editNewTaskElementButton.addEventListener('click', startEditNewTaskElement.bind(null, taskId));
    }

//-------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------

const clearTaskInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = '';
  }
};

const clearTaskInputEdit = () => {
    for (const usrInput of userInputsEdit) {
        usrInput.value = '';
    }
}

const backdropClickHandler = () => {
  closeTaskModal();
  closeTaskDeletionModal();
  closeEditTaskModal();
  clearTaskInput();
  clearTaskInputEdit();
  
};

startAddTaskButton.addEventListener('click', showTaskModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddTaskButton.addEventListener('click', cancelAddTaskHandler);
confirmAddTaskButton.addEventListener('click', addTaskHandler);
cancelEditTaskButton.addEventListener('click', cancelEditTaskHandler);
confirmEditTaskButton.addEventListener('click', editTaskHandler);