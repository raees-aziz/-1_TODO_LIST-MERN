import React, { useState } from "react";
import { Box, Button, Modal, Input, Stack } from "@mui/material";
import { Edit } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditModal({ data, tasks, setTasks }) {
  const [open, setOpen] = useState(false);
  const [inputTitle, setInputTitle] = useState(data.title);
  const [inputTask, setInputTask] = useState(data.task);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleTitleChange = (e) => setInputTitle(e.target.value);
  const handleTaskChange = (e) => setInputTask(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTasks = tasks.map((task) =>
      task.id === data.id
        ? { ...task, title: inputTitle, task: inputTask }
        : task
    );
    setTasks(updatedTasks);
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <Edit color="success" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-center text-2xl font-bold mb-4">
            Edit your To Do List
          </h1>
          <Stack direction="column" spacing={2}>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <Input
                className="my-4"
                required
                color="success"
                placeholder="Update Title"
                value={inputTitle}
                onChange={handleTitleChange}
              />
              <Input
                className="my-4"
                required
                color="success"
                placeholder="Update Task"
                value={inputTask}
                onChange={handleTaskChange}
              />
              <Button type="submit" color="success" variant="contained">
                Confirm
              </Button>
              <Button
                variant="contained"
                onClick={handleClose}
                style={{ backgroundColor: "#EDEADE", color: "black" }}
              >
                Cancel
              </Button>
            </form>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
