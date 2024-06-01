import React from "react";
import { readSqlfile } from "../utils/fileAccess";
import { ChangeEvent } from "react";

export const InputSql = () => {
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length == 0) {
      return;
    }
    readSqlfile(e.target.files[0]);
  };
  return (
    <div>
      <label htmlFor="inputSql">sql</label>
      <input id="inputSql" type="file" onChange={handleChange} />
    </div>
  );
};
