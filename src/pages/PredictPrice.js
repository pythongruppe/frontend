import React, { Component } from "react";
import { url } from "../config"

export default class PredictPrice extends Component {

    state = {
        propertyTypes: [],
        results: null
    }

    async fetchPropertyTypes() {
        const response = await fetch(url + 'property-types')
        return response.json()
    }

    async componentDidMount() {
        this.setState({ propertyTypes: await this.fetchPropertyTypes() })
    }

    onParameterChange = (e) => {
        const { name, value } = e
        this.setState(prev => ({
            parameters: {
                ...prev.parameters,
                [name]: value
            }
        }))
    }

    onFormSubmit = async e => {
        e.preventDefault();
        const toSubmit = {};
        ([...e.target.elements]).filter(e => e.name).forEach(e => {
            toSubmit[e.name] = Number(e.value)
        })


        this.setState({ result: await this.predict(toSubmit) })
    }

    predict = async parameters => {
        const response = await fetch(url + 'predict', {
            method: 'POST',
            body: JSON.stringify(parameters),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return response.json()
    }

    render() {

        return (
            <>
                {this.state.result && <div>
                <p>Prediction results: </p>
                <p>Cash price: <strong>{this.state.result.cash_prediction}</strong></p>
                <p>Down payment: <strong>{this.state.result.down_payment}</strong></p>
                <p>Monthly payment: <strong>{this.state.result.monthly_payment}</strong></p>
                </div>}
                <form onSubmit={this.onFormSubmit}>
                    <div>
                        <label>Basement Area</label>
                        <input name="area_basement" type="number" step="1" defaultValue={50} />
                    </div>
                    <div>
                        <label>Estate Area</label>
                        <input name="area_estate" type="number" step="1" defaultValue={150} />
                    </div>
                    <div>
                        <label>Property Area</label>
                        <input name="area_property" type="number" step="1" defaultValue={1000} />
                    </div>
                    <div>
                        <label>Property Type</label>
                        <select name="property_type" defaultValue={1}>
                            {this.state.propertyTypes.map(t =>
                                <option key={t.value} value={t.value}>{t.name}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label>Rooms</label>
                        <input name="rooms" type="number" step="1" defaultValue={5} />
                    </div>
                    <div>
                        <label>Year</label>
                        <input name="year" type="number" step="1" defaultValue={1998} />
                    </div>
                    <div>
                        <label>Zip</label>
                        <input name="zip" type="number" step="1" defaultValue={3460} />
                    </div>
                    <div>
                        <button>Predict</button>
                    </div>
                </form>
            </>)
    }
}