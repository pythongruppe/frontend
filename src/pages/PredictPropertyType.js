import React, { Component } from "react";
import { url } from "../config"

export default class PredictPrice extends Component {

    state = {
        propertyTypes: [],
        results: null
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
        const response = await fetch(url + 'predict-property-type', {
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
                    <p>Classification results: </p>
                    <p>Name: <strong>{this.state.result.name}</strong></p>
                    <p>Value: <strong>{this.state.result.value}</strong></p>
                    <p>Accuracy: <strong>{this.state.result.accuracy}</strong></p>
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