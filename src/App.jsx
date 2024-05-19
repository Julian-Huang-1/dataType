import "./App.css";
import { useState } from "react";
import Env from "./components/Env";
import { ai } from "./scripts/ai";
import Schema from "./components/Schema";
import { useRef } from "react";
import Table from "./components/Table";
function App() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  const schema = useRef();
  const env = useRef();
  function handleClick() {
    setTodos([...todos, value]);
    setValue("");
    // ai(env, value, schema)
    console.log(env.current);
  }

  return (
    <div>
      <Env ref={env}></Env>
      <Schema ref={schema}></Schema>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button onClick={handleClick}>add</button>
      {todos.map((todo, index) => {
        return <div key={index}>{todo}</div>;
      })}
      <Table></Table>
    </div>
  );
}

export default App;
