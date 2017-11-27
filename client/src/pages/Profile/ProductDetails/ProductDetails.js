import React, { Component } from 'react';
import { Col, Row, Container } from "../../../components/Grid";
import './ProductDetails.css';

class ProductDetails extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items
        }
    }

    render() {
        let addProduct = (
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

        return (
            <div>
                {addProduct}
            </div>
        );
    }
}

export default ProductDetails; 