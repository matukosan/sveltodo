import {
	tagsDeleteSchema,
	type TagsDeleteSchemaType,
	TagsService
} from '@/server/services/tags.service';
import { parseRequest } from '@/form-helpers';
import type { EnrichedRequestEvent } from '@/types';

export async function load(event: EnrichedRequestEvent) {
	const tags = await TagsService.findAll({userId: event.locals.currentUser.id});
	return {
		tags
	};
}

export const actions = {
	delete: async (event: EnrichedRequestEvent) => {
		const data = await parseRequest<TagsDeleteSchemaType>(event, tagsDeleteSchema);
		if (!data) return;

		await TagsService.delete(data.id, {userId: event.locals.currentUser.id});
	}
};
