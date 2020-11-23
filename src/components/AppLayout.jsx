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
import PostDialog from "./Posts/PostDialog";

export const AppLayout = (props) => {
  const [setLogout] = useMutation(LOGOUT_USER);
  const [openDialog, setOpenDialog] = useState(false);
  const [postSelected, setPostSelected] = useState("");

  const [isLoadingPage, setIsLoadingPage] = useState(false);

  // const { data } = useQuery(USER);

  const { loading, error, data } = useQuery(USER);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  function setLoadingPage() {
    setIsLoadingPage(true);
    // console.log(isLoadingPage);
  }
  function shouldOpenDialog(postSelected) {
    setPostSelected(postSelected);
    setOpenDialog(!openDialog);
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
      <div className="nav__action">
        <button className="btn-action ml-4" onClick={() => setOpenDialog(true)}>
          Add Post
        </button>
        <button
          className="btn-action   mr-4"
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
      </div>

      <Grid container spacing={2} style={{ minHeight: "1000px" }}>
        <Grid item md={3} sm={2} xs={12}>
          {openDialog && (
            <PostDialog
              infoUser={data.me.profileName}
              shouldOpenDialog={shouldOpenDialog}
              openDialog={openDialog}
              postSelected={postSelected}
            />
          )}
        </Grid>

        <Grid id="post" item md={5} sm={6} xs={12}>
          <h1>List</h1>
          <Posts
            infoUser={data}
            setLoadingPage={setLoadingPage}
            shouldOpenDialog={(postSelected) => shouldOpenDialog(postSelected)}
          />
          {/* {isLoadingPage ? <h3>Loading</h3> : ""} */}
        </Grid>
      </Grid>
    </div>
  );
};
