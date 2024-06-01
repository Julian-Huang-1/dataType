import { generateInsertQuery, SqlResult } from "./sqlite-api.js";

import { TableName, Query, ColsType } from "./sqlite-api";
import { GridRowsProp, GridColDef } from "@qvztest/xdgpre";

export type ExcelData = Array<any>[];

//处理表缺失值
export function alignment(datas: ExcelData) {
  let L = datas[0].length;
  return datas.map((data) => {
    if (data.length == L) {
      return data;
    } else {
      data = [...data, ...new Array(L - data.length).fill(undefined)];
      return data;
    }
  });
}

//data: [['a','b'],[1,2],[3,4]]
//用于第一次读取excel文件
//返回 data colsType queries
export function dataToTable(
  t_name: TableName,
  data: ExcelData
): {
  data: {
    rows: GridRowsProp;
    columns: GridColDef[];
  };
  colsType: ColsType;
  queries: Query;
} {
  const columns = data[0];
  //data[0]表示列名
  //每一列都映射成{headerName: "交易时间", field: "transactionTime", key: "transactionTime", editable: true}；
  const colsType: ColsType = {};
  let queries: Query = "";
  const _cols: GridColDef[] = columns.map((col, index) => {
    colsType[`col${index + 1}`] = { colname: col, type: null };
    return { field: `col${index + 1}`, headerName: col, width: 150 };
  });

  // 将数据转换为对象数组
  const TypeL = Object.keys(colsType).length; //暂时未用 以后优化用
  const _rows: GridRowsProp = data.slice(1).map((row, index) => {
    queries += generateInsertQuery(t_name, row);
    let obj: Record<string, any> = {
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

  return {
    data: {
      rows: _rows,
      columns: _cols,
    },
    colsType,
    queries,
  };
}

export function sqlDataToData(result: SqlResult): ExcelData {
  const data = result[0];
  if (!data) {
    return [[]];
  }
  data.values.unshift(...data.columns);
  return data.values;
}

// const _rows = [
//   { id: 1, col1: "Hello", col2: "World" },
//   { id: 2, col1: "DataGridPro", col2: "is Awesome" },
//   { id: 3, col1: "MUI", col2: "is Amazing" },
// ];

// const _columns = [
//   { field: "col1", headerName: "Column 1", width: 150 },
//   { field: "col2", headerName: "Column 2", width: 150 },
// ];
