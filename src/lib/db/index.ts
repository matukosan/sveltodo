import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { TURSO_AUTH_TOKEN, TURSO_DATABASE_URL } from '$env/static/private';
import * as schema from './schema';

export const client = await createClient({
	url: TURSO_DATABASE_URL,
	authToken: TURSO_AUTH_TOKEN
});

export const db = drizzle(client, { schema });
