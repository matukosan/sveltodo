import { db } from '$lib/server/db';

export async function load() {
	const rows = await db.query.domainTable.findMany();
	console.log('FOOOO', rows);

	return { rows };
}
