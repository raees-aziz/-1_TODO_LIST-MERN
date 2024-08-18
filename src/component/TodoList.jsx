import React, { useState } from "react";
import EditModal from "./EditModal";
import { Delete } from "@mui/icons-material";
import { red, green, blue } from "@mui/material/colors";
import {
  Box,
  Button,
  Stack,
  TextField,
  Checkbox,
  Typography,
} from "@mui/material";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function TodoList() {
  const [text, setText] = useState({ title: "", task: "" });
  const [tasks, setTasks] = useState([
    { id: 1, title: "Home Work", task: "Do Home at 5:00 pm", status: true },
    {
      id: 2,
      title: "GYM and Training",
      task: "10 set Push-Up and 10 set Shoulder",
      status: false,
    },
  ]);

  const handleChange = (e) => {
    setText({
      ...text,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.title.trim() && text.task.trim()) {
      setTasks([...tasks, { ...text, id: Date.now(), status: false }]);
      setText({ title: "", task: "" });
    }
  };

  const handleDelete = (id) => {
    const deleteTask = tasks.filter((task) => task.id !== id);
    setTasks(deleteTask);
  };

  const handleCheck = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: !task.status } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <Box className="bg-slate-500 lg:w-3/4 md:w-3/4 sm:w-full p-6 m-auto flex lg:flex-row sm:flex-col">
      <Box className="bg-red-300 h-[300px] rounded-lg sm:w-full mb-4 lg:w-1/4 p-4 border-1 border-black flex flex-col">
        <h1 className="text-center font-bold text-2xl my-2">TO DO LIST</h1>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              name="title"
              value={text.title}
              onChange={handleChange}
              id="outlined-title"
              label="Title"
              variant="outlined"
            />
            <TextField
              name="task"
              value={text.task}
              onChange={handleChange}
              id="outlined-task"
              label="Task"
              variant="outlined"
            />
            <Button type="submit" variant="contained">
              +
            </Button>
          </Stack>
        </form>
      </Box>
      <Box className="flex-1 mx-2 p-3 rounded-lg border-2 border-green-400 overflow-auto">
        <Box className="flex flex-col justify-center items-center">
          {tasks &&
            tasks.map((data) => (
              <div
                className="bg-pink-300 w-full my-2 py-2 px-4 rounded-lg flex justify-between"
                key={data.id}
              >
                <div>
                  <div
                    className="font-bold"
                    style={{
                      textDecoration: data.status ? "line-through" : "none",
                    }}
                  >
                    {data.title}
                  </div>
                  <div
                    className="break-all "
                    style={{
                      textDecoration: data.status ? "line-through" : "none",
                    }}
                  >
                    {data.task}
                  </div>
                </div>
                <div className="font-bold cursor-pointer">
                  <div className="bg-yellow- flex mt-1 h-[50px]">
                    <Checkbox
                      {...label}
                      checked={data.status}
                      onClick={() => handleCheck(data.id)}
                      sx={{
                        color: "blue",
                        "&.Mui-checked": {
                          color: blue[800],
                        },
                      }}
                    />
                    <Button>
                      <EditModal
                        data={data}
                        tasks={tasks}
                        setTasks={setTasks}
                      />
                    </Button>
                    <Button
                      variant="filled"
                      onClick={() => {
                        handleDelete(data.id);
                      }}
                    >
                      <Delete sx={{ color: red[400] }} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </Box>
      </Box>
    </Box>
  );
}

export default TodoList;
