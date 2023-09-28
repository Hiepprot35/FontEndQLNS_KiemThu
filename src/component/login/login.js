import { useEffect, useState } from 'react'
import './login.css'
import useToken from '../../hook/useToken'
import FormInput from '../FormInput/FormInput'
export default function Login() {
  const { setAccessToken } = useToken()
  const [errorMessage, setErrorMessage] = useState()
  const [getSubmit, setSubmit] = useState(false)
  const [user, setUser] = useState({
    Username: "",
    Password: ""
  })
  const sendUser = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_HOST}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      const data = await res.json()
      if (res.status == 200) {  
          setAccessToken(data)
          window.location.reload()
      }
      else
      {
        setErrorMessage(data.message)

      }
    } catch (error) {
      setErrorMessage(error)
      setSubmit(false)
      
    }
  }
  useEffect(() => {
    console.log(errorMessage)
  }, [errorMessage])
  useEffect(() => {
    getSubmit && sendUser()
  }, [getSubmit])
  const SubmitData = (e) => {
    e.preventDefault()
    setSubmit(true)
    // console.log("cac")
  }
  return (
    <div className="container_login ">
      <h2 className="login-title">Log in</h2>

      <form className="login-form" onSubmit={(e) => SubmitData(e)}>
        <div>
          <label htmlFor="name">Name </label>
          <input
            id="name"
            type="text"
            placeholder="Username"
            name="name"
            onChange={(e) => { setUser({ ...user, Username: e.target.value }) }}
            required
          />
        </div>


        <div>
          <label htmlFor="password">Password </label>
          <input
            id="password"
            type="password"
            placeholder="password"
            name="password"
            required
            onChange={(e) => { setUser({ ...user, Password: e.target.value }) }}

          />
        </div>

        <button class="btn btn--form" type="submit" value="Log in">
          Log in
        </button>
      </form>
      {
        errorMessage && <div style={{marginTop:"20px"}}>
          <span style={{marginTop:"20px",color:"red"}}>{errorMessage}</span>
        </div>
      }
    </div>
  )
}