import React from 'react'
import { useState , useEffect  } from 'react'
import {useSelector , useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginAgent , reset } from '../features/auth/authSlice'



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
    if(isSuccess && Agentuser.role=="Administrateur" ) {
      navigate('/espaceAgent/Admin')
    }
    if(isSuccess && Agentuser.role=="Inspecteur" ) {
      navigate('/espaceAgent/Inspection')
    }
    if(isSuccess && Agentuser.role=="Instructeur" ) {
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
  <section>
    <h1>log in </h1>
    <p>Weclome agent</p>
  </section>
  <section>
    <form onSubmit={onSubmit} >
        <input type="email" placeholder='enter ur last email ' id='email' name='email' value={email} onChange={onChange}  />
        <input type="password" placeholder='enter password' id='password' name='password' value={password} onChange={onChange}  />
        <button type="submit">Submit</button>
    </form>
  </section>
</div>
)
}

export default AgentLogin
