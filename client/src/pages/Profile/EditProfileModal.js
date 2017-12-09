import react, {Component} from 'react';

class EditProfileModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const customStyles = {
                overlay : {
                  position          : 'fixed',
                  top               : 0,
                  left              : 0,
                  right             : 0,
                  bottom            : 0,
                  backgroundColor   : 'rgba(255, 255, 255, 0.75)'
                },
                content : {
                  position                   : 'absolute',
                  top                        : '40px',
                  left                       : '40px',
                  right                      : '40px',
                  bottom                     : '40px',
                  border                     : '4px solid orange',
                  background                 : '#fff',
                  overflow                   : 'auto',
                  WebkitOverflowScrolling    : 'touch',
                  borderRadius               : '4px',
                  outline                    : 'none',
                  padding                    : '20px'
              
                }    
        };
        return (
            <div>
            <Modal 
                isOpen={this.props.editModal}
                onRequestClose={this.props.closeModal}
                style={customStyles}>
                <form onSubmit={this.props.saveAndClose}>
                    <Container fluid>
                        <Row>
                            <Col size="md-10">
                                <p className="logo">Upload Business Logo Image</p>
                                <UploadImage getImagePath={this.props.updateBusinessImage}/>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col size="md-10">
                                <p className="logo">Upload Profile Image</p>
                                <UploadImage getImagePath={this.props.updateProfileImage}/>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col size="md-10">
                                <InputLog
                                    value={this.props.business_name}
                                    onChange={this.props.handleInputChange}
                                    name="business_name"
                                    placeholder="Business Name"
                                    id="inputLogBusinessTitle"
                                />
                            </Col>
                        </Row>
                        <Row><Col size="md-10">
                            <TextArea
                                value={this.props.business_address}
                                onChange={this.props.handleInputChange}
                                name="business_address"
                                placeholder="Business Address"
                                id="txtAreaBusinessAddress"
                            />
                        </Col></Row>
                        <Row><Col size="md-10">
                            <TextArea
                                value={this.props.business_description}
                                onChange={this.props.handleInputChange}
                                name="business_description"
                                placeholder="Business Description"
                                id="txtAreaBusinessDescription"
                            />
                        </Col></Row>
                        <Row>
                            <Col size="md-10">
                            <InputLog
                                value={this.props.business_zip}
                                onChange={this.props.handleInputChange}
                                name="business_zip"
                                placeholder="ZipCode"
                                id="inputLogZipCode"
                            />
                            </Col>
                        </Row>
                        <Row>
                            <Col size="md-10">
                            <InputLog
                                value={this.props.business_facebook}
                                onChange={this.props.handleInputChange}
                                name="business_facebook"
                                placeholder="Facebook Link"
                                id="inputLogFacebookLink"
                            />
                            </Col>
                        </Row>
                        <Row>
                            <Col size="md-10">
                            <InputLog
                                value={this.props.business_instagram}
                                onChange={this.props.handleInputChange}
                                name="business_instagram"
                                placeholder="Instagram Link"
                                id="inputLogInstagram"
                            />
                            </Col>
                        </Row>
                        <Row>
                            <Col size="md-10">
                            <InputLog
                                value={this.props.business_email}
                                onChange={this.props.handleInputChange}
                                name="business_email"
                                placeholder="Email Id"
                                id="inputLogEmail"
                            />
                            </Col>
                        </Row>
                        <Row>
                            <Col size="md-10">
                            <InputLog
                                value={this.props.business_phone}
                                onChange={this.props.handleInputChange}
                                name="business_phone"
                                placeholder="Phone No."
                                id="inputLogPhoneNo"
                            />
                            </Col>
                        </Row>
                        <Row>
                            <Col size="md-10">
                            <InputLog
                                value={this.props.business_fax}
                                onChange={this.props.handleInputChange}
                                name="business_fax"
                                placeholder="Fax No."
                                id="inputLogFaxNo"
                            />
                            </Col>
                        </Row>
                        <hr />
                        <Row><Col size="md-10">
                            <button className="btn btn-primary pull-right loginBtn" onClick={this.props.updateAndClose}>Save</button>
                        </Col></Row>
                    </Container>
                </form>
            </Modal>
        </div>
        );
    }
}