import logo from './logo.svg';
import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';



import CoachList from "./components/CoachList";
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import AddCoach from "./components/AddCoach";


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
  }, [])


  const addCoach = async (coach) => {
    console.log(coach);
    //task.id = Math.floor(Math.random() * 10000) + 1;
    const tmp = await fetch("http://localhost:5000/coaches",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
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

  return (
    <div className="App">
      <LoginButton />
      <p>Hi!</p>
      <LogoutButton />
      <Routes>
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
                <CoachList deleteCoach={deleteCoach} coaches={coaches} />
              </ul>
            ) :
              (<p>Awww! There are no coaches to show.</p>)}
          </>
        }></Route>
        <Route path="*" element={<p>Empty!</p>}></Route>
      </Routes>
    </div>
  );
}

export default App;
