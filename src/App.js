import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [users,setUsers] = useState([]);
  const  nameRef = useRef('');
  const  emailRef = useRef('');


  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res=> res.json())
    .then(data =>setUsers(data));
  },[])

// post
  const hendleAddUser = e =>{ 
    const name =nameRef.current.value;
    const email =emailRef.current.value;

    const newUser ={Name:name,email:email}

    // send data to server post
    fetch('http://localhost:5000/users',{
      method: 'post',
      headers:{
        "content-Type": "application/json"
      },
      body: JSON.stringify(newUser)

    })
     .then(res=>res.json())
     .then(data=>{
      console.log(data)
      // data show ui
      const addUsers = data;
      const newUsers =[...users, addUsers];
      setUsers(newUsers)
     })
     nameRef.current.value ='';
     emailRef.current.value ='';

          e.preventDefault();
  }
  return (
    <div className="App">
      <h2>Total Users:{users.length}</h2>
      <form onSubmit={hendleAddUser}>
        <input type="text" ref={nameRef} placeholder="name" />
        <input type="email" ref={emailRef} name="" id="" placeholder="email" />
        <input type="submit" value="Submit"  />
      </form>
     <ul>
     {
        users.map(user => <li key={user.id}>{user.Name}: {user.email}</li>)
      }
     </ul>
    </div>
  );
}

export default App;
