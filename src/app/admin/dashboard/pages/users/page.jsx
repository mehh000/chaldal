'use client';

import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'; // Icons for actions
import cl from './Users.module.css'; // Importing CSS Module
import { getAllUsers } from '@/service/getuserdata';

function Users() {
  const [search, setSearch] = useState(''); // Search term
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered list
  const [users, setUsers] = useState([]); // Original list
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers(); // Fetch users from Firestore
        setUsers(usersData); // Set the fetched users
        setFilteredUsers(usersData); // Initially set filtered users to all users
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false); // Data fetching is complete
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on the search term
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]); // Re-run filtering when search input or users change

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching
  }

  return (
    <div className={cl.container}>
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)} // Update search term
        className={cl.searchBar}
      />
      <table className={cl.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <img
                    src={user.image}
                    alt={user.name}
                    className={cl.userImage}
                  />
                </td>
                <td>
                  <button className={cl.actionBtn}>
                    <FaEye /> {/* View */}
                  </button>
                  <button className={cl.actionBtn}>
                    <FaEdit /> {/* Edit */}
                  </button>
                  <button className={cl.actionBtn}>
                    <FaTrash /> {/* Delete */}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
