import { gql, useMutation } from "@apollo/client";
import React, { useState, useRef, useEffect } from "react";
import Moment from "react-moment";
import { ADD_COMMENT, LIKE_POST } from "../../graphqls/mutations";
import Comment from "./Comment";

function PostItem(props) {
  const [addComment] = useMutation(ADD_COMMENT);
  const [setLikePost] = useMutation(LIKE_POST);
  const [commentContent, setCommentContent] = useState("");
  // const [openComment,setOpenComment] = useState(true)
  const [postID, setPostID] = useState("");
  const infoUserPost = props.post.owner.email;

  // const [isLiked, setIsLiked] = useState(false);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

  function addComments(e) {
    e.preventDefault();
    addComment({
      variables: { commentContent: commentContent, postID: postID },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    setCommentContent("");
  }

  function handleChange(event) {
    setPostID(props.post._id);
    setCommentContent(event.target.value);
  }

  function handleSetLike() {
    setLikePost({ variables: { postID: props.post._id } }).then((res) =>
      console.log(res)
    );
  }

  // function checkDeleteComment(){
  //   var result = false;

  //   props.post.listOfLike.forEach((list, index) => {
  //     // console.log(list._id);
  //     if (list.email === props.infoUser.me.email) return (result = true);
  //   });
  //   return result;
  // }

  function checkLiked() {
    var result = false;
    props.post.listOfLike.forEach((list, index) => {
      // console.log(list._id);
      if (list.email === props.infoUser.me.email) return (result = true);
    });
    return result;
  }

  // console.log(infoUserPost);
  // console.log(props);

  // function checkOpenComment(){
  //   if(openComment === true){
  //     setOpenComment(false)
  //   }
  //   else{
  //     setOpenComment(true)
  //   }
  // }
  
  return (
    <div>
      <h6 style={{ marginBottom: "1em" }} >
        {/* Comment Box */}
        <small className="text-muted">
          {/* with Material Design Guidelines */}
        </small>
      </h6>

      <div className="card paper">
        <div>
          <span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/User_icon_1.svg"
              alt="Alps"
              className="post__img-user"
            />
            <span className="post__title">{props.post.owner.profileName}</span>
            <Moment
              className="post__title-time "
              format="h:mm:ss a, dddd, MMMM"
            >
              {props.post.createdAt}
            </Moment>
          </span>
        </div>
        <div className="post__content">
          <h6>{props.post.content}</h6>
        </div>
        <hr></hr>
        <details id={`details-${props.index}`} >
          <summary style={{ padding: "1em" }}>
            {props.post.comments} Comments
          </summary>

          <ul className="list-group">
            {props.post.listOfComment.map((comment, index) => (
              <Comment
                key={index}
                comment={comment}
                infoUser={props.infoUser}
                infoUserPost={infoUserPost}
                postID={props.post._id}
              ></Comment>
            ))}
          </ul>
        </details>
        <form
          onSubmit={(event) => {
            addComments(event);
          }}
        >
          <fieldset className="form-group">
            <input
              value={commentContent}
              name="comment"
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Add a comment"
              onChange={(event) => handleChange(event)}
              onClick={()=>
                document.getElementById(`details-${props.index}`).open = true
              }
              // onFocus={()=> 
              //   document.getElementById("details").open = true
              // }
            />
          </fieldset>
          <button
            type="submit"
            // onClick={() => addComments()}
            className="btn btn-sm btn-success mr-2"
          >
            Comment
          </button>
          {/* <button type="button" className="btn btn-sm btn-secondary">
            Cancel
          </button> */}
          <span className="post__action" onClick={() => handleSetLike()}>
            <span>{props.post.likes} likes</span>
            {!checkLiked() ? (
              <i className="post__like-icon-empty far fa-heart"></i>
            ) : (
              <i className="post__like-icon-fill fas fa-heart"></i>
            )}
          </span>
        </form>
      </div>
    </div>
  );
}

export default PostItem;
