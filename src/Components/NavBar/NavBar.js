import React, { useState, useEffect } from "react";
import "./App.css";
import instaLogo from "./img/insta.png";
import SearchBar from "../SearchBar/SearchBar";
import Post from "../UserPosts/Post";
import { db, auth } from "../firebase/firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import ImageUpload from "../ImageUpload/ImageUpload";
import InstagramEmbed from "react-instagram-embed";
import Avatar from "@material-ui/core/Avatar";

function NavBar() {
  <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
    <div style={modalStyle} className={classes.paper}>
      <form className="app_signup">
        <center>
          <img className="app_headerImg" src={instaLogo} alt="insta" />
        </center>
        <Input
          placeholder="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" onClick={signIn}>
          Sign In
        </Button>
      </form>
    </div>
  </Modal>;

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
  };

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="app_header">
      <img className="app_headerImg" src={instaLogo} alt="insta" />
      <SearchBar />
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <div className="login_container">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
      <NavBarIcons>
        <Avatar
          className="post_avatar"
          alt={username}
          src="https://scontent-lax3-1.xx.fbcdn.net/v/t1.6435-9/242211667_10226308225434976_6299101464181220180_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=G60D-ALJlRwAX9eCl20&_nc_ht=scontent-lax3-1.xx&oh=2871addce75749f9890118afa72fd743&oe=6195EF31"
        />
      </NavBarIcons>
    </div>
  );
}

export default NavBar;
