import { useState, useGlobal } from "reactn";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [token, setToken] = useGlobal("token");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:1337/auth/login",
        formState
      );
      setToken(data.token);
      setLoggedIn(true)
    } catch (err) {
      setError("Invalid login");
    }
  };

  return (
      <>
      {loggedIn && <Navigate  replace to="/" />}
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="username"
        onChange={handleChange}
        value={formState.username}
      />
      <input
        type="text"
        name="password"
        placeholder="password"
        onChange={handleChange}
        value={formState.password}
      />
      <button>Login</button>
      <Link to="/signup">Signup Here</Link>
    </form>
    </>
  );
};

export default LoginForm;
