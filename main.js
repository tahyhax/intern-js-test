
const menuLink = document.querySelectorAll('.nav .nav__link');
const burger = document.querySelector('#burger');
const sidebar = document.querySelector('#sidebar');
const tasks = document.querySelectorAll('.sidebar__tasks-item')

burger.addEventListener("click", function() {
  this.classList.toggle('burger--active')
  sidebar.classList.toggle('sidebar--active')
});


[...menuLink].forEach(link => {
  link.addEventListener('click', addActive)
})

function addActive(e) {
  e.preventDefault();
  if (!!document.querySelector('.nav .nav__link--active')) {
    document.querySelector('.nav .nav__link--active').classList.remove('nav__link--active');
  }
  e.target.classList.add('nav__link--active');
}


//lesson 2
const data = {
  tasks:{
    complited:372,
    open:11
  },
  attachments: [
    {
      'src':'https://via.placeholder.com/100?text=Image 1',
      'description': 'Image 1'
    },
    {
      'src':'https://via.placeholder.com/100?text=Image 2',
      'description': 'Image 2'
    },
    {
      'src':'https://via.placeholder.com/100?text=Image 3',
      'description': 'Image 3'
    },
    {
      'src':'https://via.placeholder.com/100?text=Image 4',
      'description': 'Image 4'
    },
  ]
};
const notoficationsCount  = document.getElementById('notifictions-count')
const attachmentsList =  document.querySelector('.chat__message-attachment')

function setAttachments(block, attachments){

  attachments.forEach((attacment, key) => {
    let attachmentItem = `<a class="chat__message-attachment-item" href="#">
      <img src="${attacment.src}" alt="${attacment.description}" data-key="${key}">
    </a>`;
    block.insertAdjacentHTML('beforeend', attachmentItem)
  })
}

setAttachments(attachmentsList, data.attachments);


attachmentsList.querySelectorAll('.chat__message-attachment-item > img').forEach(item => {
  item.addEventListener('click', function() {
    notoficationsCount.innerText = this.dataset.key
  });
})

tasks.forEach(task => {

  task.addEventListener('click', function() {
    
    let type = this.dataset.type
    let confirmMessage = `Are you sure you want to change the number of tasks?`;
    const {tasks:tasksValue} = data;
    const typeToValidate = type === 'complited' ?  'open': 'complited'; 
    if (!tasksValue[typeToValidate]) {
      alert(`All tasks are ${type} !`)
      return false;
    }
    
    if(!confirm(confirmMessage)) {
      return false;
    }

    tasksValue.open = type === 'complited' ? tasksValue.open - 1 : tasksValue.open + 1
    tasksValue.complited = type === 'open' ? tasksValue.complited - 1 : tasksValue.complited + 1
    
    tasks.forEach(task => {
      task.querySelector('.sidebar__tasks-title').innerText = tasksValue[task.dataset.type]
    })

  })
 
})
