import React, { Component } from 'react';
import fs from 'fs';
import './BusinessCard.css'

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: "",
            imagePreviewURL: ""
        };
    }

    _handleImageChange(e) {
        e.preventDefault(); 
        // let reader = new FileReader(); 
        let file = e.target.files[0];
        

        // reader.onloadend = () => {
        //     this.setState({
        //         file: file,
        //         imagePreviewURL: reader.result
        //     });
        // }
        // reader.readAsDataURL(file);
    }

    render() {
        return (
            <div>
                <input className="fileInput" type="file"
                    onChange={(e)=>this._handleImageChange(e)} />
            </div>
        );
    }
}

export default ImageUpload; 