import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";

function Post({ username, caption, imageUrl }) {
  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt="pinche_bejammin avatar"
          src="https://scontent-lax3-1.xx.fbcdn.net/v/t1.6435-9/242211667_10226308225434976_6299101464181220180_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=G60D-ALJlRwAX9eCl20&_nc_ht=scontent-lax3-1.xx&oh=2871addce75749f9890118afa72fd743&oe=6195EF31"
        />
        <h3>{username}</h3>
      </div>
      <img className="post_image" src={imageUrl} alt="" />

      <h4 className="post_text">
        {" "}
        <strong>{username}</strong>
        {caption}
      </h4>
    </div>
  );
}

export default Post;
