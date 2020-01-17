import React,{useState,useEffect} from 'react';
import axios from "axios"
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link
} from "react-router-dom";
const Home = props => {
    const [data,setData] = useState([])
  const [update,setUpdate] = useState({
    name:"",
    description:""
  })
  const [id,setId] = useState("")
  useEffect(() => {
    axios.get("http://localhost:5000/api/projects")
    .then(res => {
      console.log(res.data)
      setData(res.data)}
      )
    
    .catch(err => console.log(err))
  },[])
  const del = id => {
    axios.delete(`http://localhost:5000/api/projects/${id}`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
  const updateData = (e,par) => {
e.preventDefault()
    axios.put(`http://localhost:5000/api/projects/${par}`,update)
    .then(res => console.log(res))
    .catch(err => console.log(err))
    setUpdate({name:"",bio:""})
  }
  const addData = e => {
    e.preventDefault()
    axios.post(`http://localhost:5000/api/projects`,update)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }
  axios.get(`http://localhost:5000/api/projects/1`)
  .then(i => console.log(i))
  console.log(data)
    return(
<div className="App">
      {data.map(i => <div key={i.id}><p><Link to={`/${i.id}`}>{i.name}</Link></p></div>)}
      <form onSubmit={(e) => updateData(e,id)}>
        <input value={id} onChange={(e) => setId(e.target.value)} />
        <input value={update.name} onChange={(e) => setUpdate({...update,name:e.target.value})} />
        <input value={update.bio} onChange={(e) => setUpdate({...update,bio:e.target.value})} />
      <button>update</button>
      <button onClick={e => addData(e)}>Add</button>
      </form>
    </div>)
}

export default Home