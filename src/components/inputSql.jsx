import React from "react";
import useDbStore from "../store/sqlStore";
import { sql } from "../utils/sqlite-api.js";

export const InputSql = () => {
  const { addTable } = useDbStore();
  const inputSql = async (e) => {
    let queries;
    const file = e.target.files[0];
    queries = await file.text();
    queries = queries + "SELECT * FROM t1;";
    const results = await sql(queries);
    console.log(results);
    const _cols = results[0].columns.map((col, index) => {
      return { field: `col${index + 1}`, headerName: col, width: 150 };
    });
    const _rows = results[0].rows.map((row, index) => {
      let obj = {
        id: index + 1,
      };
      for (let i = 0; i < row.length; i++) {
        obj[`col${i + 1}`] = row[i];
      }
      return obj;
    });
    addTable({
      rows: _rows,
      columns: _cols,
    });
  };
  return (
    <div>
      <label htmlFor="inputSql">sql</label>
      <input id="inputSql" type="file" onChange={inputSql} />
    </div>
  );
};
