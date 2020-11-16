import { useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { ADD_POST, UPDATE_POST } from "../../graphqls/mutations";

PostDialog.propTypes = {};

function PostDialog(props) {
  const [addPostCt] = useMutation(ADD_POST);
  const [updatePostCt] = useMutation(UPDATE_POST);
  const [post, setPost] = useState(() => {
    return props.postSelected ? props.postSelected.content : "nothing";
  });

  function handleChange(event) {
    if (event.target.name === "post") setPost(event.target.value);
  }

  function addPost() {
    addPostCt({ variables: { post: post } }).then((res) => console.log(res));
  }

  function updatePost() {
    updatePostCt({
      variables: { postID: props.postSelected._id, newPostContent: post },
    }).then((res) => {
      console.log(res);
    });
    console.log("update");
    console.log(props);
  }

  function checkAddOrUpdate() {
    if (props.postSelected._id) {
      updatePost();
    } else {
      addPost();
    }
  }

  return (
    <div>
      <Dialog
        open={props.openDialog}
        onClose={() => {
          props.shouldOpenDialog();
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{props.infoUser}</DialogTitle>
        <DialogContent style={{ minWidth: "600px" }}>
          <TextField
            defaultValue={props.postSelected ? props.postSelected.content : ""}
            name="post"
            multiline
            autoFocus
            margin="dense"
            id="name"
            label={!props.postSelected && "What's on your mind?"}
            type="email"
            fullWidth
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.shouldOpenDialog();
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              checkAddOrUpdate();
              props.shouldOpenDialog();
            }}
            color="primary"
          >
            {props.postSelected ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PostDialog;
