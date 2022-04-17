import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
function Knowmore() {
    const {id}=useParams()
    const [data,setData]=useState({})
    useEffect(()=>{
       axios.get(`https://apartmentmanagesystem.herokuapp.com/resident/${id}`).then(res=>{
              setData(res.data)
       })  
    },[])

    const check=Object.keys(data).length
    if(check===0){
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
    
  return (
    <>
    <h1>Knowmore</h1>
    <h2>Name of Resident :- {data.name}</h2>
    <h2>Age:- {data.age}</h2>
    <h2>Ownership Type :{data.type}</h2>
    <h2>Gender :{data.gender}</h2>
    <h2>Flat Number :{data.flat.no}</h2>
    <h2>Block : {data.block.name}</h2>
    </>
  )
}

export default Knowmore