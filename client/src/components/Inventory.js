import React, { Component } from "react";
import "./App.css";
import Product from "./Product";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const HOST = "http://localhost:8080";

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      productFormModal: false,
      name: "",
      snackMessage: "",
      quantity: ""
    };

    this.handleNewProduct = this.handleNewProduct.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleSnackbar = this.handleSnackbar.bind(this);
  }

  componentWillMount() {
    var url = HOST + `/products`;
    axios.get(url).then(response => {
      this.setState({ products: response.data });
    });
  }

  handleNewProduct = e => {
    e.preventDefault();
    this.setState({ productFormModal: false });
    var newProduct = {
      name: this.state.name,
      quantity: this.state.quantity,
    };

    axios
      .post(HOST + `/products/create`, newProduct)
      .then(
        response => {
        this.setState({ snackMessage: "Product Added Successfully!" });
        this.handleSnackbar();
      })
      .catch(err => {
        console.log(err);
        this.setState({ snackMessage: "Product failed to save" });
        this.handleSnackbar();
      });
  };
  handleEditProduct = editProduct => {
    axios
      .put(HOST + `/products`, editProduct)
      .then(response => {
        this.setState({ snackMessage: "Product Updated Successfully!" });
        this.handleSnackbar();
        return true;
      })
      .catch(err => {
        console.log(err);
        this.setState({ snackMessage: "Product Update Failed!" });
          this.handleSnackbar();
        return false;
      });
  };

  handleName = e => {
    this.setState({ name: e.target.value });
  };
  handleQuantity = e => {
    this.setState({ quantity: e.target.value });
  };
  handleSnackbar = () => {
    var bar = document.getElementById("snackbar");
    bar.className = "show";
    setTimeout(function() {
      bar.className = bar.className.replace("show", "");
    }, 3000);
  };

  render() {
    var { products, snackMessage } = this.state;

    var renderProducts = () => {
      if (products.length === 0) {
        return <tr>{products}</tr>;
      } else {
        return products.map(product => (
          <Product {...product} onEditProduct={this.handleEditProduct} />
        ));
      }
    };

    return (
      <div>
        <div className="container">
          <Button
            className="btn btn-success pull-right"
            onClick={() => this.setState({ productFormModal: true })}
          >
            <i className="glyphicon glyphicon-plus" /> Add New Item
          </Button>
          <br />
          <br />

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Quantity on Hand</th>
                <th />
              </tr>
            </thead>
            <tbody>{renderProducts()}</tbody>
          </table>
        </div>

        <Modal show={this.state.productFormModal}>
          <Modal.Header>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-horizontal" name="newProductForm">
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="name">
                  Name
                </label>
                <div className="col-md-4">
                  <input
                    name="name"
                    placeholder="Name"
                    className="form-control"
                    onChange={this.handleName}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="quantity_on_hand">
                  Quantity On Hand
                </label>
                <div className="col-md-4">
                  <input
                    name="quantity_on_hand"
                    placeholder="Quantity On Hand"
                    onChange={this.handleQuantity}
                    className="form-control"
                  />
                </div>
              </div>
              <br /> <br /> <br />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ productFormModal: false })}>
              Close
            </Button>
            <Button onClick={this.handleNewProduct}>Submit</Button>
          </Modal.Footer>
        </Modal>
        <div id="snackbar">{snackMessage}</div>
      </div>
    );
  }
}

export default Inventory;
