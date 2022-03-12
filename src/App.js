import React, { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((res) => {
        //console.log(res.slice(0, 20));
        setTodos([...res.splice(0, 50)]);
      });
  }, []);

  const onBtnClick = (id) => {
    setTodos((prev) => {
      var a = [];
      for (let i = 0; i < prev.length; i++) {
        if (prev[i].id == id) {
          let b = { ...prev[i], completed: !prev[i].completed };
          //b.completed = !prev[i].completed;
          //a[i].completed = !b;
          a.push(b);
          console.log(b);
        } else {
          a.push(prev[i]);
        }
      }
      return a;
    });
  };

  const onDeleteClick = (id) => {
    setTodos((prev) => {
      let a = [];
      for (let i = 0; i < prev.length; i++) {
        let b = prev[i];
        if (b.id !== id) {
          a.push(b);
        }
      }
      return a;
    });
  };

  const addTask = () => {
    if (task.length !== 0) {
      setTodos((prev) => {
        console.log(typeof prev, prev);
        let a = {
          id: prev.length + 1,
          userId: 1,
          title: task,
          completed: false,
        };
        setTask("");
        return [...prev, a];
      });
    } else {
      alert("Please enter something");
    }
  };

  return (
    <div className="container">
      <div
        style={{ marginTop: 32 }}
        className="d-flex flex-row justify-content-center"
      >
        <h5 style={{ alignSelf: "center" }}>To-Do List</h5>
      </div>
      <div>
        <p>Add a new task in the list</p>
        <div
          style={{ marginBottom: 16 }}
          className="d-flex flex-row justify-content-left"
        >
          <input
            style={{
              backgroundColor: "#3f3f3f",
              color: "white",
              borderRadius: 8,
            }}
            placeholder="Enter the task here"
            className="col-sm-5"
            type="text"
            value={task}
            onChange={(text) => setTask(text.target.value)}
          />
          <button
            type="button"
            style={{
              backgroundColor: "#c620a7",
              color: "white",
              marginLeft: 8,
            }}
            className="btn"
            onClick={() => addTask()}
          >
            Submit
          </button>
        </div>
        <p style={{ marginTop: 32 }}>Added task in to-do list</p>
        <div className="row d-flex justify-content-left">
          {todos?.map((item, index) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "#171717",
                marginBottom: 16,
                position: "relative",
              }}
              className=" d-flex flex-row col-sm-4 tile"
            >
              <span style={{ marginTop: 24 }}>{index + 1}.</span>

              <div
                style={{
                  backgroundColor: item.completed ? "#202020" : "#2f2f2f",
                  margin: 8,
                  borderRadius: 8,
                  width: "100%",
                  boxShadow: "0px 0px 16px #00000095",
                  border: item.completed && "2px solid green",
                }}
              >
                <div
                  style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 16 }}
                >
                  {item.title}
                </div>
                <hr />
                <div
                  style={{ margin: 8 }}
                  className="d-flex flex-row justify-content-between align-items-center"
                >
                  <button
                    type="button"
                    style={{
                      backgroundColor: item.completed ? "#202020" : "#c620a7",
                      color: item.completed ? "#afafaf" : "white",
                    }}
                    className="btn"
                    onClick={() => onBtnClick(item.id)}
                  >
                    {item.completed
                      ? "Mark as incomplete"
                      : "Mark as completed"}
                  </button>
                  <button
                    type="button"
                    style={{ color: "#afafaf" }}
                    className="btn"
                    onClick={() => onDeleteClick(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {item.completed && (
                <div
                  style={{
                    position: "absolute",
                    height: 30,
                    width: 30,
                    backgroundColor: "#46C646",
                    right: 6,
                    top: 20,
                    borderRadius: 30,
                    zIndex: 100,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <span>✔</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
