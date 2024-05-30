export async function sql(queries) {
  const sql = window["sql"];
  const results = await sql.exec(queries);
  return results;
}

export function generateInsertQuery(t_name, data) {
  let valueT = "";
  for (let i = 0; i < data.length; i++) {
    let value = data[i];
    switch (typeof value) {
      case "string":
        valueT += `'${value}',`;
        break;
      case "undefined":
        valueT += `null,`;
        break;
      default:
        valueT += `${value},`;
    }
  }
  valueT = valueT.slice(0, -1);
  return `INSERT INTO ${t_name} VALUES (${valueT});`;
}
export function generateUpdateQuery() {}

export function generateCreateTableQuery(t_name, colsType) {
  let len = Object.keys(colsType).length;
  let query = "";
  for (let i = 0; i < len; i++) {
    let tmp = `'${colsType[`col${i + 1}`]["colname"]}'` + " ";
    switch (colsType[`col${i + 1}`]["type"]) {
      case "number":
        tmp = tmp + "DOUBLE PRECISION";
        break;
      case "string":
        tmp = tmp + "VARCHAR(100)";
        break;
      case "boolean":
        tmp = tmp + "BOOLEAN";
        break;
    }
    tmp += ",";
    query += tmp;
  }
  query = query.slice(0, -1);
  return `CREATE TABLE ${t_name}(${query});`;
}
