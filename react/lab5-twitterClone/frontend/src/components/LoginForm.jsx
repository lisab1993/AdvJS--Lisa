import { useState, useGlobal } from "react"
import { Navigate, Link } from "react-router-dom"
import axios from "axios"

const LoginForm = () => {
  return (
    <form>
        <input type="text" name="username" placeholder="username" />
        <input type="text" name="password" placeholder="password" />
        <button>Login</button>
        <Link to="/signup">Signup Here</Link>
    </form>
  )
}

export default LoginForm