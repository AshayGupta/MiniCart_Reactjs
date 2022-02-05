import React from "react";

class ProductItem extends React.Component {
  constructor(props) {
    super(props);
    console.log("ProductItem props");
    this.state = {
      item: props.item,
    };
  }

  minusClicked = (e) => {
    if (this.state.item.count > 0) {
      this.setCount(-1);
    }
  };

  plusClicked = (e) => {
    this.setCount(1);
  };

  async setCount(value) {
    this.state.item.count += value;

    let products = this.props.products;
    let index = products.indexOf(this.state.item);
    if (index > -1) {
      products[index] = this.state.item;
    }
    await this.setState({
      item: this.state.item,
    });
    this.props.updateCart(products);
  }

  render() {
    return (
      <div className="product-list-container">
        <img src="this.props.data.image" alt="" />
        <div className="product-div">
          <label className="product-title">{this.props.item.title}</label>
          <label className="product-desc">{this.props.item.desc}</label>
        </div>
        <div className="count-div">
          <button
            className="btn-no-style"
            type="button"
            onClick={this.minusClicked}
          >
            -
          </button>
          <input type="number" value={this.state.item.count} readOnly />
          <button
            className="btn-no-style"
            type="button"
            onClick={this.plusClicked}
          >
            +
          </button>
        </div>
        <label className="price">
          {this.props.item.currency}
          {this.props.item.price}
        </label>
      </div>
    );
  }
}

export default ProductItem;
