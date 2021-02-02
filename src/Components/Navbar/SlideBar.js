// import React, { Component, useContext } from "react";
// import "./Navbar.css";
// import M from "materialize-css";
// import { Link } from "react-router-dom";
// import { UserContext } from "../../App";

// class SlideBar extends Component {
//   componentDidMount() {
//     let sidenav = document.querySelector("#slide-out");
//     M.Sidenav.init(sidenav, {});
//   }
//   render() {
//     return (
//       <ul id="slide-out" className="sidenav">
//         ((localStorage.getItem("user"))) ?
//         {
//           <div>
//             <li>
//               <Link
//                 style={{
//                   fontFamily: "Grand Hotel",
//                   fontSize: "large",
//                   marginTop: "5px",
//                 }}
//                 to="/"
//               >
//                 Be-Social
//               </Link>
//             </li>

//             <li>
//               <Link to="/profile">Profile</Link>
//             </li>
//             <li>
//               <Link to="/create">Post</Link>
//             </li>
//           </div>
//         }
//         :
//         {
//           <div>
//             <li>
//               <Link
//                 style={{
//                   fontFamily: "Grand Hotel",
//                   fontSize: "large",
//                   marginTop: "5px",
//                 }}
//                 to="/signup"
//               >
//                 Be-Social
//               </Link>
//             </li>

//             <li>
//               <Link to="/login">Login</Link>
//             </li>

//             <li>
//               <Link to="/signup">Signup</Link>
//             </li>
//           </div>
//         }
//       </ul>
//     );
//   }
// }

// export default SlideBar;
