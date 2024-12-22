import React, { Component } from "react";
import RoomDataService from "../../services/room.service";
import { withRouter } from "../../common/with-router";

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoom: {
        id : "",
        capacity: "",
        pricePerNight: "",
        isAvailble: "",
        description: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getRoom(this.props.router.params.id);
  }

  onChangeCapacity = (e) => {
    this.setState((prevState) => ({
      currentRoom: {
        ...prevState.currentRoom,
        capacity: e.target.value,
      },
    }));
  };

  onChangePrice = (e) => {
    this.setState((prevState) => ({
      currentRoom: {
        ...prevState.currentRoom,
        pricePerNight: e.target.value,
      },
    }));
  };

  onChangeDescription = (e) => {
    this.setState((prevState) => ({
      currentRoom: {
        ...prevState.currentRoom,
        description: e.target.value,
      },
    }));
  }

  onChangeAvailble = (e) => {
    this.setState((prevState) => ({
      currentRoom: {
        ...prevState.currentRoom,
        isAvailble : e.target.value,
      },
    }));
  };

  getRoom = (id) => {
    RoomDataService.get(id)
      .then((response) => {
        this.setState({ currentRoom: response.data });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  updatePublished = (status) => {
    const data = {
      capacity: this.state.currentRoom.capacity,
      price: this.state.currentRoom.price,
      availble: this.state.currentRoom.isAvailble,
      description: this.state.currentRoom.description,
      published: status,
    };

    RoomDataService.update(this.state.currentRoom.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentRoom: {
            ...prevState.currentRoom,
            published: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  updateRoom = () => {
    RoomDataService.update(this.state.currentRoom.id, this.state.currentRoom)
      .then((response) => {
        console.log(response.data);
        this.setState({ message: "The Room was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  deleteRoom = () => {
    RoomDataService.delete(this.state.currentRoom.id)
      .then((response) => {
        console.log(response.data);
        this.props.router.navigate("/Rooms");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { currentRoom } = this.state;

    return (
      <div className="container mx-auto my-8 px-4">
        {currentRoom ? (
          <div className="bg-white shadow-md rounded-md p-6">
            <h4 className="text-2xl font-bold mb-4">Room</h4>
            <form>
              <div className="mb-4">
                <label htmlFor="capacity" className="block font-medium mb-2">
                  Capacity
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="capacity"
                  value={currentRoom.capacity}
                  onChange={this.onChangeCapacity}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block font-medium mb-2">
                  Price per Night
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="price" 
                  value={currentRoom.pricePerNight}
                  onChange={this.onChangePrice}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block font-medium mb-2">
                  availability
                </label>
                <input
                  type="checkbox"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="price" 
                  value={currentRoom.isAvailble}
                  onChange={this.onChangePrice}
                />
              </div>
              {/* <div className="mb-4">
                <label
                  htmlFor="availability"
                  className="block font-medium mb-2"
                >
                  Availability
                </label>
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="availble"
                  value={currentRoom.isAvailble}
                  onChange={this.onChangeAvailble}
                >
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              </div> */}
              <div className="mb-4">
                <label htmlFor="description" className="block font-medium mb-2">
                  Description
                </label>
                <textarea
                  className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="description"
                  value={currentRoom.description}
                  onChange={this.onChangeDescription}
                />
              </div>
            </form>

            <div className="flex justify-end space-x-2 mt-6">
              {currentRoom.published ? (
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  onClick={() => this.updatePublished(false)}
                >
                  Unpublish
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
                onClick={this.deleteRoom}
              >
                Delete
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                onClick={this.updateRoom}
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
            <p>Please click on a Room...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Room);
