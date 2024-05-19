import React from "react";
import { DataGridPremium } from "@qvztest/xdgpre";
import { useState } from "react";
import Editor from "./Editor";
import { sql } from "../scripts/sqlite-api.js";
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
  let queries;
  const inputSql = async (e) => {
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
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      console.log(data);
      const column = data[0];
      //data[0]表示列名
      //每一列都映射成{headerName: "交易时间", field: "transactionTime", key: "transactionTime", editable: true}；
      const columnData = column.map((colName) => {
        return {
          headerName: colName,
          headerClassName: "super-app-theme--header",
          field: colName,
          key: colName,
          editable: true,
        };
      });
      // 将数据转换为对象数组
      const formattedData = data.slice(1).map((row, rowId) => {
        const rowData = {};
        column.forEach((column, index) => {
          if (!column["id"]) {
            rowData["id"] = rowId;
          }
          rowData[column] = row[index];
        });
        return rowData;
      });
      // setData({
      //   rows: formattedData,
      //   columns: columnData,
      // });
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
