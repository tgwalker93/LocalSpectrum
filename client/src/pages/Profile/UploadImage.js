import React, { Component } from 'react';
import fs from 'fs';
// import './BusinessCard.css'

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     file: "",
        //     imagePreviewURL: ""
        // };
    }

    render() {
        return (
            <div>
                <input className="fileInput" type="file"
                    onChange={this.props.getImagePath} />
            </div>
        );
    }
}

export default ImageUpload; 