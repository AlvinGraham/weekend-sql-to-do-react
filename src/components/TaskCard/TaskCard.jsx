import { useState } from 'react';
import './TaskCard.css';

export default function TaskCard(props) {

  console.log('Card Props:', props);

  const setTitleFieldColor = (itemPriority) => {
    const currentTitleField = document.getElementById(`titleField${props.itemCardData.id}`);
    console.log('itemPriority:', itemPriority,'\nSelected Field:', currentTitleField);
    switch (itemPriority) {
      case 'low':
        currentTitleField.classList.add('green');
        currentTitleField.classList.remove('red');
        currentTitleField.classList.remove('yellow');
        break;
      case 'medium':
        currentTitleField.classList.remove('green');
        currentTitleField.classList.remove('red');
        currentTitleField.classList.add('yellow');
        break;
      case 'high':
        currentTitleField.classList.remove('green');
        currentTitleField.classList.add('red');
        currentTitleField.classList.remove('yellow');
        break;
      default:
        break;
    }
  };


  return (
    <div className='taskCard'>
      <div className='titleField' id={'titleField'+props.itemCardData.id}>
        {setTitleFieldColor(props.itemCardData.priority)}
        <h4>Task: {props.itemCardData.title}</h4>
        <p>Priority: {props.itemCardData.priority}</p>
      </div>
      <div className='descriptionField'>
        <p>{props.itemCardData.description}</p>
      </div>
      <div className='buttonField'>
        <button>Complete</button>
        <button>Delete</button>
      </div>
    </div>
  );
}

// return <TaskCard key={itemIndex} 
//          itemCardData={taskItem} refreshTaskListCallback={props.refreshTaskListCallback}