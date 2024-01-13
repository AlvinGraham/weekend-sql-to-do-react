import { useState } from 'react';
import { postTask } from '../../tasksApi/tasks.Api';

export default function AddTask (props) {
  const [titleInputValue, setTitleInputValue] = useState('');
  const [descriptionInputValue, setDescriptionInputValue] = useState('');
  const [priorityInputValue, setPriorityInputValue] = useState('low');
  
  const submitTaskHandler = event => {
    event.preventDefault();
    console.log('In submitTaskHandler');
    const newTask = {
      title: titleInputValue,
      description: descriptionInputValue,
      priority: priorityInputValue,
      complete: false
    }
    console.log('Submitting Object:', newTask);
    
    // POST newTask
    postTask(newTask)
    .then((response) => {
      // TO-DO Refresh Display of Task List
      props.refreshTaskListCallback();
      // Reset Inputs
      setTitleInputValue('');
      setDescriptionInputValue('');
      setPriorityInputValue('low');
      const radioElement = document.getElementById('lowPriority');
      radioElement.checked = true;
    })
    .catch((err) => {
      console.error(`ERROR in client '/' POST route: ${err}`);
    });
  };

  return (
    <div id ="AddTaskDiv">
      <h1>I am the AddTaskDiv</h1>
      <form onSubmit={submitTaskHandler}>
        <label>Task Title:
          <input 
            type="text" 
            placeholder="Enter Title Here (Required)" 
            id="titleInput"
            value={titleInputValue}
            onChange={event => setTitleInputValue(event.target.value)}
          />
        </label>
        <br/>
        <label>Task Description:
          <input 
            type="text>" 
            placeholder="Enter Description Here" 
            id="descriptionInput"
            value={descriptionInputValue}
            onChange={event => setDescriptionInputValue(event.target.value)}
          />
        </label>
        <br/>
        <fieldset>
          <legend>Task Priority</legend>
          <input 
            type="radio" 
            id="lowPriority" 
            name="priorityInput" 
            value="low"
            onChange={() => setPriorityInputValue("low")} 
            defaultChecked
          />
          <label htmlFor="lowPriority">Low Priority</label>
          <input 
            type="radio" 
            id="mediumPriority" 
            name="priorityInput" 
            value="medium"
            onChange={() => setPriorityInputValue("medium")}
          />
          <label htmlFor="mediumPriority">Medium Priority</label>
          <input 
            type="radio" 
            id="highPriority" 
            name="priorityInput" 
            value="high"
            onChange={() => setPriorityInputValue("high")}
          />
          <label htmlFor="highPriority">High Priority</label>
          <br/>
        </fieldset>
        <button type="submit">Add New Task</button>
      </form>
    </div>
  );
}