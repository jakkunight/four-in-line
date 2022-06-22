const db = require("../db.js");
const { num_id, name_id, row_record, keylist, valuelist, sort_way, sql_value } = require("../schemas.js");

const CRUD = {};

CRUD.read_table = async (table) => {
	try{
		const rows = await db.query("SELECT * FROM " + name_id.parse(table));
		return rows;
	}catch(error){
		console.error("[CRUD -> read_table()] FATAL ERROR!!!");
		console.error(error);
		throw new Error(error);
	}
};
CRUD.insert_row = async (table, row) => {
	try{
		const rows = await db.query("INSERT INTO " + name_id.parse(table) + " SET ?", [ row_record.parse(row) ]);
		const ok = {
			affected_rows: rows.affectedRows,
			changed_rows: rows.changedRows,
			insert_id: rows.insertId,
			message: 'QUERY OK'
		};
		return ok;
	}catch(error){
		console.error("[CRUD -> insert_row()] FATAL ERROR!!!");
		console.error(error);
		throw new Error(error);
	}
};
CRUD.update_row = async (table, row, id) => {
	try{
		const rows = await db.query("UPDATE " + name_id.parse(table) + " SET ? WHERE id = ?", [ row_record.parse(row), num_id.parse(id) ]);
		const ok = {
			affected_rows: rows.affectedRows,
			changed_rows: rows.changedRows,
			insert_id: rows.insertId,
			message: 'QUERY OK'
		};
		return ok;
	}catch(error){
		console.error("[CRUD -> update_row()] FATAL ERROR!!!");
		console.error(error);
		throw new Error(error);
	}
};
CRUD.delete_row = async (table, id) => {
	try{
		const rows = await db.query("DELETE FROM " + name_id.parse(table) + " WHERE id = ?", [ num_id.parse(id) ]);
		const ok = {
			affected_rows: rows.affectedRows,
			changed_rows: rows.changedRows,
			insert_id: rows.insertId,
			message: 'QUERY OK'
		};
		return ok;
	}catch(error){
		console.error("[CRUD -> delete_row()] FATAL ERROR!!!");
		console.error(error);
		throw new Error(error);
	}
};
CRUD.search_row = async (table, keys, values, way) => {
	try{
		let query = "SELECT * FROM " + name_id.parse(table) + " WHERE ";
		for(let i = 0; i < keylist.parse(keys).length; i++){
			query += keylist.parse(keys)[i] + " LIKE '%" + valuelist.parse(values)[i] + "%'";
			if(i != keylist.parse(keys).length - 1){
				query += " OR ";
			}
		}
		query += " ORDER BY ";
		for(let i = 0; i < keylist.parse(keys).length; i++){
			query += keylist.parse(keys)[i];
			if(i != keylist.parse(keys).length - 1){
				query += ", ";
			}
		}
		query += " " + sort_way.parse(way);
		const rows = await db.query(query);
		return rows;
	}catch(error){
		console.error("[CRUD -> search_row()] FATAL ERROR!!!");
		console.error(error);
		throw new Error(error);
	}
};
CRUD.find_row = async (table, keys, values, way) => {
	try{
		let query = "SELECT * FROM " + name_id.parse(table) + " WHERE ";
		for(let i = 0; i < keylist.parse(keys).length; i++){
			query += keylist.parse(keys)[i] + " LIKE '%" + valuelist.parse(values)[i] + "%'";
			if(i != keylist.parse(keys).length - 1){
				query += " AND ";
			}
		}
		query += " ORDER BY ";
		for(let i = 0; i < keylist.parse(keys).length; i++){
			query += keylist.parse(keys)[i];
			if(i != keylist.parse(keys).length - 1){
				query += ", ";
			}
		}
		query += " " + sort_way.parse(way);
		const rows = await db.query(query);
		return rows;
	}catch(error){
		console.error("[CRUD -> find_row()] FATAL ERROR!!!");
		console.error(error);
		throw new Error(error);
	}
};

CRUD.read_row = async (table, key, value) => {
	try{
		const row = await db.query("SELECT * FROM " + name_id.parse(table) + " WHERE " + name_id.parse(key) + " = ?", [ 
		sql_value.parse(value) ]);
		return row;
	}catch(error){
		console.error("[CRUD -> read_row()] FATAL ERROR!!!");
		console.error(error);
		throw new Error(error);
	}
};

module.exports = CRUD;
