export const taskReducer = (state, action) => {
    if (action.type === "EMPTY_FIELD") {
      return {
        ...state,
        isAlertOpen: true,
        alertContent: "Please enter name and date",
        alertClass: "danger",
      };
    }
  
    if (action.type === "CLOSE_ALERT") {
      return { ...state, isAlertOpen: false };
    }
  
    if (action.type === "ADD_TASK") {
      console.log(action.payload);
      const allTasks = [...state.tasks, action.payload];
      // uodate task in LS
      localStorage.setItem("tasks", JSON.stringify(allTasks));
      return {
        ...state,
        tasks: allTasks,
        isAlertOpen: true,
        alertContent: "Task added successfully",
        alertClass: "success",
      };
    }
  
    if (action.type === "OPEN_EDIT_MODAL") {
      console.log(action.payload);
      return {
        ...state,
        taskID: action.payload,
        isEditModalOpen: true,
        modalTitle: "Edit Task",
        modalMsg: "You are about to edit this task",
        modalActionText: "Edit",
      };
    }
  
    if (action.type === "CLOSE_MODAL") {
      return { ...state, isEditModalOpen: false, isDeleteModalOpen: false };
    }
  
    if (action.type === "EDIT_TASK") {
      return { ...state, isEditing: true };
    }
  
    if (action.type === "UPDATE_TASK") {
      console.log(action.payload);
      const updatedTask = action.payload;
      const id = action.payload.id;
  
      // Find the task index
      const taskIndex = state.tasks.findIndex((task) => {
        return task.id === id;
      });
      // Replace the task by its index
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask;
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
  
      return {
        ...state,
        isEditing: false,
        isAlertOpen: true,
        alertContent: " Task edited successfully",
        alertClass: "success",
      };
    }
  
    if (action.type === "OPEN_DELETE_MODAL") {
      // console.log(action.payload);
      return {
        ...state,
        taskID: action.payload,
        isDeleteModalOpen: true,
        modalTitle: "Delete Task",
        modalMsg: "You are about to delete a task",
        modalActionText: "Delete",
      };
    }
  
    if (action.type === "DELETE_TASK") {
      const id = action.payload;
      const newTasks = state.tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return {
        ...state,
        tasks: newTasks,
        isAlertOpen: true,
        alertContent: "Task deleted successfully",
        alertClass: "success",
        isDeleteModalOpen: false,
      };
    }
  
    if (action.type === "COMPLETE_TASK") {
      const id = action.payload;
      // Find the task index
      const taskIndex = state.tasks.findIndex((task) => {
        return task.id === id;
      });
  
      let updatedTask = {
        id,
        name: state.tasks[taskIndex].name,
        date: state.tasks[taskIndex].date,
        complete: true,
      };
  
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask;
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
      return {
        ...state,
        isAlertOpen: true,
        alertContent: "Task Completed",
        alertClass: "success",
      };
    }
  
    return state;
  };
  