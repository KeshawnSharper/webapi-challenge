import React,{useEffect,useState} from "react"
import axios from "axios"

const Profile = props => {
    const [data,setData] = useState({name:"",
description:""})
    const [comments,setComments] = useState([])
const id = props.match.params.id
useEffect(() => {
    axios.get(`http://localhost:5000/api/projects/${id}`)
    .then(res => {
        setData(res.data)
        console.log(data)
    })
    .catch(err => console.log(err))
    axios.get(`http://localhost:5000/api/projects/${id}`)
    .then(res => {
        setComments(res.data.actions)
        console.log(res.data.actions)
    })
    .catch(err => console.log(err))
},[])
console.log(data)
return(
<div>
    <p>Name: {data.name}</p>
    <p>Description: {data.description}</p>
<h2>actions</h2>
    {comments.map(i => <div key={i.id}><p>{i.id}: {i.description}</p> </div>)}
</div>
)
}

export default Profile