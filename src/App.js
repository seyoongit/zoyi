import React, { Component } from "react";
import { TopNav, Content, ModalPage } from "components/";

export default class App extends Component {
    render() {
        return (
            <>
                <ModalPage />
                <TopNav />
                <Content />
            </>
        ); 
    }
}
