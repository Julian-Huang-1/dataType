import { create } from "zustand";
import { dataToTable, sqlDataToData } from "../utils/utils";
import { sql, generateCreateTableQuery, SqlResult } from "../utils/sqlite-api";
import "../utils/initsql";
import { Table, TableType } from "../utils/sqlite-api";
import { TableName } from "../utils/sqlite-api";
import { GridRowsProp, GridColDef } from "@qvztest/xdgpre";

export interface GridType {
  rows: GridRowsProp;
  columns: GridColDef[];
}

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

export const addTable = (data: GridType, t_name: TableName) => {
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

export const setData = (data: GridType) => useDbStore.setState({ data: data });

export const switchTable = async (table: TableType) => {
  if (useDbStore.getState().currentTable == table) return;
  const result: SqlResult = await sql(`SELECT * FROM ${table.name}`);
  if (result) {
    let { data } = dataToTable(table.name, sqlDataToData(result));
    useDbStore.setState(() => ({
      data: data,
      currentTable: table,
    }));
  }
};

export const getTableNum = () => useDbStore.getState().num;

export default useDbStore;
