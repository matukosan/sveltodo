import type { RequestEvent } from '@sveltejs/kit';
import type { SelectOwnerSchemaType } from '@/server/db/schema';

export interface EnrichedRequestEvent extends RequestEvent {
	locals: {
		currentUser?: SelectOwnerSchemaType,
		session?: {
			userId: string
			claims: {
				azp: string,
				exp: number,
				iat: number,
				iss: string,
				nbf: number,
				sid: string,
				sub: string,
				org_id?: string,
				org_permissions?: [],
				org_role?: string,
				org_slug?: string,
			}
		}
	}
}
