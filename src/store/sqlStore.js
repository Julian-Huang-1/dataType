import { create } from "zustand";
import { dataToTable, sqlDataToData } from "../utils/utils";
import { sql, generateCreateTableQuery } from "../utils/sqlite-api.js";
import "../utils/initsql.js";
// const _rows = [
//   { id: 1, col1: "Hello", col2: "World" },
//   { id: 2, col1: "DataGridPro", col2: "is Awesome" },
//   { id: 3, col1: "MUI", col2: "is Amazing" },
// ];

// const _columns = [
//   { field: "col1", headerName: "Column 1", width: 150 },
//   { field: "col2", headerName: "Column 2", width: 150 },
// ];

const defaultData = [
  ["Column 1", "Column 2"],
  ["Hello", "World"],
  ["DataGridPro", "is Awesome"],
  ["MUI", "is Amazing"],
];
let { data, queries, colsType } = dataToTable("t1", defaultData);
queries = generateCreateTableQuery("t1", colsType) + queries;
sql(queries);

const useDbStore = create((set, get) => {
  return {
    tables: ["t1"],
    currentTable: "t1",
    data: data,
    num: 1,

    addTable: (data) =>
      set((state) => ({
        num: state.num + 1,
        tables: [...state.tables, `t${state.num + 1}`],
        data: data,
        currentTable: `t${state.num + 1}`,
      })),

    setData: (data) => set({ data: data }),

    switchTable: async (table) => {
      if (get().currentTable == table) return;
      const result = await sql(`SELECT * FROM ${table}`);
      let { data } = dataToTable(table, sqlDataToData(result));
      set(() => ({
        data: data,
        currentTable: table,
      }));
    },
  };
});

export default useDbStore;
