import React, { Component } from "react";
import RoomDataService from "../../services/room.service";
import { Link } from "react-router-dom";

export default class RoomsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchById = this.onChangeSearchById.bind(this);
    this.retrieveRooms = this.retrieveRooms.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveRooms = this.setActiveRoom.bind(this);
    this.removeAllRooms = this.removeAllRooms.bind(this);
    this.searchById = this.searchById.bind(this);

    this.state = {
      Rooms: [],
      currentRoom: null,
      currentIndex: -1,
      searchById: "",
    };
  }

  componentDidMount() {
    this.retrieveRooms();
  }

  onChangeSearchById(e) {
    this.setState({ searchById: e.target.value });
  }

  retrieveRooms() {
    RoomDataService.getAll()
      .then((response) => {
        this.setState({ Rooms: response.data });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveRooms();
    this.setState({ currentRoom: null, currentIndex: -1 });
  }

  setActiveRoom(Room, index) {
    this.setState({ currentRoom: Room, currentIndex: index });
  }

  removeAllRooms() {
    RoomDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchById() {
    this.setState({ currentRoom: null, currentIndex: -1 });

    RoomDataService.get(this.state.searchById)
      .then((response) => {
        this.setState({ Rooms: response.data });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchById, Rooms, currentRoom, currentIndex } = this.state;

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
              to="/Rooms/add"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
            >
              Add Room
            </Link>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={this.removeAllRooms}
            >
              Remove All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium mb-4">Rooms List</h4>
            <ul className="border border-gray-300 rounded-md">
              {Rooms.map((Room, index) => (
                <li
                  key={index}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                    index === currentIndex ? "bg-blue-100" : ""
                  }`}
                  onClick={() => this.setActiveRoom(Room, index)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">
                        Room Number: {Room.roomNumber}
                      </p>
                      <p className="text-sm text-gray-600">
                        Capacity: {Room.capacity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Availability:{" "}
                        {Room.isAvailable ? "Available" : "Not Available"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Description: {Room.description}
                      </p>
                    </div>
                    <span className="font-bold text-lg text-blue-600">
                      ${Room.pricePerNight}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {currentRoom && (
            <div>
              <h4 className="text-lg font-medium mb-4">Room Details</h4>
              <div className="border border-gray-300 rounded-md p-4">
                <div className="mb-2">
                  <span className="font-medium">Room Number:</span>{" "}
                  {currentRoom.roomNumber}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Capacity:</span>{" "}
                  {currentRoom.capacity}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Price Per Night:</span>{" "}
                  {currentRoom.pricePerNight}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Availability:</span>{" "}
                  {currentRoom.isAvailable ? "Available" : "Not Available"}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Description:</span>{" "}
                  {currentRoom.description}
                </div>
                <div>
                  <Link
                    to={"/Rooms/" + currentRoom.id}
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
