import TaskCard from "../TaskCard/TaskCard";
import "./DisplayTasks.css";

export default function DisplayTasks(props) {
  console.log("DisplayTasks.props", props);
  return (
    <div id="displayTasksDiv">
      <h2>TASK LIST</h2>
      <div className="cardField">
        {props.taskListState.map((taskItem, itemIndex) => {
          // console.log('ItemIndex:', itemIndex);
          return (
            <TaskCard
              key={taskItem.id}
              itemCardData={taskItem}
              refreshTaskListCallback={props.refreshTaskListCallback}
            />
          );
        })}
      </div>
    </div>
  );
}
