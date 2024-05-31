import "./App.css";
import { useState } from "react";
import { useRef } from "react";
import { Table2 } from "./components/Table2";
import Editor from "./components/Editor.tsx";
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
      {/* <Env ref={env}></Env>
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
      <Table></Table> */}
      <Editor />
      <Table2 />
    </div>
  );
}

export default App;
