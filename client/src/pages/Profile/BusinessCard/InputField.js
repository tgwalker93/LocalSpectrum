import React, { Component } from 'react';
import {InputLog} from '../../../components/LoginItem';

class InputField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.data.name, 
            placeholder: props.data.placeholder,
            id: props.data.id,
            isMandatory: props.data.isMandatory,
            value: ""
        }
    }

    sendInfo = () => {
        let data = {
            name: this.state.name,
            value: this.state.value
        }
        this.props.handleChange(data);
    }

    _handleInputChange = event => {
        const {name, value} = event.target; 
        this.setState({
            [name]: value
        });
    };

    render() {
        return(
            <div className="required-field-block">
                {/* <input type="text" placeholder="Name" class="form-control" /> */}
                <InputLog
                    value={this.state.value}
                    onChange={this._handleInputChange}
                    name={this.state.name}
                    placeholder={this.state.placeholder}
                    id={this.state.id}
                />
                <div className="required-icon">
                    <div className="text">*</div>
                </div>
            </div>
        );
    }
}

export default InputField; 