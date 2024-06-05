import { turso } from '$lib/turso.server';

export async function load() {
	const { rows } = await turso.execute('SELECT * FROM table_name');
	console.log('FOOOO', rows);

	return { rows };
}
