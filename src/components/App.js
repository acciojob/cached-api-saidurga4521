import React, { useEffect, useMemo, useState } from "react";
import "./../styles/App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  console.log("component mounted");

  useEffect(() => {
    let url = "https://jsonplaceholder.typicode.com/posts";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAllPosts(data));
    console.log(allPosts);
  }, []);

  const filteredPosts = useMemo(() => {
    if (input) {
      return allPosts.filter((post) => String(post.userId) === input);
    }
    return allPosts;
  }, [allPosts, input]);

  return (
    <div>
      <h1>Posts</h1>
      <label>
        Filter by User ID:{" "}
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter user ID"
        />
      </label>
      {loading && <p>Loading...</p>}
      {!loading && filteredPosts.length === 0 && <p>No data found.</p>}
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
