import logo from './logo.svg';
import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';

import CoachList from "./components/CoachList";
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import AddCoach from "./components/AddCoach";
import { useAuth0 } from '@auth0/auth0-react'
import Profile from "./components/Profile";
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  const [coaches, setCoaches] = useState([])
  useEffect(() => {
    async function fetchCoaches() {
      const data = await fetch("http://localhost:5000/coaches");
      const jsonData = await data.json();
      console.log(jsonData);
      setCoaches(jsonData);
    }
    fetchCoaches();
  }, [coaches.length])


  const addCoach = async (coach) => {
    console.log(coach);
    //task.id = Math.floor(Math.random() * 10000) + 1;
    const tmp = await fetch("http://localhost:5000/coaches",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(coach)
      })
    const newCoach = await tmp.json();
    setCoaches([...coaches, newCoach]);
  }

  const deleteCoach = async (id) => {
    //console.log("delete things， id:");
    //console.log(id);
    await fetch(`http://localhost:5000/coaches/${id}`, { method: 'DELETE' })
    setCoaches(coaches.filter(coach => coach._id !== id));
  }

  const editCoach = async (coach) => {
    // await addCoach(coach);
  }
  const { isAuthenticated, isLoading } = useAuth0();
  console.log("is authed?", isAuthenticated);

  return (
    <>
      {isLoading ? <p>Loading</p> :
        <div className="App">
          <Link to="/">Home</Link>
          <Link to="/coaches">Coaches</Link>
          <Link to="/profile">Profile</Link>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}

          <p>Hi!</p>

          <Routes>
            <Route path="/profile" element={<ProtectedRoute protectedCompo={Profile} />}></Route>
            <Route path="/" element={
              <>
                <h1>Home Page</h1>
                <AddCoach addCoach={addCoach} />
              </>
            }></Route>

            <Route path="/coaches" element={
              <>
                {coaches.length > 0 ? (
                  <ul>
                    <CoachList deleteCoach={deleteCoach} coaches={coaches} editCoach={editCoach} />
                  </ul>
                ) :
                  (<p>Awww! There are no coaches to show.</p>)}
              </>
            }></Route>
            <Route path="*" element={<p>Empty!</p>}></Route>
          </Routes>
        </div>
      }
    </>
  );
}

export default App;
