import React, { Component } from "react";
import Iframe from 'react-iframe'
import { url } from "../config"

export default class Distribution extends Component {

    onChange = e => {
        const { value } = e.target
        this.setState({ key: value })
    }

    render() {
        return (
            <>
                <Iframe url={url + "static/heatmap.html"}
                    width="max-width"
                    height="800px"
                    display="initial" />
            </>)
    }
}