import React, { useState, useEffect } from "react";
import "./Post.css";
import stories from "../../img/stories.png";
import firebase from "firebase";
import { db } from "../firebase/firebase";
import Avatar from "@material-ui/core/Avatar";
import NavBarIcons from "../NavBar/NavBarIcons";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";

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
        <Avatar className="post_avatar" alt={username} src={username} />
        <h3>{username}</h3>{" "}
        <BsThreeDots style={{ cursor: "pointer", paddingLeft: "70%" }} />
      </div>
      {/* <MoreHorizIcon style={{ display: "flex", justifyContent: "center" }} /> */}
      {/* image */}
      <img className="post_image" src={imageUrl} alt="post" />
      {/* username + caption */}
      <NavBarIcons>
        <FaRegHeart size="25" style={{ padding: "14px" }} />
        <FaRegComment size="25" style={{ padding: "14px" }} />
        <IoPaperPlaneOutline size="28" style={{ padding: "12px" }} />
      </NavBarIcons>{" "}
      <h4 style={{ paddingLeft: "20px", fontWeight: "600" }}>423 likes</h4>
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
