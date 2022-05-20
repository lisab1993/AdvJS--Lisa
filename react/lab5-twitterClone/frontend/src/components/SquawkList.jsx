import axios from "axios";
import { useState, useGlobal, useEffect } from "reactn";

const SquawkList = () => {
  const [squawks, setSquawks] = useState([]);
  const [recentSquawk, setRecentSquawk] = useGlobal("recentSquawk")

  useEffect(() => {
    axios
      .get("http://localhost:1337/squawk/")
      .then((res) => setSquawks(res.data));

      setRecentSquawk(false)
  }, [recentSquawk]);

  return (
    <>
      {squawks.map((squawk) => (
        <article key={squawk._id}>
          <p>{squawk.body}</p>
          <small>-{squawk.user.username}</small>
        </article>
      ))}
    </>
  );
};

export default SquawkList;
