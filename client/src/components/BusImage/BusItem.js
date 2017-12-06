import React, {Component} from "react";
import "./BusItem.css";
import Rating  from "../../components/Rating";
// import ReviewBtn from "../../components/ReviewBtn";
import EditBtn from "../../components/EditBtn";
import DeleteBtn from "../../components/DeleteBtn";

// export const BusItem = props => (
class BusItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-sm-4">
                <div className='card'>
                    <div className="img-container">
                        <img alt={this.props.itemName} src={this.props.itemImage} />
                        {this.props.children}
                        
                    </div>
                    <DeleteBtn />
                    <div className="content">
                        <ul>
                            <li className="itemTittle">
                                <strong>{this.props.itemName}</strong>
                            </li>
                            <li className="itemDes">
                                {this.props.itemSummary}
                            </li>
                        </ul>
                        <hr />
                    <Rating index={this.props.index} />
                    </div>
                    {/* <span onClick={() => props.removeItem(props.id)} className="remove">𝘅</span> */}
                    
                    {/* <ReviewBtn />  */}
                    <EditBtn editItem={() => {
                        console.log("BusItem: editbutton event called!");
                        this.props.editItem(this.props.itemId);
                    }}/> 
                </div>
            </div>
        )}    
}

export default BusItem;
