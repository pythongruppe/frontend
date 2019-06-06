import React, { Component } from "react";
import { url } from '../config'

export default class Search extends Component {

    state = {
        propertyTypes: [],
        parameters: {},
        statistics: null,
        results: [],
        count: 0,
        currentPage: 1,
        currentPageInput: 1
    }

    async componentDidMount() {
        const { statistics, results, count } = await this.fetchResults(1)
        const propertyTypes = await this.fetchPropertyTypes()
        this.setState({ statistics, results, count, propertyTypes })
    }

    async fetchResults(page) {
        const response = await fetch(url + 'filter?page=' + page, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: this.createFilterBody()
        })
        return response.json()
    }

    page = async (page) => {
        const { statistics, results, count } = await this.fetchResults(page)
        this.setState({ statistics, results, count, currentPage: page, currentPageInput: page })
    }

    createFilterBody = () => {

        const result = {}
        const parameters = Object.assign({}, this.state.parameters)

        if (parameters['zip_codes'])
            parameters['zip_codes'] = parameters['zip_codes'].split(',').map(e =>
                parseInt(e.trim())
            )

        Object.keys(parameters).forEach(k => {
            if (k == 'zip_codes')
                result[k] = parameters[k]
            else
                result[k] = parseInt(parameters[k])
        })

        return JSON.stringify({ query: result })
    }

    async fetchPropertyTypes() {
        const response = await fetch(url + 'property-types')
        return response.json()
    }

    onFilterParameterChange = (e) => {
        const { name, value } = e.target
        this.setState(prev => ({
            parameters: {
                ...prev.parameters,
                [name]: value
            }
        }))
    }

    changePage = (e) => {
        const target = e.target;
        e.preventDefault()
        this.page(target.elements['page'].value)
    }

    createPagination = () => {
        const pages = Math.ceil(this.state.count / 50)

        return (<div className="pagination">
            <form onSubmit={(e) => this.changePage(e)}>
                <input name="page" type="number" step="1" min={1} max={pages} value={this.state.currentPageInput} onChange={(e) => this.setState({ currentPageInput: parseInt(e.target.value) })} />
                <span> of <span style={{fontWeight: "bold"}}>{pages}</span> pages</span>
            </form>
        </div>)
    }

    render() {

        const { results, statistics } = this.state;

        return (

            <div id='search-page'>
                <h1>Filter properties</h1>
                <div id="search-page-filter" className="pad-bottom">
                    <table>
                        <tbody>
                            <tr>
                                <td>area_basement</td>
                                <td><input type="number" onChange={this.onFilterParameterChange} name="area_basement_min" placeholder="min. estate area" /></td>
                                <td><input type="number" onChange={this.onFilterParameterChange} name="area_basement_max" placeholder="max. estate area" /></td>
                            </tr>
                            <tr>
                                <td>area_estate</td>
                                <td><input type="number" onChange={this.onFilterParameterChange} name="area_estate_min" placeholder="min. estate area" /></td>
                                <td><input type="number" onChange={this.onFilterParameterChange} name="area_estate_max" placeholder="max. estate area" /></td>
                            </tr>
                            <tr>
                                <td>area_property</td>
                                <td><input type="number" onChange={this.onFilterParameterChange} name="area_property_min" placeholder="min. property area" /></td>
                                <td><input type="number" onChange={this.onFilterParameterChange} name="area_property_max" placeholder="max. property area" /></td>
                            </tr>
                            <tr>
                                <td>cash_price</td>
                                <td><input type="number" onChange={this.onFilterParameterChange} name="cash_price_min" placeholder="min. cash price" /></td>
                                <td><input type="number" onChange={this.onFilterParameterChange} name="cash_price_max" placeholder="max. cash price" /></td>
                            </tr>
                            <tr>
                                <td>no. rooms</td>
                                <td><input type="number" onChange={this.onFilterParameterChange} name="rooms_min" placeholder="min. no. rooms" /></td>
                                <td><input type="number" onChange={this.onFilterParameterChange} name="rooms_max" placeholder="max. no. rooms" /></td>
                            </tr>
                            <tr>
                                <td>year</td>
                                <td><input type="number" onChange={this.onFilterParameterChange} name="year_min" placeholder="min. year" /></td>
                                <td><input type="number" onChange={this.onFilterParameterChange} name="year_max" placeholder="max. year" /></td>
                            </tr>
                            <tr>
                                <td>zip</td>
                                <td colSpan={2}>
                                    <input type="text" onChange={this.onFilterParameterChange} name="zip_codes" placeholder="1000, 2000, 3000" />
                                </td>
                            </tr>
                            <tr>
                                <td>property_type</td>
                                <td colSpan={2}>
                                    <select onChange={this.onFilterParameterChange} name="property_type" defaultValue="_">
                                        <option value="_">property type</option>
                                        {this.state.propertyTypes.map(t =>
                                            <option key={t.value} value={t.value}>{t.name}</option>
                                        )}
                                    </select>
                                </td>
                            </tr>
                            <tr colSpan={3}>
                                <button onClick={() => this.page(1)} style={{ padingTop: '20px' }} className="submit">Filter</button>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="search-page-statistics" className="pad-bottom">
                    <p>Total results: {this.state.count}</p>
                    <p>Results on page: {this.state.results.length}</p>
                    {statistics && <table className="striped">
                        <thead>
                            <tr>
                                <th> </th>
                                {Object.keys(Object.values(statistics)[0]).map(key =>
                                    <th>{key}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(statistics).map(column =>
                                <tr>
                                    <th>{column}</th>
                                    {Object.keys(statistics[column]).map(attr => 
                                        <td>{statistics[column][attr]}</td>
                                    )}
                                </tr>
                            )}
                        </tbody>
                    </table>}
                </div>
                <div id="search-page-pagination" className="pad-bottom">
                    {this.createPagination()}
                </div>
                <div id="search-page-results">
                    {results.length > 1 && <table className="scrollable striped">
                        <thead>
                            <tr>
                                {Object.keys(results[1]).map(key =>
                                    <th key={key}>{key}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((row, i) =>
                                <tr key={i}>
                                    {Object.keys(row).map(key =>
                                        <td key={key}>{row[key]}</td>
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