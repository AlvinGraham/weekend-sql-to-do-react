import TaskCard from '../TaskCard/TaskCard';
import './DisplayTasks.css';
import { useState } from 'react';

export default function DisplayTasks (props) {
 console.log('DisplayTasks.props', props);
  return (
    <div id="displayTasksDiv">
      <h2>TASK LIST</h2>
      <div className="cardField">
        {(props.taskListState).map((taskItem, itemIndex) => {
          return <TaskCard key={itemIndex} 
          itemCardData={taskItem} refreshTaskListCallback={props.refreshTaskListCallback} />
        })}
      </div>
    </div>
  );
}

