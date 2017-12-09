import React from 'react';
import ImageUploader from 'react-images-upload';
 
class UploadImg extends React.Component {
 
    constructor(props) {
        super(props);
         this.state = { pictures: [] };
         this.onDrop = this.onDrop.bind(this);
    }
 
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

 
    render() {
        return (
            <div>
            <ImageUploader
                withIcon={false}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
          
            </div>
        );
    }
}

export default UploadImg;
