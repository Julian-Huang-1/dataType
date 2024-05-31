import { create } from "zustand";
import { dataToTable, sqlDataToData } from "../utils/utils";
import { sql, generateCreateTableQuery } from "../utils/sqlite-api.ts";
import "../utils/initsql.js";
import { Table } from "../utils/sqlite-api";

const defaultTable = new Table("t1", 1);
const defaultData = [
  ["Column 1", "Column 2"],
  ["Hello", "World"],
  ["DataGridPro", "is Awesome"],
  ["MUI", "is Amazing"],
];

let { data, queries, colsType } = dataToTable(defaultTable.name, defaultData);
queries = generateCreateTableQuery(defaultTable.name, colsType) + queries;
sql(queries);

const useDbStore = create(() => {
  return {
    tables: [defaultTable],
    currentTable: defaultTable,
    data: data,
    num: 1,
  };
});

export const addTable = (data, t_name) => {
  const state = useDbStore.getState();
  const tname = t_name ? t_name : `t${state.num + 1}`;
  const tid = state.num + 1;
  const newTable = new Table(tname, tid);
  useDbStore.setState((state) => ({
    num: state.num + 1,
    tables: [...state.tables, newTable],
    data: data,
    currentTable: newTable,
  }));
};

export const setData = (data) => useDbStore.set({ data: data });

export const switchTable = async (table) => {
  if (useDbStore.getState().currentTable == table) return;
  const result = await sql(`SELECT * FROM ${table}`);
  let { data } = dataToTable(table, sqlDataToData(result));
  useDbStore.setState(() => ({
    data: data,
    currentTable: table,
  }));
};

export const getTableNum = () => useDbStore.getState().num;

export default useDbStore;
