import React, { Component } from "react";
import ClientDataService from "../../services/client.service";
import { withRouter } from '../../common/with-router';

class Client extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.getClient = this.getClient.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateClient = this.updateClient.bind(this);
    this.deleteClient = this.deleteClient.bind(this);

    this.state = {
      currentClient: {
        username: "",
        email: "",
        phone: "",
        address: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getClient(this.props.router.params.id);
  }

  onChangeUsername(e) {
    this.setState((prevState) => ({
      currentClient: {
        ...prevState.currentClient,
        username: e.target.value,
      },
    }));
  }

  onChangeEmail(e) {
    this.setState((prevState) => ({
      currentClient: {
        ...prevState.currentClient,
        email: e.target.value,
      },
    }));
  }

  onChangePhone(e) {
    this.setState((prevState) => ({
      currentClient: {
        ...prevState.currentClient,
        phone: e.target.value,
      },
    }));
  }

  onChangeAddress(e) {
    this.setState((prevState) => ({
      currentClient: {
        ...prevState.currentClient,
        address: e.target.value,
      },
    }));
  }

  getClient(id) {
    ClientDataService.get(id)
      .then((response) => {
        this.setState({ currentClient: response.data });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePublished(status) {
    const data = {
      username: this.state.currentClient.username,
      email: this.state.currentClient.email,
      phone: this.state.currentClient.phone,
      address: this.state.currentClient.address,
      published: status,
    };

    ClientDataService.update(this.state.currentClient.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentClient: {
            ...prevState.currentClient,
            published: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateClient() {
    ClientDataService.update(this.state.currentClient.id, this.state.currentClient)
      .then((response) => {
        console.log(response.data);
        this.setState({ message: "The Client was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteClient() {
    ClientDataService.delete(this.state.currentClient.id)
      .then((response) => {
        console.log(response.data);
        this.props.router.navigate('/Clients');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentClient } = this.state;

    return (
      <div className="container mx-auto my-8 px-4">
        {currentClient ? (
          <div className="bg-white shadow-md rounded-md p-6">
            <h4 className="text-2xl font-bold mb-4">Client</h4>
            <form>
              <div className="mb-4">
                <label htmlFor="username" className="block font-medium mb-2">
                  Username
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="username"
                  value={currentClient.username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-2">
                  Email
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="email"
                  value={currentClient.email}
                  onChange={this.onChangeEmail}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block font-medium mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="phone"
                  value={currentClient.phone}
                  onChange={this.onChangePhone}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block font-medium mb-2">
                  Address
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="address"
                  value={currentClient.address}
                  onChange={this.onChangeAddress}
                />
              </div>
            </form>

            <div className="flex justify-end space-x-2 mt-6">
              {currentClient.published ? (
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  onClick={() => this.updatePublished(false)}
                >
                  UnPublish
                </button>
              ) : (
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => this.updatePublished(true)}
                >
                  Publish
                </button>
              )}
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                onClick={this.deleteClient}
              >
                Delete
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                onClick={this.updateClient}
              >
                Update
              </button>
            </div>
            {this.state.message && (
              <p className="mt-4 text-green-500">{this.state.message}</p>
            )}
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Client...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Client);