import React, { useState } from 'react';
import ClientDataService from '../../services/client.service';
import { useNavigate } from 'react-router-dom';

const CreateClient = () => {
  const navigate = useNavigate();

  const [client, setClient] = useState({
    id: 0,
    username: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addClient();
  };

  const addClient = () => {
    ClientDataService.create(client)
      .then((response) => {
        console.log(response.data);
        navigate('/Clients');
      })
      .catch((error) => {
        console.error('Error creating client:', error);
      });
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Create Client</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-6">
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={client.username}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={client.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={client.password}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block font-medium mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={client.address}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block font-medium mb-2">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={client.phoneNumber}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create Client
        </button>
      </form>
    </div>
  );
};

export default CreateClient;