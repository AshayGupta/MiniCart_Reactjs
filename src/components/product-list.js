import React from "react";
import { AxiosProduct } from "../service/product";
import { Cart } from "./cart";
import ProductItem from "./product-item";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartData: {
        totalPrice: 0,
        productCount: 0,
        products: [],
      },
      displayCart: false,
    };
  }

  componentDidMount() {
    AxiosProduct.get().then((resp) => {
      console.log("Axios get products -> ", resp.data.products);
      let tempProducts = resp.data.products.map((val) => {
        let o = Object.assign({}, val);
        o.count = 1;
        return o;
      });
      this.setState({
        cartData: {
          totalPrice: tempProducts.reduce(this.calPrice, 0),
          productCount: tempProducts.reduce(this.getProductCount, 0),
          products: tempProducts,
        },
      });
    });
  }

  calPrice(total, item) {
    return total + item.count * parseFloat(item.price);
  }

  getProductCount(total, item) {
    if (item.count > 0) {
      total++;
    }
    return total;
  }

  updateCart = async (products) => {
    let total = products.reduce(this.calPrice, 0);
    let count = products.reduce(this.getProductCount, 0);

    await this.setState({
      cartData: {
        totalPrice: total,
        products: products,
        productCount: count,
      },
    });
  };

  toggleCart = () => {
    this.setState({ displayCart: !this.state.displayCart });
  };

  render() {
    let productItems = [];
    this.state.cartData.products.forEach((item) => {
      productItems.push(
        <ProductItem
          key={item.id}
          item={item}
          updateCart={this.updateCart}
          products={this.state.cartData.products}
        />
      );
    });
    console.log("render product-list");

    return (
      <div>
        <div className="cart-header">
          <span>
            <label>
              {this.state.cartData.products[0]?.currency}
              {this.state.cartData.totalPrice}
            </label>
            <button
              className="btn-no-style pd-0"
              type="button"
              onClick={this.toggleCart}
            >
              {this.state.cartData.productCount} Items
            </button>
          </span>
        </div>

        {!this.state.displayCart && <div>{productItems}</div>}
        {this.state.displayCart && (
          <Cart
            cartItems={this.state.cartData.products}
            updateCart={this.updateCart}
          />
        )}
      </div>
    );
  }
}

export default ProductList;
