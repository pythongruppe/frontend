import React, { Component } from "react";
import { url } from "../config"

export default class Graphs extends Component {

    state = {
        distributionGraphs: []
    }

    async componentDidMount() {
        const response = await fetch(url + "graphs")
        const graphs = await response.json()
        this.setState({ distributionGraphs: graphs })
    }

    render() {
        return (
            <div>
                {this.state.distributionGraphs.map(g =>
                    <div>
                        <p>{g.name}</p>
                        <img src={g.src} />
                    </div>
                )}
            </div>
        )
    }
}