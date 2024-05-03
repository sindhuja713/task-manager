
import './App.css';
import Task from './components/taskManager/Task';
import TaskManager from './components/taskManager/TaskManager';
import TaskManagerReducer from './components/taskManager/TaskManagerReducer';

function App() {
  return (
    <div >
      <TaskManagerReducer />
    </div>
  );
}

export default App;
