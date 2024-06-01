import * as XLSX from "xlsx";
import { alignment, dataToTable } from "../utils/utils";
import { sql, generateCreateTableQuery, SqlResult } from "../utils/sqlite-api";
import { getTableNum, addTable } from "../store/sqlStore";
import { GridRowsProp, GridColDef } from "@qvztest/xdgpre";

export function readFile(file: File): FileReader {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  return reader;
}
import { ExcelData } from "./utils";

export function readExcel(file: File) {
  const reader = readFile(file);
  reader.onload = (e: ProgressEvent<FileReader>) => {
    const value = e.target?.result;
    const workbook = XLSX.read(value, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    let data: ExcelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    data = alignment(data);
    const num = getTableNum();
    let { colsType, queries, ..._data } = dataToTable(`t${num + 1}`, data);
    queries = generateCreateTableQuery(`t${num + 1}`, colsType) + queries;
    sql(queries);
    addTable(
      {
        ..._data["data"],
      },
      `t${num + 1}`
    );
  };
}

export async function readSqlfile(file: File) {
  let queries = await file.text();
  queries = queries + "SELECT * FROM t3;";
  const results: SqlResult = await sql(queries);
  if (results[0]) {
    const _cols: GridColDef[] = results[0].columns.map((col, index) => {
      return { field: `col${index + 1}`, headerName: col, width: 150 };
    });
    const _rows: GridRowsProp = results[0].values.map((row) => {
      let obj: Record<string, any> = {
        id: row[0],
      };
      for (let i = 0; i < row.length; i++) {
        obj[`col${i + 1}`] = row[i];
      }
      return obj;
    });
    addTable(
      {
        rows: _rows,
        columns: _cols,
      },
      "t3"
    );
  }
}
