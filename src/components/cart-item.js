import React from "react";

export class CartItem extends React.Component {
  constructor(props) {
    super(props);
    console.log("CartItem props ->", this.props);
  }

  deleteClicked = (item) => {
    this.props.removeItem(item);
  };

  render() {
    return (
      <div className="cart-item-container">
        <button
          className="cart-item-delete-btn btn-no-style"
          onClick={this.deleteClicked.bind(this, this.props.item)}
        >
          X
        </button>
        <span className="product-div">
          <label>{this.props.item.title}</label>
          <label>
            {this.props.item.currency}
            {this.props.item.price}
          </label>
        </span>
        <label className="cart-item-qty">Qty {this.props.item.count}</label>
      </div>
    );
  }
}
