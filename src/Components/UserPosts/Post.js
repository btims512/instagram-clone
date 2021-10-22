import React, { useState, useEffect } from "react";
import "./Post.css";
import stories from "../../img/stories.png";
import firebase from "firebase";
import { db } from "../firebase/firebase";
import Avatar from "@material-ui/core/Avatar";

function Post(props) {
  const { postId, user, username, caption, imageUrl } = props;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComments("");
  };
  return (
    <div src={stories} className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt={username}
          src={username}
        />
        <h3>{username}</h3>
      </div>

      {/* image */}
      <img className="post_image" src={imageUrl} alt="post" />
      {/* username + caption */}
      <h4 className="post_text">
        <strong>{username}</strong>
        {caption}
      </h4>
      <div className="post_comments">
        {comments &&
          comments.map((comment) => (
            <p>
              <strong>{comment.username}</strong> {comment.text}
            </p>
          ))}
      </div>

      {user && (
        <form className="post_commentBox">
          <input
            className="post_input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post_button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
