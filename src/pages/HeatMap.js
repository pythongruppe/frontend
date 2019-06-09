import React, { Component } from "react";
import Iframe from 'react-iframe'
import { url } from "../config"

export default class HeatMap extends Component {
    render() {
        return (<Iframe url={url + "static/heatmap.html"}
            width="max-width"
            height="800px"
            display="initial"
            position="relative" />)
    }
}