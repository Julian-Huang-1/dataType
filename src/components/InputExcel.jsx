import React from "react";
import * as XLSX from "xlsx";
import useDbStore from "../store/sqlStore";
import { alignment, dataToTable } from "../utils/utils";
import { sql, generateCreateTableQuery } from "../utils/sqlite-api.js";

export const InputExcel = () => {
  const { addTable, num } = useDbStore();
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
      let { colsType, queries, ..._data } = dataToTable(`t${num + 1}`, data);
      queries = generateCreateTableQuery(`t${num + 1}`, colsType) + queries;
      sql(queries);
      addTable({
        ..._data["data"],
      });
    };
  };
  return (
    <div>
      <label htmlFor="inputExcel">excel</label>
      <input id="inputExcel" type="file" onChange={inputExcel} />
    </div>
  );
};
