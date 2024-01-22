import { useState } from "react";
import { postTask } from "../../tasksApi/tasks.Api";
import "./AddTask.css";

export default function AddTask(props) {
  const [titleInputValue, setTitleInputValue] = useState("");
  const [descriptionInputValue, setDescriptionInputValue] = useState("");
  const [priorityInputValue, setPriorityInputValue] = useState("low");

  const submitTaskHandler = (event) => {
    event.preventDefault();
    console.log("In submitTaskHandler");
    const newTask = {
      title: titleInputValue,
      description: descriptionInputValue,
      priority: priorityInputValue,
      complete: false,
    };

    // data validation
    if (!titleInputValue) {
      alert("Task Title is a required field!");
      return;
    }
    console.log("Submitting Object:", newTask);

    // POST newTask
    postTask(newTask)
      .then((response) => {
        // TO-DO Refresh Display of Task List
        props.refreshTaskListCallback();
        // Reset Inputs
        setTitleInputValue("");
        setDescriptionInputValue("");
        setPriorityInputValue("low");
        const radioElement = document.getElementById("lowPriority");
        radioElement.checked = true;
      })
      .catch((err) => {
        console.error(`ERROR in client '/' POST route: ${err}`);
      });
  };

  return (
    <div id="AddTaskDiv">
      <h2>ADD TASKS</h2>
      <form
        onSubmit={submitTaskHandler}
        id="entryAreas">
        <section id="textInputs">
          <label id="titleLabel">
            Task Title:
            <input
              type="text"
              placeholder="Enter Title Here (Required)"
              id="titleInput"
              value={titleInputValue}
              onChange={(event) => setTitleInputValue(event.target.value)}
            />
          </label>
          <br />
          <label id="descriptionLabel">
            <span>Task Description:</span>
            <textarea
              type="text>"
              placeholder="Enter Description Here"
              id="descriptionInput"
              value={descriptionInputValue}
              onChange={(event) =>
                setDescriptionInputValue(event.target.value)
              }></textarea>
          </label>
        </section>
        <fieldset id="radioInputs">
          <legend>Task Priority</legend>
          <label htmlFor="lowPriority">
            <input
              type="radio"
              id="lowPriority"
              name="priorityInput"
              value="low"
              onChange={() => setPriorityInputValue("low")}
              defaultChecked
            />
            Low Priority
          </label>
          <label htmlFor="mediumPriority">
            <input
              type="radio"
              id="mediumPriority"
              name="priorityInput"
              value="medium"
              onChange={() => setPriorityInputValue("medium")}
            />
            Medium Priority
          </label>
          <label htmlFor="highPriority">
            <input
              type="radio"
              id="highPriority"
              name="priorityInput"
              value="high"
              onChange={() => setPriorityInputValue("high")}
            />
            High Priority
          </label>
        </fieldset>
        <button
          type="submit"
          id="buttonInputs">
          Add New Task
        </button>
      </form>
    </div>
  );
}
