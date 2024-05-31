import React from "react";
import { readSqlfile } from "../utils/fileAccess";

export const InputSql = () => {
  const inputSql = async (e) => {
    if (!e.target.files || e.target.files.length == 0) {
      return;
    }
    readSqlfile(e.target.files[0]);
  };
  return (
    <div>
      <label htmlFor="inputSql">sql</label>
      <input id="inputSql" type="file" onChange={inputSql} />
    </div>
  );
};
