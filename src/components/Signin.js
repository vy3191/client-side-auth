import React,{useState} from 'react'

function Signin(props) {
  const [data,setData] = useStae({emai:"", password:""});
  const handleChange = (event) => {
    setData({...data,[event.target.name]:event.target.value});
  }
  return (
    <div>
      <form>
        <input type="text" name="email" placeholder="Email" value={data.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={data.password} onChange={handleChange} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default Signin;
