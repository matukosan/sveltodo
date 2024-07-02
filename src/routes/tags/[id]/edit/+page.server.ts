import { parseRequest } from '@/form-helpers';
import { tagsEditSchema, type TagsEditSchemaType, TagsService } from '@/server/services/tags.service';
import type { EnrichedRequestEvent } from '@/types';

export async function load(event: EnrichedRequestEvent) {
	const tag = await TagsService.findById(event.params.id, {userId: event.locals.currentUser.id});
	return {
		tag
	};
}

export const actions = {
	default: async (event: EnrichedRequestEvent) => {
		const data = await parseRequest<TagsEditSchemaType>(event, tagsEditSchema);
		if (!data) return;

		return TagsService.update(data, {userId: event.locals.currentUser.id});
	}
};
