import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomeComponent } from "./components/HomeComponent"

class Application extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={HomeComponent} exact />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

render(<Application />, window.document.getElementById("app"));