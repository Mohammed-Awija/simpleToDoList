import React, { useState } from "react";
import './styles.css'
import Button from '@mui/material/Button';
import { Stack, TextField, IconButton, List, ListItem, ButtonGroup } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import EditIcon from '@mui/icons-material/Edit';

export default function Tasks() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const handleAdd = () => {
    if (task.trim() !== "") {
      const newTodos = { completed: false, text: task };
      setTodos([...todos, newTodos]);
      setTask("");
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedTask(todos[index].text);
  };

  const handleEditChange = (e) => {
    setEditedTask(e.target.value);
  };

  const handleEditSave = () => {
    const updatedTodos = [...todos];
    updatedTodos[editIndex].text = editedTask;
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditedTask("");
  };

  const handleDone = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <Stack spacing={1}>
      <h1>New todo list app</h1>
      <TextField
        variant="outlined"
        label="Add task"
        size="small"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <Button variant="contained" onClick={handleAdd}>
        Add
      </Button>
      <List>
        {todos.map(({ text, completed }, index) => (
          <Stack key={index} spacing={2} direction="row" >
            {editIndex === index ? (
              <Stack direction="row">
                <TextField
                  variant="outlined"
                  value={editedTask}
                  onChange={handleEditChange}/>
                <Button
                  size="small"
                  variant="outlined"
                  color="success"
                  onClick={handleEditSave}
                >
                  Save
                </Button>
              </Stack>
            ) : (
              <ListItem
                style={completed ? { textDecoration: "line-through", color: "gray" } : {} }
              >
                {text}
              </ListItem>
            )}
            <ButtonGroup>
              <Button
                sx={{ my: 1 }}
                disableRipple
                disableElevation
                onClick={() => handleDone(index)}
                size="small"
                variant="outlined"
                color="success"
              >
                <DoneAllIcon />
              </Button>
              <Button
              sx={{ my: 1 }}
                size="small"
                variant="outlined"
                color="error"
                onClick={() => handleDelete(index)}
                disableRipple
                disableElevation
              >
                <DeleteForeverIcon />
              </Button>
              {!editIndex && (
                <Button
                sx={{ my: 1 }}
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEdit(index)}
                  disableRipple
                  disableElevation
                >
                  <EditIcon/>
                </Button>
              )}
            </ButtonGroup>
          </Stack>
        ))}
      </List>
    </Stack>
  );
}
