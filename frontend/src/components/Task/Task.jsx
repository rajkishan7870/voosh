import React, { useState, useEffect } from "react";
import style from "./Task.module.css";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { interaction_data } from "../../Recoil/interaction";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Task(props) {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [details, setDetails] = useState({});
  const [openView, setOpenView] = useState(false);
  const [editDetails, setEditDetails] = useState();
  const[draggedTask, setDraggedTask] = useRecoilState(interaction_data)

  const handleClose = () => {
    setOpenEdit(false);
    setOpenView(false);
  };
  const handleDelete = (data) => {
    axios
      .delete("/api/interaction/del", { data })
      .then((res) => {
        console.log(res);
        props.handleTaskChange();
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (ele) => {
    setOpenEdit(true);
    setDetails(ele);
    setEditDetails({
      _id: ele?._id,
    });
  };

  useEffect(() => {
    console.log(details);
  }, [details]);

  useEffect(() => {
    console.log(editDetails);
  }, [editDetails]);

  const handleViewDetails = (ele) => {
    setOpenView(true);
    console.log(ele);
    setDetails(ele);
  };

  const handleEditSave = () => {
    axios
      .patch("/api/interaction/update", editDetails)
      .then((res) => {
        console.log(res);
        props.handleTaskChange();
        setOpenEdit(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDrag = (e, ele) => {
    const draggedTaskData = { id: ele?._id };
    setDraggedTask(draggedTaskData)
  };

  console.log(props.task)


  return (
    <>
      {props.task &&
        props?.task.map((ele, index) => {
          return (
            <div
              className={style.taskParent}
              key={index}
              draggable
              onDrag={(e) => handleDrag(e, ele)}
            >
              <h2>{ele.title}</h2>
              <div className={style.descDiv}>{ele.description}</div>
              <div>Created at: {ele.createdAt}</div>
              <div className={style.btnColl}>
                <button
                  className={style.delBtn}
                  onClick={() => handleDelete(ele)}
                >
                  Delete
                </button>
                <React.Fragment>
                  <button
                    className={style.editBtn}
                    onClick={() => handleEdit(ele)}
                  >
                    Edit
                  </button>
                  <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={openEdit}
                    PaperProps={{
                      sx: {
                        minWidth: "50%",
                        minHeight: "70vh",
                      },
                    }}
                  >
                    <DialogTitle
                      sx={{ m: 0, p: 2 }}
                      id="customized-dialog-title"
                    >
                      Edit Task
                    </DialogTitle>
                    <IconButton
                      aria-label="close"
                      onClick={handleClose}
                      sx={(theme) => ({
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                      })}
                    >
                      <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                      <Typography gutterBottom>Title</Typography>
                      <TextField
                        fullWidth
                        variant="standard"
                        defaultValue={details?.title}
                        name="title"
                        onChange={(e) => {
                          setEditDetails({
                            ...editDetails,
                            [e.target.name]: e.target.value,
                          });
                        }}
                      />
                      <Typography gutterBottom>Description</Typography>
                      <TextField
                        fullWidth
                        variant="standard"
                        name="description"
                        defaultValue={details?.description}
                        onChange={(e) => {
                          setEditDetails({
                            ...editDetails,
                            [e.target.name]: e.target.value,
                          });
                        }}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button autoFocus onClick={handleEditSave}>
                        Save
                      </Button>
                    </DialogActions>
                  </BootstrapDialog>
                </React.Fragment>
                <React.Fragment>
                  <button
                    className={style.viewBtn}
                    onClick={() => handleViewDetails(ele)}
                  >
                    View Details
                  </button>
                  <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={openView}
                    PaperProps={{
                      sx: {
                        minWidth: "50%",
                        minHeight: "70vh",
                      },
                    }}
                  >
                    <DialogTitle
                      sx={{ m: 0, p: 2 }}
                      id="customized-dialog-title"
                    >
                      Task Details
                    </DialogTitle>
                    <DialogContent dividers>
                      <Typography gutterBottom>
                        Title: {details?.title}
                      </Typography>
                      <Typography gutterBottom>
                        Description: {details?.description}
                      </Typography>
                      <Typography gutterBottom>
                        Created At: {details?.createdAt}
                      </Typography>
                    </DialogContent>
                    <DialogActions>
                      <Button autoFocus onClick={handleClose}>
                        Close
                      </Button>
                    </DialogActions>
                  </BootstrapDialog>
                </React.Fragment>
              </div>
            </div>
          );
        })}
    </>
  );
}
