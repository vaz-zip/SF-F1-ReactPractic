import React, { Component } from "react";

import Forecast from "./Forecast";

import "../styles/Main.css";



class Main extends Component {
    render() {
        return (
            <main>
                <Forecast />
            </main>
        )
    }
}


export default Main;