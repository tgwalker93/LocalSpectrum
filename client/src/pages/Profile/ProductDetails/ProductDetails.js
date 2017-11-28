import React, { Component } from 'react';
import { Col, Row, Container } from "../../../components/Grid";
import { InputLog} from "../../../components/LoginItem";
import './ProductDetails.css';
import ImageUpload from '../BusinessCard/ImageUpload';
import API from "../../../utils/API";

class ProductDetails extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.userId,
            itemName: "",
            itemSummary:"",
            product: {

            }
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        let displayProduct = (
            <div className="card">
                <img className="card-img-top .img-responsive" src="http://localhost:3000/assets/img/map3.png" alt="Card image" />   
                <div className="card-img-overlay">
                    <div className="card-block">
                        <h4 className="card-title">Card title</h4>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                        </p>
                        <button className="btn btn-primary">Edit</button>
                    </div>               
                </div>                
            </div>
        ); 

        let _addItem = event => {
            console.log("UserId: " + this.state.userId);
            console.log("Item Name: " + this.state.itemName);
            event.preventDefault(); 
            if(this.state.itemName) {
                this.setState({
                    userId: this.state.userId,
                    product: {
                        itemObj: {
                            itemName: this.state.itemName,
                            itemSummary: this.state.itemSummary
                        }
                    }
                }, () => {
                    API.saveProduct({
                        item: this.state.product
                    })
                    .then(res => {
                        console.log("Item is successfully saved!")
                    })
                    .catch(err => {
                        console.log("Error encountered while saying Product: " + err);
                    })
                })
            }
        }

        return (
            <div>
                <Container fluid>
                    <Row><Col size="md-12">
                    <button className="btn btn-primary addBtn" data-toggle="collapse"
                            data-target="#addProductDiv"><i className="fa fa-plus"></i>&nbsp;Add Product</button>
                    </Col></Row>
                    <Row><Col size="md-6">
                        <div className="collapse" id="addProductDiv">
                            <form>
                                <ImageUpload />
                                <InputLog
                                    value={this.state.itemName}
                                    onChange={this.handleInputChange}
                                    name="itemName"
                                    placeholder="Item Name"
                                />
                            
                                <InputLog
                                    value={this.state.itemSummary}
                                    onChange={this.handleInputChange}
                                    name="itemSummary"
                                    placeholder="Item Summary"
                                />
                                <div>
                                <button className="btn btn-primary" onClick={_addItem}>Add Item</button>

                                </div>
                            </form>
                        </div>
                    </Col></Row>
                    <hr />
                    <Row><Col size="md-12">
                        {displayProduct}
                    </Col></Row>
                </Container>
            </div>
        );
    }
}

export default ProductDetails; 