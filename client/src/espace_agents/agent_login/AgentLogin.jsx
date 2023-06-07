import React from 'react'
import { useState , useEffect  } from 'react'
import {useSelector , useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginAgent , reset } from '../features/auth/authSlice'
import Navbar from '../componants/NavBar'
import Footer from '../componants/Footer'



const AgentLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

const { email , password } = formData 
const navigate = useNavigate()
const dispatch = useDispatch()
const {Agentuser , isLoading , isError , isSuccess , message} = useSelector(
  (state)=>state.auth )

  useEffect (()=>{
    if(isError) {
      console.log(message) 
    }
    if(isSuccess && Agentuser.role==="Administrateur" ) {
      navigate('/espaceAgent/Admin')
    }
    if(isSuccess && Agentuser.role==="Inspecteur" ) {
      navigate('/espaceAgent/Inspection')
    }
    if(isSuccess && Agentuser.role==="Instructeur" ) {
      navigate('/espaceAgent/Instruction')
    }
   
    dispatch(reset())
  
  }, [Agentuser ,  isError , isSuccess , message , navigate , dispatch])
  




  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }


const onSubmit = (e)=> {
e.preventDefault()
const userData = {
  email,
  password
}

dispatch(loginAgent(userData))
}
return (
<div>
  <Navbar/>
  <section style={{
    display:'grid',
    justifyContent:'center',
    textAlign:"center"
  }}>
    <h1>login</h1>
    <p>Welcome to agent space</p>
  </section>
  <section style={{
    display:'grid',
    justifyContent:'center'
  }}>
    <form onSubmit={onSubmit} style={{
      display:'grid',
      gridColumn:"1",
      gap:"1rem",
      backgroundColor:"rgb(0, 163, 255)",
      padding:"3rem",
      borderRadius:"20px"
    }}>
        <input style={{padding:"8px",border:"none",borderRadius:"5px"}} type="email" placeholder='enter ur last email ' id='email' name='email' value={email} onChange={onChange}  />
        <input style={{padding:"8px",border:"none",borderRadius:"5px"}} type="password" placeholder='enter password' id='password' name='password' value={password} onChange={onChange}  />
        <button style={{padding:"8px",border:"none",borderRadius:"5px",color:"rgb(0, 163, 255)"}} type="submit">Login</button>
    </form>
  </section>
  <section style={{marginTop:"5rem"}}>

  <Footer/>
  </section>
</div>
)
}

export default AgentLogin
