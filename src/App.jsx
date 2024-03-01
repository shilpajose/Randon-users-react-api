import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Col, Row } from 'react-bootstrap';

function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [userData, setUserData] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const apiUrl = 'https://dummyjson.com/users';
      const response = await axios.get(apiUrl);
      setAllUsers(response.data.users);
      // Display a random user initially
      setUserData(getRandomUser(response.data.users));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  console.log(allUsers);
  const getRandomUser = (users) => {
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex];
  };

  const handleRefresh = () => {
    // Display a different random user when the button is clicked
    setUserData(getRandomUser(allUsers));
    setBackgroundColor(generateRandomColor());
  };

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="app" style={{ backgroundColor }}>
      <div className="user-container container w-75">
        {userData && (
          <>
            <Row>
              <Col><img src={userData.image} alt="" /></Col>
              <Col><h2 className='text-danger'>{userData.firstName}</h2>
                <p>Email: {userData.email}</p>
                <p>Phone: {userData.phone}</p>
                <p>Address: {userData.address.address}</p>
                <p>Age: {userData.age}</p>
                <p>Email: {userData.email}</p>
                <p>Gender: {userData.gender}</p>
                <p>UserName: {userData.username}</p></Col>
              <div className='container w-25'>
                <button className="refresh-button" onClick={handleRefresh}>
                  Refresh
                </button>
              </div>
            </Row>

          </>
        )}
      </div>

    </div>
  );
}

export default App;