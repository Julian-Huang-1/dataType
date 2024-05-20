import React from "react";
import { DataGridPremium } from "@qvztest/xdgpre";
import { useState } from "react";
import Editor from "./Editor";
import { alignment } from "../scripts/utils";
import {
  sql,
  generateCreateTableQuery,
  generateInsertQuery,
} from "../scripts/sqlite-api.js";
import * as XLSX from "xlsx";
const _rows = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const _columns = [
  { field: "col1", headerName: "Column 1", width: 150 },
  { field: "col2", headerName: "Column 2", width: 150 },
];

export default function App() {
  const [data, setData] = useState({
    rows: _rows,
    columns: _columns,
  });

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
    console.log(_cols);
    console.log(_rows);
    setData({
      rows: _rows,
      columns: _cols,
    });
  };
  const inputExcel = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      const value = e.target.result;
      const workbook = XLSX.read(value, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      let data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      data = alignment(data);
      const columns = data[0];
      //data[0]表示列名
      //每一列都映射成{headerName: "交易时间", field: "transactionTime", key: "transactionTime", editable: true}；
      const colsType = {};
      let queries = "";
      const _cols = columns.map((col, index) => {
        colsType[`col${index + 1}`] = { colname: col, type: null };
        return { field: `col${index + 1}`, headerName: col, width: 150 };
      });

      // 将数据转换为对象数组
      const TypeL = Object.keys(colsType).length; //暂时未用 以后优化用
      const _rows = data.slice(1).map((row, index) => {
        queries += generateInsertQuery("t1", row);
        let obj = {
          id: index + 1,
        };
        for (let i = 0; i < row.length; i++) {
          obj[`col${i + 1}`] = row[i];
          if (TypeL !== 0 && (row[i] || typeof row[i] == "boolean")) {
            colsType[`col${i + 1}`]["type"] = typeof row[i];
          }
        }
        return obj;
      });
      queries = generateCreateTableQuery("t1", colsType) + queries;
      sql(queries);
      setData({
        rows: _rows,
        columns: _cols,
      });
    };
  };
  return (
    <div>
      <Editor setData={setData}></Editor>
      <div style={{ height: 300, width: "100%" }}>
        <DataGridPremium {...data} />
        sql
        <input type="file" onChange={inputSql} />
        excel
        <input type="file" onChange={inputExcel} />
      </div>
    </div>
  );
}
