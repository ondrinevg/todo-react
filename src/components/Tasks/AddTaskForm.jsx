import axios from "axios";
import { useState } from "react";

const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleFormVisible = () => {
    setFormVisible(!visibleForm);
    setInputValue('');
  }

  const addTask = () => {
    const obj = {
      "listId": list.id,
      "text": inputValue,
      "completed": false
    };
    setIsLoading(true);
    axios
      .post('http://localhost:3001/tasks', obj)
      .then(({ data }) => {
        onAddTask(list.id, data)
        toggleFormVisible();
      })
      .catch(() => {
        alert('Ошибка при добавлении задачи!')
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <div className="tasks__form">
      {!visibleForm ?
        (<div onClick={toggleFormVisible} className="tasks__form-new">
          <i>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </i>
          <span>Нова задача</span>
        </div>) : (
          <div className="tasks__form-block">
            <input
              value={inputValue}
              className="field"
              type="text"
              placeholder="Текст задачи"
              onChange={e => setInputValue(e.target.value)}>
            </input>
            <button disabled={isLoading} onClick={addTask} className="button">
              {isLoading ? 'Добавление...' : 'Добавить задачу'}</button>
            <button onClick={toggleFormVisible} className="button button--grey">Отмена</button>
          </div>)
      }
    </div>
  );
}

export default AddTaskForm;
