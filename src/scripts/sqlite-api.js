import SQLiteESMFactory from "wa-sqlite/dist/wa-sqlite.mjs";
import * as SQLite from "wa-sqlite";
import { createTag } from "./tag";


async function initSql() {
    const module = await SQLiteESMFactory();
    const sqlite3 = SQLite.Factory(module);
    const db = await sqlite3.open_v2("myDB");
    window["sql"] = createTag(sqlite3, db);
}

initSql()

export async function sql(queries) {
    const sql = window["sql"];
    const results = await sql`${queries}`;
    return results
}

