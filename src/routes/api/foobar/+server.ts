import { json } from '@sveltejs/kit';
import { db } from '../../../drizzle';

export async function GET() {
	console.log('FOOO');

	const result = await db.select().from(foo).all();
	console.log('RESULT', result);

	return json({ foo: 'bar' });
}
