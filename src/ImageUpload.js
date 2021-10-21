import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import firebase from 'firebase';
import { storage, db } from './firebase';
import './ImageUpload.css';

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        //progress function...a
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //Error function..
        console.log(error);
        alert(error.message);
      },
      () => {
        //complete function...
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post the image inside db
            db.collection('posts').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              username: username,
              imageUrl: url,
            });
            setProgress(0);
            setCaption('');
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      {/* progress info */}
      <progress className='imageupload_progress' value={progress} max="100" />
      {/* Caption input */}
      <input
        type="text"
        placeholder="Enter a caption.."
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      {/* File picker */}
      <input type="file" onChange={handleChange} />
      {/* Post button */}
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;