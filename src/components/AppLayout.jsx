import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { ADD_POST, LOGOUT_USER } from "../graphqls/mutations";
import { USER } from "../graphqls/querys";
import auth from "./auth";
import Posts from "./Posts/Posts";

export const AppLayout = (props) => {
  const [setLogout] = useMutation(LOGOUT_USER);
  const [addPostCt] = useMutation(ADD_POST);
  const [openFormCmt, setOpenFormCmt] = useState(false);
  const [post, setPost] = useState("nothing");
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  // const { data } = useQuery(USER);

  const { loading, error, data } = useQuery(USER);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;
  function handleChange(event) {
    // console.log(event.target.value);
    if (event.target.name === "post") setPost(event.target.value);
  }

  function setLoadingPage() {
    setIsLoadingPage(true);
    // console.log(isLoadingPage);
  }

  function addPost() {
    console.log(post);
    // infoUser();
    addPostCt({ variables: { post: post } }).then((res) => console.log(res));
  }

  return (
    <div className="body-private">
      <h4
        className="p4"
        // style={{ margin: "1em" }}
      >
        <small className="text-muted" style={{ paddingRight: "10px" }}>
          Well come
        </small>
        {data.me.profileName}
        🙊🐤🦑🐙🐢🦂🕸🕷🦗🦗🦟🐜🐞🦋🐛🐴🐺🐕🐩🐲
      </h4>
      <div className="btn-action">
        <button
          className="btn btn-info btn-round  ml-4 mb-2"
          onClick={() => {
            setLogout().then((res) => {
              console.log(res);
              auth.logout(() => {
                props.history.push("/");
              });
              localStorage.removeItem("token");
            });
          }}
        >
          Logout
        </button>
        <button
          className="btn btn-info btn-round ml-4"
          onClick={() => setOpenFormCmt(true)}
        >
          Add Post
        </button>
      </div>

      <Grid container spacing={2} style={{ minHeight: "1000px" }}>
        <Grid item md={3} sm={2} xs={12}>
          <Dialog
            open={openFormCmt}
            onClose={() => {
              setOpenFormCmt(false);
            }}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              {data.me.profileName}
            </DialogTitle>
            <DialogContent style={{ minWidth: "600px" }}>
              <TextField
                name="post"
                multiline
                // autoFocus
                margin="dense"
                id="name"
                label="What's on your mind?"
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
                  setOpenFormCmt(false);
                }}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  addPost();
                  setOpenFormCmt(false);
                }}
                color="primary"
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>

        <Grid id="post" item md={5} sm={6} xs={12}>
          <h1>List</h1>
          <Posts infoUser={data} setLoadingPage={setLoadingPage} />
          {/* {isLoadingPage ? <h3>Loading</h3> : ""} */}
        </Grid>
      </Grid>
    </div>
  );
};
