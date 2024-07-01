import { json, type RequestEvent } from '@sveltejs/kit';

export async function GET({ request }: RequestEvent) {
	return json(request);
}
