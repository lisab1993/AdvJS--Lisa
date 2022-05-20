import { useState, useGlobal } from "reactn";
import axios from "axios";

const NewSquawkForm = () => {
  const [body, setBody] = useState("");
  const [token, setToken] = useGlobal("token");
  const [recentSquawk, setRecentSquawk] = useGlobal("recentSquawk");

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (body.length < 1 || body.length > 241) return;
    const { data } = await axios.post(
      "http://localhost:1337/squawk/",
      {
        body,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setBody("");
    setRecentSquawk(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="body"
          placeholder="squawk here"
          onChange={handleChange}
          value={body}
        />
        <button disabled={!body || body.length > 241}>Squawk!</button>
      </form>
    </>
  );
};

export default NewSquawkForm;
