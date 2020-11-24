import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  CircularProgress,
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
import Boulevard from "../Boulevard.mp4";
import Boulevard2 from "../Boulevard.webm";

export const AppLayout = (props) => {
  const [setLogout] = useMutation(LOGOUT_USER);
  const [openDialog, setOpenDialog] = useState(false);
  const [postSelected, setPostSelected] = useState("");

  const [isLoadingPage, setIsLoadingPage] = useState(false);

  // const { data } = useQuery(USER);

  const { loading, error, data } = useQuery(USER);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  function setLoadingPage(value) {
    setIsLoadingPage(value);
    // console.log(isLoadingPage);
  }
  function shouldOpenDialog(postSelected) {
    setPostSelected(postSelected);
    setOpenDialog(!openDialog);
  }
  return (
    <div className="body-private">
      <div className="bg-video">
        <video className="bg-video__content" autoPlay muted loop>
          <source src={Boulevard} type="video/mp4" />
          <source src={Boulevard2} type="video/webm" />
          Your browser is not supported
        </video>
      </div>
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

        <Grid id="post" className="post__list" item md={5} sm={6} xs={12}>
          <h1>List</h1>
          <Posts
            infoUser={data}
            setLoadingPage={setLoadingPage}
            shouldOpenDialog={(postSelected) => shouldOpenDialog(postSelected)}
          />
          {isLoadingPage ? (
            <div className="loading">
              <CircularProgress />
            </div>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </div>
  );
};
