import React, { useEffect, useState, useContext } from "react";
import "./Profile.css";
import { UserContext } from "../../App";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [myPics, setMyPics] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    setTimeout(() => {
      fetch("https://evening-plateau-36916.herokuapp.com/api/v1/posts/")
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          console.log(data.data.myPosts);
          setMyPics(data.data.myPosts);
        });
    }, 5000);
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredPics = myPics.filter((pics) =>
    pics.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="parent">
      <div className="">
        <h3 className="center">Search your pic</h3>
        <form className="center">
          <input type="text" onChange={handleChange} placeholder="Search" />
        </form>
      </div>
      <div
        className="parent2"
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid black",
          gridTemplateColumns: "30% 70%",
        }}
      >
        <div style={{ display: "flex" }} className="">
          <div className="para">
            <p className="up">Name:</p>
            <p className="down">{state ? state.name : "Loading"}</p>
          </div>
          <div className="para">
            <p className="up">Posts:</p>
            <p className="down">{filteredPics.length}</p>
          </div>
        </div>
      </div>
      <div className="gallary">
        {filteredPics.map((item) => {
          return (
            <div className="item">
              <img
                style={{ width: "100%" }}
                key={item._id}
                alt={item.name}
                src={item.photo}
              />
              <h3
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "bold",
                  marginTop: "0px",
                  paddingTop: "0px",
                  marginBottom: "10px",
                }}
              >
                {item.name}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
