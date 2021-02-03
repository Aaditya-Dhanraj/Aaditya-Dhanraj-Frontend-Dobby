import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import M from "materialize-css";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendDataLogin = () => {
    fetch("https://evening-plateau-36916.herokuapp.com/api/v1/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data.user);
        if (data.status === "success") {
          M.toast({
            html: "Logged-In successfully}",
            classes: "#43a047 green darken-1",
          });
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.data.user));
          dispatch({ type: "USER", payload: data.data.user });
          history.push("/");
        } else if (data.status === "Fail") {
          if (data.error) {
            M.toast({
              html: data.message,
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
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn #5c6bc0 indigo lighten"
          type="submit"
          name="action"
          onClick={() => sendDataLogin()}
        >
          Login
        </button>
        <h6 className="underline">
          <Link to="/signup">Don't have an account ?</Link>
        </h6>
      </div>
    </div>
  );
};

export default Login;
