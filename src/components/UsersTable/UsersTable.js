import React, { Component } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import './UsersTable.css';

class UsersTable extends Component {
  state = {
    users: [],
    loading: true,
  };

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
      const fetchedUsers = [];
      for (let key in res.data) {
        fetchedUsers.push({
          ...res.data[key],
          id: key,
        });
        this.setState({
          users: fetchedUsers,
          loading: false,
        });
      }
    });
  }

  render() {
    const { users, loading } = this.state;

    if (loading) return <BeatLoader color='#353a40' />;

    const usersTable = (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={parseFloat(user.id) % 2 === 0 ? 'even' : 'odd'}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.website}</td>
              <td>{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

    return (
      <div>
        <h1>Users table</h1>
        {usersTable}
      </div>
    );
  }
}

export default UsersTable;
