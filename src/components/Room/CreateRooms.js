import React, { useState } from 'react';
import roomService from '../../services/room.service';
import { useNavigate , redirect } from 'react-router-dom';

const CreateRoom = () => {
  const navigate = useNavigate();

  const [Room, setRoom] = useState({
    roomNumber: '',
    capacity: '',
    price: '',
    isAvailable: false, // Set as boolean
    description: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setRoom({ ...Room, [name]: checked }); // Handle checkbox changes as booleans
    } else {
      setRoom({ ...Room, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRoom();
  };

  const addRoom = () => {
    roomService.create(Room)
      .then((response) => {
        console.log(response.data);
       redirect("/Rooms");
      })
      .catch((error) => {
        console.error('Error creating Room:', error);
      });
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Create Room</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-6">
        <div className="mb-4">
          <label htmlFor="roomNumber" className="block font-medium mb-2">
            Room Number
          </label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            value={Room.roomNumber}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="capacity" className="block font-medium mb-2">
            Capacity
          </label>
          <input
            type="text"
            id="capacity"
            name="capacity"
            value={Room.capacity}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block font-medium mb-2">
            Price
          </label>
          <input
            type="text" // Use text input for price, ensure you validate the input format
            id="price"
            name="price"
            value={Room.price}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="isAvailable" className="block font-medium mb-2">
            Available
          </label>
          <input
            type="checkbox"
            id="isAvailable"
            name="isAvailable"
            checked={Room.isAvailable}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-2">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={Room.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create Room
        </button>
      </form>
    </div>
  );
};

export default CreateRoom;
