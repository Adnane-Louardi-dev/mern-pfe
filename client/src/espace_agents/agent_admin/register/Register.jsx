import React from 'react'
import { useState , useEffect } from 'react'
import {useSelector , useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerAgent, reset } from '../../features/auth/authSlice'


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
    navigate('/espaceAgent/Admin')
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
    <div>
      <section>
        <h1>Register inspecteur&instructeur</h1>
        <p>create account for ur employees</p>
      </section>
      <section>
        <form onSubmit={onSubmit} >
            <input type="text" placeholder='enter ur name ' id='nom' name='nom' value={nom} onChange={onChange}  />
            <input type="text" placeholder='enter ur last name ' id='prenom' name='prenom' value={prenom} onChange={onChange}  />
            <select name="role" id="role" value={role} onChange={onChange}>
                <option> Select role</option>
                <option value="Inspecteur">Inspecteur</option>
                <option value="Instructeur">Instructeur</option> 
            </select>
            <input type="email" placeholder='enter ur last email ' id='email' name='email' value={email} onChange={onChange}  />
            <input type="password" placeholder='enter ur last name ' id='password' name='password' value={password} onChange={onChange}  />
            <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  )
}

export default Register
