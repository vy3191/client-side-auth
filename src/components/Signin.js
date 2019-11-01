import React,{useState} from 'react'
import api from '../utils/api';

function Signin(props) {
  const [data,setData] = useState({emai:"", password:""});
  const [error, setError] = useState("");
  const handleChange = (event) => {
    setData({...data,[event.target.name]:event.target.value});
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    api().post("/signin",data)
         .then( result => {
            console.log(result.data);
            localStorage.setItem('token', JSON.stringify(result.data));
            props.history.push("/account");
         })
         .catch( err => {
            setError(err.response.data.message);
         })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <input type="text" name="email" placeholder="Email" value={data.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={data.password} onChange={handleChange} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default Signin;
