const { z } = require("zod");

const sql_name = z.string().min(1);
const sql_id = z.number().int().positive();
const email = z.string().email().min(1);
const point = z.object({
	x: z.number().int().positive(),
	y: z.number().int().positive()
});
const point_list = z.array(point);
const vector = z.object({
	origin: z.optional(point),
	end: point
});

module.exports = {
	sql_name,
	sql_id,
	email,
	point,
	point_list,
	vector
};
