import React, { useState } from 'react';
import axios from 'axios';

function SearchEmployee() {
  const [searchEmail, setSearchEmail] = useState('');
  const [employee, setEmployee] = useState(null);

  const handleSearch = () => {
    // Realiza una solicitud GET al servidor para buscar al empleado por correo electrónico
    axios.get(`http://localhost:8081/search?email=${searchEmail}`)
      .then((res) => {
        setEmployee(res.data.Result[0]);
      })
      .catch((err) => {
        console.log(err);
        setEmployee(null);
      });
  };

  return (
    <div>
      <h2>Search Employee by Email</h2>
      <div className="input-group mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Enter employee email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {employee && (
        <div>
          <h3>Employee Details:</h3>
          <p>Name: {employee.name}</p>
          <p>Email: {employee.email}</p>
          <p>Address: {employee.address}</p>
          <p>Salary: {employee.salary}</p>
        </div>
      )}
    </div>
  );
}

export default SearchEmployee;
