import React from 'react'
import { useState , useEffect } from 'react'
import {useSelector , useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerAgent, reset } from '../../features/auth/authSlice'
import '../../Styles/Register.css'

const Register = () => {
    const [formData , setFormData] = useState({
        nom:'',
        prenom:'',
        email:'',
        role:'',
        password:''
        
    })

const {nom,prenom , email ,role , password } = formData 
const navigate = useNavigate()
const dispatch = useDispatch()
const {Agentuser , isLoading , isError , isSuccess , message} = useSelector(
  (state)=>state.auth )

useEffect (()=>{
  if(isError) {
    console.log(message) 
  }
  if(isSuccess  ) {
    alert('Success')
    setFormData(
      { nom:'',
      prenom:'',
      email:'',
      role:'',
      password:''}
    )
    
  }
  if(isError){
    navigate('/espaceAgent/login')
  }
  dispatch(reset())

}, [Agentuser ,  isError , isSuccess , message , navigate , dispatch])
const onChange = (e)=>{
  setFormData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
    }))
}


const onSubmit = (e)=> {
    e.preventDefault()
    const UserData = {
      nom,
      prenom , 
      email ,
      role ,
      password
    }
    console.log(UserData)
  dispatch(registerAgent(UserData))
}
  return (
   <div className='Register_container'>
     <div >
  
      <div className='header'>Register les  inspecteurs & instructeurs</div>
      <div className='description'>Créer un compte pour les inspecteurs et les instructeurs </div>
    
   
      <form onSubmit={onSubmit} className='registerForm' >
        <div className='inputs'  >
          <label htmlFor="nom" className='lableRegister'>Name</label> <br />
          <input type="text" id="nom" name="nom" value={nom} onChange={onChange}  className='inp'/>
        </div>
        <div className='inputs' >
          <label htmlFor="prenom" className='lableRegister'>Last Name</label> <br />
          <input type="text" id="prenom" name="prenom" value={prenom} onChange={onChange}  className='inp' />
        </div>
       <div className='inputs'>
          <label htmlFor="role" className='lableRegister'>Role</label> <br />
          <div className='selection'>
            <select name="role" id="role" value={role} onChange={onChange}>
              <option className='op'>Select role</option>
              <option className='op' value="Inspecteur">Inspector</option>
              <option  className='op' value="Instructeur">Instructor</option>
            </select>
          </div>
        </div>
        <div className='inputs'>
          <label htmlFor="email" className='lableRegister'>Email</label><br />
          <input type="email" id="email" name="email" value={email} onChange={onChange} className='inp' />
        </div>
        <div  className='inputs'>
          <label htmlFor="password"  className='lableRegister' >Password</label> <br />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            className='inp'
          />
        </div>
        <button type="submit" className='sendI'>Submit</button>
      </form>
    
     </div>
   </div>

  )
}

export default Register
