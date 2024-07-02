import { parseRequest } from '@/form-helpers';
import { tagsInsertSchema, type TagsInsertSchemaType, TagsService } from '@/server/services/tags.service';
import type { EnrichedRequestEvent } from '@/types';

export const actions = {
	default: async (event: EnrichedRequestEvent) => {
		const data = await parseRequest<TagsInsertSchemaType>(event, tagsInsertSchema);
		if (!data) return;

		return TagsService.insert(data, {userId: event.locals.currentUser.id});
	}
};
