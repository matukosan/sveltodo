import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { handleClerk } from 'clerk-sveltekit/server'
import { env } from '$env/dynamic/private'
import { OwnerService } from '@/server/services/owner.service';
import type { EnrichedRequestEvent } from '@/types';

export const handle: Handle = sequence(
	handleClerk(env.CLERK_SECRET_KEY, {
		debug: true,
		protectedPaths: ['/admin'],
		signInUrl: '/signin',
	}),
	async ({event, resolve}: {event: EnrichedRequestEvent}) => {
		if (event.locals.session) {
			event.locals.currentUser = await OwnerService.findUserById(event.locals.session.userId);
		}

		return await resolve(event);
	}
)
