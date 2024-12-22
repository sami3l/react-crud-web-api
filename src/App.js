import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Client from "./components/Client/Client";
import ClientsList from "./components/Client/Clients";
import CreateClient from "./components/Client/CreateClients";
import RoomsList from "./components/Room/Rooms";
import Room from "./components/Room/Room";
import AddRoom from "./components/Room/CreateRooms"

class App extends Component {
  render() {
    return (
      <div className="bg-gray-100 min-h-screen">
        {/* Navbar Section */}
        <nav className="bg-gray-800 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            {/* Brand Name */}
            <div className="flex-shrink-0">
              <Link to="/Clients" className="text-2xl font-bold text-white">
                Hotel Management
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-6">
                <Link
                  to="/Clients"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Clients
                </Link>
                <Link
                  to="/Rooms"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Rooms
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden bg-gray-800 px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/Clients"
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Clients
            </Link>
            <Link
              to="/Rooms"
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Rooms
            </Link>
          </div>
        </nav>

        {/* Main Content Section */}
        <div className="container mx-auto my-8 px-4">
          <Routes>
            <Route path="/" element={<ClientsList />} />
            <Route path="/clients" element={<ClientsList />} />
            <Route path="/clients/add" element={<CreateClient />} />
            <Route path="/clients/:id" element={<Client />} />
            <Route path="/rooms" element={<RoomsList />} />
            <Route path="/rooms/:id" element={<Room/>} />
            <Route path="/rooms/add" element={<AddRoom />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;