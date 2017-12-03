import React, { Component } from 'react';


class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: "",
            imagePreviewURL: ""
        };
    }

   _handleImageChange(e) {
       console.log
        e.preventDefault(); 

       let reader = new FileReader();
        let file = e.target.files[0];
        console.log(file);

       reader.onloadend = () => {
            this.props._handleImage({
                file: file,
                imagePreviewURL: reader.result
            });
        }
        reader.readAsDataURL(file);
    }

   render() {
        return (
            <div>
                <input className="fileInput" type="file"
                    onChange={this._handleImageChange} />
            </div>
        );
    }
}

export default ImageUpload;