import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import "./Login.css";
import { UserContext } from "../../App";

const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { state, dispatch } = useContext(UserContext);

  const sendDataSignup = () => {
    fetch("https://evening-plateau-36916.herokuapp.com/api/v1/users/signup", {
      method: "post",
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        name,
        email,
        password,
        passwordConfirm,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          M.toast({
            html: "Signed-Up successfully}",
            classes: "#43a047 green darken-1",
          });
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.data.user));
          dispatch({ type: "USER", payload: data.data.user });
          history.push("/");
        } else if (data.status === "error") {
          if (data.error.errors.name) {
            M.toast({
              html: data.error.errors.name.message,
              classes: "#c62828 red darken-1",
            });
          }
          if (data.error.errors.email) {
            M.toast({
              html: data.error.errors.email.message,
              classes: "#c62828 red darken-1",
            });
          }
          if (data.error.errors.password) {
            M.toast({
              html: data.error.errors.password.message,
              classes: "#c62828 red darken-1",
            });
          }
          if (data.error.errors.passwordConfirm) {
            M.toast({
              html: data.error.errors.passwordConfirm.message,
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
  };

  return (
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2 className="lo">Be-Social</h2>
        <input
          type="text"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="password Confirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button
          className="btn #5c6bc0 indigo lighten"
          type="submit"
          name="action"
          onClick={() => sendDataSignup()}
        >
          Sign up
        </button>
        <h6 className="underline">
          <Link to="/login">Already have an account ?</Link>
        </h6>
      </div>
    </div>
  );
};

export default Signup;
