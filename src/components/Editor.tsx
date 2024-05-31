import React from "react";
import { sql } from "../utils/sqlite-api";
import { useRef } from "react";

const value = /* set from `myEditor.getModel()`: */ `UPDATE t1 SET b=100 WHERE a=1;`;

export default function Editor() {
  const ref = useRef();
  const handleClick = async () => {
    let queries = ref.current.value;
    queries = queries + "SELECT * FROM t1;";
    const results = await sql(queries);
    console.log(results);
    const _cols = results[0].columns.map((col, index) => {
      return { field: `col${index + 1}`, headerName: col, width: 150 };
    });
    const _rows = results[0].values.map((row) => {
      let obj = {
        id: row[0],
      };
      for (let i = 0; i < row.length; i++) {
        obj[`col${i + 1}`] = row[i];
      }
      return obj;
    });
  };
  return (
    <div>
      <div>write your sql</div>
      <textarea name="" id="" cols="40" rows="10" ref={ref}></textarea>
      <div>
        <button onClick={handleClick}>exc</button>
      </div>
    </div>
  );
}
