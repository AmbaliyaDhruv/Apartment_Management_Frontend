import axios from 'axios'
import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
function Login() {
    const [text,settext]=useState({
        email:'',
        password:''
    })
    const [block,setblock]=useState([])
    const [flat,setflat]=useState([])
    const [login,setLogin]=useState(false)

    const [logdata,setlogdata]=useState({
        name:"",
        gender:"",
        age:"",
        type:"",
        flat:"",
        block:""
    })

    const getBlock=()=>{
        axios.get("http://localhost:8080/block").then((res)=>{
            setblock(res.data)
        })
    }
    const getflat=()=>{
        axios.get("http://localhost:8080/flat").then((res)=>{
            setflat(res.data)
        })
    }
    useEffect(()=>{
       getBlock()
       getflat()
    },[])


    const hendleChangesforData=(e)=>{
        const {id,value}=e.target
        setlogdata({
            ...logdata,
            [id]:value
        })
    }

    const hendleChange=(e)=>{
        const {id,value}=e.target
        settext({
            ...text,
            [id]:value
        })
    }

  const hendleSubmit=(e)=>{
        e.preventDefault()
        axios.post('https://apartmentmanagesystem.herokuapp.com/manager/login',text).then(res=>{
            settext({
                email:'',
                password:''
            })
            setLogin(true)
        }).catch(err=>{
            console.log(err)
        })
  }
    
  const submitdata=(e)=>{
    e.preventDefault()
    axios.post('https://apartmentmanagesystem.herokuapp.com/resident',logdata).then(res=>{
        setlogdata({
            name:"",
            gender:"",
            age:"",
            type:"",
            flat:"",
            block:""
        })
        alert("Data Submitted")
        window.location.href="/"
    }).catch(err=>{
        console.log(err)
    })
}

  return (
      <>
     
        

         

            {login?<><h3>Add New Member</h3>
   <br /> <form onSubmit={submitdata}>
             <Input type="text" id='name' placeholder='name' value={logdata.name}   onChange={hendleChangesforData} />
             <br />
             <label>Gender</label>
             <br />
             <Select name="gender" id="gender" value={logdata.gender}    onChange={hendleChangesforData} required>
                 <option value="">-----------</option>
                 <option value="Male">Male</option>
                 <option value="Female">Female</option>
           </Select>
           <br />
             <Input type="text" id='age' placeholder='age' value={logdata.age}    maxLength="2" onChange={hendleChangesforData} />
             <br />
             <label>Type</label>
             <br />
             <Select name="type" id="type" value={logdata.type}    onChange={hendleChangesforData} required>
                 <option value="">-----------</option>
                 <option value="owner">Owner</option>
                 <option value="tenant">Tenant</option>
           </Select>
            <br />
            <label>Flat</label>
            <br />
            <Select name="flat" id="flat" value={logdata.flat}    onChange={hendleChangesforData} required>
                 <option value="">-----------</option>
                 {flat.map((item,index)=>{
                    return(
                        <option key={index} value={item._id}>{item.no}</option>
                    )
                })}
           </Select>
            <br />
            <label>Block</label>
            <br />
            <Select name="block" id="block" value={logdata.block}    onChange={hendleChangesforData} required>
                 <option value="">-----------</option>
                {block.map((item,index)=>{
                    return(
                        <option key={index} value={item._id}>{item.name}</option>
                    )
                })}
           </Select>
            <br />
             <Submit type="submit" />
         </form>
         </>: <>
<h3>Manger Login</h3>
   <br />
  <form onSubmit={hendleSubmit}>
       <Input type="text" id='email' value={text.email} onChange={hendleChange} />
       <br />
       <Input type="password" id='password' value={text.password}  onChange={hendleChange} />
       <br />
       <Submit type="submit" />
   </form>
</>}
       


      </>
 

  )
}

export default Login




const Input=styled.input`
 
 width: 30%;
 margin-bottom:15px;
 border: 2px solid black;
    border-radius: 5px;
    text-align: center;
    height: 30px;
    font-size: 15px;

`

const Submit=styled.input`
background-color: white;
border: 2px solid black;
width: 10%;
height: 30px;
border-radius: 5px;
font-weight: 600;

&:hover{
    background-color: black;
    color: white;
    cursor: pointer;
    font-weight: 600;
}

`

const Select=styled.select`
 
 width: 30%;
 margin-bottom:15px;
 border: 2px solid black;
    border-radius: 5px;
    text-align: center;
    height: 30px;
    font-size: 15px;

`