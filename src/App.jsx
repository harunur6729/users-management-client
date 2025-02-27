import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [users, setUser] = useState([]);

  useEffect( ()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUser(data));
  },[])

  const handleAddUser = event =>{
    event.preventDefault();
    const form = event.target;
    const name =form.name.value;
    const email = form.email.value;
    const user ={name, email};
    console.log(user)
    fetch('http://localhost:5000/users' , {
      method: 'post',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res =>res.json())
    .then(data =>{
      console.log('inside post response', data)
      const newUsers = [...users, data]
      setUser(newUsers);
      form.reset();
    })
  }

  return (
    <>

    <form onSubmit={handleAddUser}>
          <input type="text" name="name" id="" /> <br />
          <input type="email" name="email" id="" /><br />
          <input type="submit" value="Add user" />
    </form>

      <h1>User management system</h1>
      <h3>Numbers of Users : {users.length}</h3>
      
      <div>
        {
          users.map(user => <p key={user.id}>
            {user.id}: {user.name}: {user.email}</p>)
        }
      </div>
    
    </>
  )
}

export default App
