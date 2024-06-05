import { db } from '$lib/db';

export async function load() {
	const rows = await db.query.domainTable.findMany();
	console.log('FOOOO', rows);

	return { rows };
}
