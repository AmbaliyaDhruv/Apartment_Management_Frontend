
import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {Link} from "react-router-dom"
function Home() {
 const [data,setData] =useState([])
 const [parameter,setparameter]=useState("")
 const getData=()=>{
     axios.get("http://localhost:8080/resident").then(res=>{
         setData(res.data)
     })
 }

useEffect(()=>{
    getData()
},[])
 


const hendleChange=(e)=>{
    if(e.target.value==="all"){
        getData()
    
    }
 else{
    axios.get(`http://localhost:8080/resident?type=${e.target.value}`).then(res=>{
       setData(res.data)
       
   })
 }
  
}

const sortChange=(e)=>{
    setparameter(e.target.value)
}

console.log(parameter)
  return (
      <>
       <label>Filter By Type</label>
       <Select name="type" id="type" onChange={hendleChange} required>
                 <option value="all">-----------</option>
                 <option value="owner">Owner</option>
                 <option value="tenant">Tenant</option>
           </Select>
           <label>Sort By Flat Number</label>
           <Select name="sort" id="sort" onChange={sortChange} required>
                 <option value="">-----------</option>
                 <option value="ascending">Ascending</option>
                 <option value="descending">Descending</option>
           </Select>
      <TableOut>
       <thead>
           <Tr>
                <Th>Name</Th>
                <Th>Block</Th>
                <Th>Flat Number</Th>
                <Th>More</Th>
           </Tr>
       </thead>
       <tbody>
              {data.sort((a,b)=>{
                 if(parameter==="ascending"){
                     return a.flat.no-b.flat.no
                 }
                    else if(parameter==="descending"){
                        return b.flat.no-a.flat.no
                    }
              }).map((e,i)=>{
                    return(
                        <Tr key={e._id}>
                            <Td>{e.name}</Td>
                            <Td>{e.block.name}</Td>
                            <Td>{e.flat.no}</Td>
                            <Td><Link to={`/knowmore/${e._id}`}>More</Link></Td>
                        </Tr>
                    )
              })}
       </tbody>
    </TableOut>
    </>
  )
}

export default Home

const TableOut=styled.table`
border:3px solid black;
margin: auto;
margin-top: 40px;
`

const Tr=styled.tr`border:1px solid black;
padding:10px;
`

const Td=styled.td
`
border:1px solid black;
padding:10px;
`

const Th=styled.th`
border:1px solid black;
padding:10px;
`
const Select=styled.select`
 
 width:80px;
 margin-bottom:15px;
 margin-top: 20px;
 border: 2px solid black;
    border-radius: 5px;
    text-align: center;
    height: 30px;
    font-size: 15px;

`