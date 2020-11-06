import React, { useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { UPDATE_COMMENT, DELETE_COMMENT } from "../../graphqls/mutations";
import { useMutation } from "@apollo/client";

Comment.propTypes = {};

function Comment(props) {
  const [updateComment] = useMutation(UPDATE_COMMENT);
  const [deleteComment] = useMutation(DELETE_COMMENT);

  const [updateCommentContent, setUpdateCommentContent] = useState(
    props.comment.content
  );
  const [isEdit, setIsEdit] = useState(false);
  // console.log(props.comment._id);

  function handleEditComment(id) {
    if (isEdit === true) {
      updateComment({
        variables: {
          commentID: id,
          newCommentContent: updateCommentContent,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
    setIsEdit(!isEdit);
  }

  function handleChangeEditComment(event) {
    // console.log(event.target.value);
    setUpdateCommentContent(event.target.value);
  }

  function handleDeleteComment(cmt) {
    const email = cmt.owner.email;
    if (checkDeleteComment(email)) {
      deleteComment({
        variables: { commentID: cmt._id, postID: props.postID },
      })
        .then((res) => {
          if (res.data.deleteComment.isSuccess === true) {
            alert("Deleted successfully");
            // confirm("adgaj");         console.log("dakjs");
          }
          // var a = confirm("xoa");
          // confirm("dghafsdhgas")

          // if window.confirm('dads')
          //   console.log("oke")
          // else
          // console.log("oke")
        })
        .catch((err) => console.log(err));
    } else {
      alert("Fail");
    }
  }

  function checkDeleteComment(email) {
    var isDeleteCmt = false;
    // console.log("nguoi cmt: ", email); //email: email cua nguoi cmt
    // console.log("nguoi add post", props.infoUserPost); //props.infoUserPost: email cua nguoi add post
    // console.log("nguoi Login", props.infoUser.me.email); //props.infoUser.me.email: email cua nguoi Login

    //xoa cmt tren post cua minh
    if (props.infoUserPost === props.infoUser.me.email) {
      return (isDeleteCmt = true);
    }
    //xoa cmt cua minh cmt
    else if (props.infoUser.me.email === email) {
      return (isDeleteCmt = true);
    }
    return isDeleteCmt;
  }

  return (
    <div>
      <li className="list-group-item">
        <span className="circle">
          <img
            style={{ width: "34px" }}
            src="data:image/png;base64,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"
            alt="Alps"
            className="post__img-user"
          />
        </span>

        <span className="title">
          <a>{props.comment.owner.profileName}</a>
          {/* h:mm:ss a, dddd, MMMM Do YYYY */}
          <Moment format="h:mm:ss a, dddd">{props.comment.createdAt}</Moment>
          {!isEdit ? (
            <p>{props.comment.content}</p>
          ) : (
            <input
              onChange={(event) => handleChangeEditComment(event)}
              className="comment__content"
              value={updateCommentContent}
              // onFocus={true}
              autoFocus={true}
            ></input>
          )}
        </span>

        <ul className="comment__actions">
          <li>
            {props.comment.owner.email === props.infoUser.me.email && (
              <p
                className="edit"
                onClick={() => {
                  handleEditComment(props.comment._id);
                }}
              >
                {!isEdit ? "Edit" : "Ok"}
              </p>
            )}
            {checkDeleteComment(props.comment.owner.email) && (
              <p
                className="edit"
                onClick={() => {
                  handleDeleteComment(props.comment);
                }}
              >
                Delete
              </p>
            )}
          </li>
        </ul>
      </li>
    </div>
  );
}

export default Comment;
