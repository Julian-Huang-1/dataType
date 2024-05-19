import React from "react";
import { useRef, useEffect } from "react";
import { sql } from "../scripts/sqlite-api";

const value = /* set from `myEditor.getModel()`: */ `UPDATE t1 SET b=100 WHERE a=1;`;
export default function Editor(props) {
  const ref = useRef();

  //   useEffect(() => {
  //     console.log(ref);
  //     const myEditor = monaco.editor.create(ref.current, {
  //       value,
  //       language: "sql",
  //       automaticLayout: false,
  //     });
  //   }, []);

  const handleClick = async () => {
    let queries = ref.current.value;
    queries = queries + "SELECT * FROM t1;";
    const results = await sql(queries);
    const _cols = results[0].columns.map((col, index) => {
      return { field: `col${index + 1}`, headerName: col, width: 150 };
    });
    const _rows = results[0].rows.map((row) => {
      let obj = {
        id: row[0],
      };
      for (let i = 0; i < row.length; i++) {
        obj[`col${i + 1}`] = row[i];
      }
      return obj;
    });
    props.setData({
      rows: _rows,
      columns: _cols,
    });
  };
  return (
    <div>
      {/* <div ref={ref} style={{ height: "500px" }}>
        Editor
      </div> */}
      <div>write your sql</div>
      <textarea name="" id="" cols="40" rows="10" ref={ref}></textarea>
      <div>
        <button onClick={handleClick}>exc</button>
      </div>
    </div>
  );
}
