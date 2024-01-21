import { useState, useEffect } from "react";
import { completeTask, deleteTask } from "../../tasksApi/tasks.Api";
import "./TaskCard.css";
import Checkbox from "@mui/material/Checkbox";
import DoneIcon from "@mui/icons-material/Done";

export default function TaskCard(props) {
  // Conditionally apply complete class to taskCard Instance
  const setCompleteClass = (completeStatus) => {
    const currentTaskCard = document.getElementById(
      `taskCard${props.itemCardData.id}`
    );
    //    const currentTaskCompleteChkBx = document.getElementById(`completeCheckbox${props.itemCardData.id}`);
    console.log(
      "Completion Status:",
      completeStatus,
      "\nSelected Element:",
      currentTaskCard
    );

    if (completeStatus) {
      currentTaskCard.classList.add("complete");
      //      currentTaskCompleteChkBx.setAttribute('checked', true);
    }

    props.refreshTaskListCallback();
  }; // end setCompleteClass()

  // Conditionally set color class to titleField instance
  const setTitleFieldColor = (itemPriority) => {
    const currentTitleField = document.getElementById(
      `titleField${props.itemCardData.id}`
    );
    // console.log('itemPriority:', itemPriority,'\nSelected Field:', currentTitleField);

    if (currentTitleField) {
      switch (itemPriority) {
        case "low":
          currentTitleField.classList.add("green");
          currentTitleField.classList.remove("red");
          currentTitleField.classList.remove("yellow");
          break;
        case "medium":
          currentTitleField.classList.remove("green");
          currentTitleField.classList.remove("red");
          currentTitleField.classList.add("yellow");
          break;
        case "high":
          currentTitleField.classList.remove("green");
          currentTitleField.classList.add("red");
          currentTitleField.classList.remove("yellow");
          break;
        default:
          break;
      }
    }
  }; // end setTitleField()

  const completeBtnClk = (event) => {
    event.preventDefault();
    //console.log('In completeBtnClk');

    completeTask(props.itemCardData.id) // API Call
      .then((result) => {
        console.log(
          `Task ID ${props.itemCardData.id} - ${props.itemCardData.title} marked complete`
        );
        setCompleteClass("true");
        props.refreshTaskListCallback();
      })
      .catch((err) => {
        console.error("ERROR in client put route", err);
      });
  }; // end completeBtnClk()

  const deleteBtnClk = (event) => {
    event.preventDefault();
    console.log("In deleteBtnClk - ID:", props.itemCardData.id);
    deleteTask(props.itemCardData.id)
      .then((result) => {
        console.log(
          `Deleted task ID: ${props.itemCardData.id} - ${props.itemCardData.title}.`
        );
        props.refreshTaskListCallback();
      })
      .catch((err) => {
        console.error("ERROR in client delete route", err);
      });
  }; // end deleteBtnClk()

  // set initial instance classes
  useEffect(() => {
    setTitleFieldColor(props.itemCardData.priority);
  }, []);

  useEffect(() => {
    setCompleteClass(props.itemCardData.complete);
  }, []);

  return (
    <div
      className="taskCard"
      id={"taskCard" + props.itemCardData.id}>
      <div
        className="titleField"
        id={"titleField" + props.itemCardData.id}>
        <div>
          <h4>Task: {props.itemCardData.title}</h4>
          <p>Priority: {props.itemCardData.priority}</p>
        </div>
        {props.itemCardData.complete && (
          <Checkbox
            size="large"
            disabled
            checked
            className="checkBox"
            checkedIcon={<DoneIcon />}
            sx={{
              "&.Mui-disabled": { color: "black" },
            }}
          />
        )}
        {/* <input type='checkbox' id={'completeCheckbox'+props.itemCardData.id} disabled/> */}
      </div>
      <div className="descriptionField">
        <h1 className="completeStamp">COMPLETE</h1>
        <p>{props.itemCardData.description}</p>
      </div>
      <div className="buttonField">
        <button
          type="button"
          className="completeBtn"
          onClick={completeBtnClk}>
          Complete
        </button>
        <button
          type="button"
          onClick={deleteBtnClk}>
          Delete
        </button>
      </div>
    </div>
  );
}
