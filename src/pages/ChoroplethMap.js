import React, { Component } from "react";
import Iframe from 'react-iframe'
import { url } from "../config"

export default class ChoroplethMap extends Component {

    state = {
        key: 'cash_price'
    }

    onChange = e => {
        const { value } = e.target
        this.setState({ key: value })
    }

    render() {
        return (
            <>
                <select onChange={this.onChange} defaultChecked={this.state.key}>
                    <option>cash_price</option>
                    <option>area_basement</option>
                    <option>area_estate</option>
                    <option>area_property</option>
                    <option>rooms</option>
                    <option>year</option>
                </select>
                <Iframe url={url + "static/choropleth_" + this.state.key + ".html"}
                    width="max-width"
                    height="800px"
                    display="initial" />
            </>)
    }
}