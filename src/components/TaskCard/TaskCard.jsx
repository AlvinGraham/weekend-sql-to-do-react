import { useState, useEffect } from 'react';
import { deleteTask } from '../../tasksApi/tasks.Api';
import './TaskCard.css';
import axios from 'axios';

export default function TaskCard(props) {

  console.log('Card Props:', props);

  const setTitleFieldColor = itemPriority => {
    const currentTitleField = document.getElementById(`titleField${props.itemCardData.id}`);
    console.log('itemPriority:', itemPriority,'\nSelected Field:', currentTitleField);

    if (currentTitleField) {
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
  };

  const completeBtnClk = (event) => {
    console.log('In completeBtnClk');
    event.preventDefault();
  };

  const deleteBtnClk = (event) => {
    event.preventDefault();
    console.log('In deleteBtnClk - ID:', props.itemCardData.id);
    deleteTask(props.itemCardData.id)
    .then((result) => {
      console.log(`Deleted task ID: ${props.itemCardData.id} - ${props.itemCardData.title}.`);
      props.refreshTaskListCallback();
    })
    .catch((err) => {
      console.error('ERROR in client delete route', err);
    });
  };

  useEffect (() => {
    setTitleFieldColor(props.itemCardData.priority);
  }, []);


  return (
    <div className='taskCard'>
      <div className='titleField' id={'titleField'+props.itemCardData.id}>
        {/* {setTitleFieldColor(props.itemCardData.priority)} */}
        <h4>Task: {props.itemCardData.title}</h4>
        <p>Priority: {props.itemCardData.priority}</p>
      </div>
      <div className='descriptionField'>
        <p>{props.itemCardData.description}</p>
      </div>
      <div className='buttonField'>
        <button type="button" onClick={completeBtnClk}>Complete</button>
        <button type="button" onClick={deleteBtnClk}>Delete</button>
      </div>
    </div>
  );
}

// return <TaskCard key={itemIndex} 
//          itemCardData={taskItem} refreshTaskListCallback={props.refreshTaskListCallback}