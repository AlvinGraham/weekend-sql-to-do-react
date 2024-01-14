import { useState } from 'react';
import './TaskCard.css';

export default function TaskCard(props) {

  console.log('Card Props:', props);
  return (
    <div className='taskCard'>
      <div className='titleField'>
        <h4>Task: {props.itemCardData.title}</h4>
      </div>
    </div>
  );
}

// return <TaskCard key={itemIndex} 
//          itemCardData={taskItem} refreshTaskListCallback={props.refreshTaskListCallback}