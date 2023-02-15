import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Warning from "./Warning";

const root = ReactDOM.createRoot(document.getElementById("root"));

window.onload = () => {
    if (window.innerWidth >= 700) {
        root.render(<App />);
    } else {
        root.render(<Warning />);
    } 
}

// window.onresize = () => {
//     if (window.innerWidth >= 1440) {
//         root.render(<App />);
//     } else {
//         root.render(<Warning />);
//     } 
// }
