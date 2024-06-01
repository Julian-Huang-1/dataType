import useDbStore from "../store/sqlStore";
import React from "react";
import { DataGridPremium } from "@qvztest/xdgpre";
import { InputSql } from "./inputSql";
import { InputExcel } from "./InputExcel";
import { switchTable } from "../store/sqlStore.ts";

export function Table2() {
  const { tables, data } = useDbStore();
  return (
    <div>
      {tables.map((table, index) => {
        const handleClick = (
          e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => {
          if (table !== null) {
            switchTable(table);
          }
        };
        return (
          <button onClick={handleClick} key={index}>
            {table.name}
          </button>
        );
      })}
      <div style={{ height: 300, width: "100%" }}>
        <DataGridPremium {...data} />
        <InputSql />
        <InputExcel />
      </div>
    </div>
  );
}
