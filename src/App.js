import React, { useEffect, useState } from 'react';

import axios from 'axios';

 

function App() {

  const [data, setData] = useState([]);

  const [userid, setUserId] = useState('');

  const [password, setPassword] = useState('');

  const [emailid, setEmail] = useState('');

 

  const updateUserId = (event) => {setUserId(event.target.value);};

 

  const updatePassword = (event) => {setPassword(event.target.value);};

 

  const updateEmail = (event) => {setEmail(event.target.value);};

 

  const insertUser = (event) => {

    event.preventDefault();

    axios.post('http://localhost:3000/insert', { userid: userid, password: password, emailid: emailid })

      .then((res) => {console.log(res);

        fetchData();

      });

  };

 

  const updateUser = () => {

    axios.put('http://localhost:3000/update', { uid: userid, password: password, emailid: emailid })

      .then((res) => {

        console.log(res);

        fetchData();

      });

  };

 

  const deleteUser = () => {

    axios.delete('http://localhost:3000/delete?userid=${userid}')

      .then((res) => {

        console.log(res);

        fetchData();

      });

  };

 

  const fetchData = () => {

    fetch('http://localhost:3000/getAll')

      .then((response) => response.json())

      .then((data) => setData(data));

  };

 

  useEffect(() => {

    fetchData();

  }, []);

 

  return (

    <div className="App">

      <center>

        <form onSubmit={insertUser}>

          <b>User ID</b>

          <input type="text" value={userid} onChange={updateUserId} /><br />

          <b>Password</b>

          <input type="password" value={password} onChange={updatePassword} /><br />

          <b>Email ID</b>

          <input type="email" value={emailid} onChange={updateEmail} /><br />

          <input type="submit" value="Add" />&nbsp;&nbsp;

          <input type="reset" value="Reset" />&nbsp;&nbsp;

          <input type="button" value="Update" onClick={updateUser} />&nbsp;&nbsp;

          <input type="button" value="Delete" onClick={deleteUser} />&nbsp;&nbsp;

        </form>

      </center>

 

      <ul>

        {data.map((item) => (

          <li key={item.userid}>

            {item.userid}, {item.password}, {item.emailid}

          </li>

        ))}

      </ul>

    </div>

  );

}

 

export default App;