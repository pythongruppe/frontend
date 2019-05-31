import React, { Component } from "react";
import { url } from '../config'

export default class Search extends Component {

    state = {
        parameters: {},
        statistics: null,
        results: [],
        count: null
    }

    async componentDidMount() {
        const response = await fetch(url + 'filter', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: '{ "query": { "zip_codes": [3460] } }' })
        const { statistics, results, count } = await response.json()
        this.setState({ statistics, results, count })
    }

    render() {

        const { results } = this.state;

        console.log(this.state)

        return (

            <div id='search-page'>
                <div id="search-page-filter">

                </div>
                <div id="search-page-results">
                    {results.length > 1 && <table>
                        <thead>
                            <tr>
                                {Object.keys(results[1]).map(key =>
                                    <th>{key}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(row =>
                                <tr>
                                    {Object.keys(row).map(key =>
                                        <td>{row[key]}</td>
                                    )}
                                </tr>
                            )}
                        </tbody>
                    </table>}
                </div>
            </div>
        )
    }
}