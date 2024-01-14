import { useState, useEffect } from 'react';
import { getTasks } from '../../tasksApi/tasks.Api';
import Header from '../Header/Header';
import AddTask from '../AddTask/AddTask';
import DisplayTasks from '../DisplayTasks/DisplayTasks';

function App () {
  const [taskList, setTaskList] = useState([]);

  const refreshTaskList = () => {
    // call getTasks from API
    getTasks()
    .then((response) => {
      console.log("Received task list from server");
      console.table(response.data);
      setTaskList(response.data);
    })
    .catch((err) => {
      console.error(`ERROR in client '/' GET route: ${e}`);
    });
  }

  // Initial tasklist load
  useEffect(() => {
    refreshTaskList();
  }, []);
  
  return (
    <div>
      <Header />
      <AddTask refreshTaskListCallback={refreshTaskList}/>
      <DisplayTasks taskListState={taskList} refreshTaskListCallback={refreshTaskList}/>
    </div>
  );

}

export default App
