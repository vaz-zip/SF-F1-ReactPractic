import React, { useState } from "react";

import "../styles/Header.css";
//import "../styles/media-qeries.css";


function Header(props) {
    let [count, setNewCount] = useState(0);
    const hendleClick = () => {
        setNewCount(count + 1);
        console.log("Hello my Duck!");
    }
    return (
         <header>
            <h>Погода в городах России.</h>
            <button className={ "some-button" } onClick={ hendleClick }>{props.buttonName}, clicked: {count} times</button>
         </header>
         )
}


export default Header;