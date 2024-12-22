import React, { Component } from "react";
import ClientDataService from "../../services/client.service";
import { Link } from "react-router-dom";

export default class ClientsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchById = this.onChangeSearchById.bind(this);
    this.retrieveClients = this.retrieveClients.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveClient = this.setActiveClient.bind(this);
    this.removeAllClients = this.removeAllClients.bind(this);
    this.searchById = this.searchById.bind(this);

    this.state = {
      Clients: [],
      currentClient: null,
      currentIndex: -1,
      searchById: "",
    };
  }

  componentDidMount() {
    this.retrieveClients();
  }

  onChangeSearchById(e) {
    this.setState({ searchById: e.target.value });
  }

  retrieveClients() {
    ClientDataService.getAll()
      .then((response) => {
        this.setState({ Clients: response.data });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveClients();
    this.setState({ currentClient: null, currentIndex: -1 });
  }

  setActiveClient(Client, index) {
    this.setState({ currentClient: Client, currentIndex: index });
  }

  removeAllClients() {
    ClientDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchById() {
    this.setState({ currentClient: null, currentIndex: -1 });

    ClientDataService.get(this.state.searchById)
      .then((response) => {
        this.setState({ Clients: response.data });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchById, Clients, currentClient, currentIndex } = this.state;

    return (
      <div className="container mx-auto my-8 px-4">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <div className="flex">
              <input
                type="text"
                className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search by ID"
                value={searchById}
                onChange={this.onChangeSearchById}
              />
              <button
                className="rounded-r-md bg-blue-500 text-white px-3 py-2 hover:bg-blue-600"
                onClick={this.searchById}
              >
                Search
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <Link
              to="/clients/add"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
            >
              Add Client
            </Link>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={this.removeAllClients}
            >
              Remove All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium mb-4">Clients List</h4>
            <ul className="border border-gray-300 rounded-md">
              {Clients.map((Client, index) => (
                <li
                  key={index}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                    index === currentIndex ? "bg-blue-100" : ""
                  }`}
                  onClick={() => this.setActiveClient(Client, index)}
                >
                  {Client.username}
                </li>
              ))}
            </ul>
          </div>
          {currentClient && (
            <div>
              <h4 className="text-lg font-medium mb-4">Client Details</h4>
              <div className="border border-gray-300 rounded-md p-4">
                <div className="mb-2">
                  <span className="font-medium">ID:</span> {currentClient.id}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Address:</span>{" "}
                  {currentClient.address}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Username:</span>{" "}
                  {currentClient.username}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Email:</span>{" "}
                  {currentClient.email}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Phone:</span>{" "}
                  {currentClient.phoneNumber}
                </div>
                <div>
                  <Link
                    to={"/Clients/" + currentClient.id}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}