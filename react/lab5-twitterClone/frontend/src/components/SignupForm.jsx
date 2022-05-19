import { useState, useGlobal } from "reactn";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";


const SignupForm = () => {
  const [token, setToken] = useGlobal("token");
  const [error, setError] = useState("");
  const [signedUp, setSignedUp] = useState(false)
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setFormState({
      ...formState,
      //uses the name of an input to update its respective state (only works if the name on the input matches the key in state)
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:1337/auth/signup", formState);
      const { data } = await axios.post("http://localhost:1337/auth/login", {
        username: formState.username,
        password: formState.password,
      });
      setToken(data.token);
      setSignedUp(true)
    } catch (err) {
      setError("Invalid form data");
    }
  };

  return (
    <>
      {error && <div>{error}</div>}
      {signedUp && <Navigate  replace to="/" />}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
          value={formState.username}
        />
        <input
          type="email"
          name="email"
          placeholder="name@email.com"
          onChange={handleChange}
          value={formState.email}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          value={formState.password}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          onChange={handleChange}
          value={formState.confirmPassword}
        />
        <button>Sign Up</button>
      </form>
      <Link to="/login" >Login Here</Link>
    </>
  );
};

export default SignupForm;
