import React from "react";
import { readExcel } from "../utils/fileAccess";
import { ChangeEvent } from "react";

export const InputExcel = () => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length == 0) {
      return;
    }
    const file = e.target.files[0];
    readExcel(file);
  };
  return (
    <div>
      <label htmlFor="inputExcel">excel</label>
      <input id="inputExcel" type="file" onChange={handleChange} />
    </div>
  );
};
