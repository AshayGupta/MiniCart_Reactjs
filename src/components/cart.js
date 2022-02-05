import React from "react";
import { CartItem } from "./cart-item";

export class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: this.props.cartItems,
    };
  }

  removeItem = async (item) => {
    console.log("removeItem ->", item);
    let index = this.state.cartItems.indexOf(item);
    if(index > -1) {
        this.state.cartItems[index].count = 0;
    }
    await this.setState({ cartItems: this.state.cartItems });
    this.props.updateCart(this.state.cartItems);
  };

  render() {
    let cartItems = [];
    this.state.cartItems.forEach((item) => {
      if(item.count > 0) {
        cartItems.push(
        <CartItem key={item.id} item={item} removeItem={this.removeItem} />
      );
      }
    });
    return <div className="cart-container">{cartItems}</div>;
  }
}
