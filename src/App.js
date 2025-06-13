import { useState } from "react";
import "./index.css";

const arrayItemsToDo = [
  {
    id: "1",
    title: "Buy Groceries",
    description:
      "Remember to pick up milk, eggs, bread, and fruits from the supermarket.",
    completed: false,
  },
];

export default function App() {
  const [itemsToDo, setItemsToDo] = useState([...arrayItemsToDo]);

  function handelAddItem(newItem) {
    setItemsToDo((items) => [...items, newItem]);
  }

  function handelDeleteItem(id) {
    setItemsToDo((items) => items.filter((item) => item.id !== id));
  }

  function handelCompletedItem(id) {
    setItemsToDo((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  return (
    <div className="todo-container">
      <Header />
      <AddTask onHandelAddItem={handelAddItem} />
      <ToDoListItems
        itemsToDo={itemsToDo}
        handelDeleteItem={handelDeleteItem}
        handelCompletedItem={handelCompletedItem}
      />
    </div>
  );
}

function Header() {
  return <h1>My To-Do List</h1>;
}

function AddTask({ onHandelAddItem }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handelSubmit() {
    if (!title) return;

    const newItem = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
    };

    onHandelAddItem(newItem);

    setTitle("");
    setDescription("");
  }

  return (
    <div className="add-task-section">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        id="taskTitleInput"
        placeholder="عنوان المهمة الجديدة..."
        className="task-input"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        id="taskDescriptionInput"
        placeholder="وصف المهمة (اختياري)..."
        className="task-input"
      ></textarea>
      <button
        id="addTaskBtn"
        className="add-btn"
        onClick={() => handelSubmit()}
      >
        <i className="fas fa-plus-circle"></i> إضافة مهمة
      </button>
    </div>
  );
}

function ToDoListItems({ itemsToDo, handelDeleteItem, handelCompletedItem }) {
  return itemsToDo.map((item) => (
    <ToDoItem
      Item={item}
      key={item.id}
      handelDeleteItem={handelDeleteItem}
      handelCompletedItem={handelCompletedItem}
    />
  ));
}

function ToDoItem({ Item, handelDeleteItem, handelCompletedItem }) {
  return (
    <div className={`todo-item ${Item.completed && "completed"}`}>
      <div className="task-content">
        <h2>{Item.title}</h2>
        <p>{Item.description}</p>
      </div>
      <div className="actions">
        <button
          className="complete-btn"
          onClick={() => handelCompletedItem(Item.id)}
        >
          ✓
        </button>

        <button
          className="delete-btn"
          onClick={() => handelDeleteItem(Item.id)}
        >
          X
        </button>
      </div>
    </div>
  );
}
