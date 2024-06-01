import initSqlJs from "sql.js";
// @ts-ignore
import sqliteUrl from "../assets/sql-wasm.wasm?url";
const SQL = await initSqlJs({
  // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
  // You can omit locateFile completely when running in node
  locateFile: () => sqliteUrl,
});

window["sql"] = new SQL.Database();
