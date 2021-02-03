import React, { useState, useEffect } from "react";
import "./CreatePost.css";
import { useHistory } from "react-router-dom";
import M from "materialize-css";

const CreatePost = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      fetch(
        "https://evening-plateau-36916.herokuapp.com/api/v1/posts/uploadPost",
        {
          method: "post",
          headers: new Headers({
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            name,
            photo: url,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            M.toast({
              html: "Post Created successfully}",
              classes: "#43a047 green darken-1",
            });
            history.push("/");
          } else if (data.status === "Fail" || "error") {
            if (data) {
              M.toast({
                html: "Something went wrong",
                classes: "#c62828 red darken-1",
              });
            }
          } else {
            M.toast({
              html: "Please check your network connection",
              classes: "#c62828 red darken-1",
            });
          }
        });
    }
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Be-Social");
    data.append("cloud_name", "aaditya-dhanraj");
    fetch("https://api.cloudinary.com/v1_1/aaditya-dhanraj/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.secure_url);
        if (!url) {
          // M.toast({
          //   html: ,
          //   classes: "#c62828 red darken-1",
          // });
          history.push("/");
        }
      });
  };

  return (
    <div
      className="card input-filled"
      style={{
        margin: "26px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontFamily: "Grand Hotel,cursive" }}>Create Memories</h2>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn #5c6bc0 indigo lighten">
          <span>Upload Photo</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn #5c6bc0 indigo lighten"
        type="submit"
        name="action"
        onClick={() => postDetails()}
      >
        Submit
      </button>
    </div>
  );
};
export default CreatePost;
