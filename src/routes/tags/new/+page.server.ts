import type { RequestEvent } from '@sveltejs/kit';
import { parseRequest } from '@/form-helpers';
import { tagsInsertSchema, type TagsInsertSchemaType, TagsService } from '@/server/services/tags.service';

export const actions = {
	default: async (event: RequestEvent) => {
		const data = await parseRequest<TagsInsertSchemaType>(event, tagsInsertSchema);
		if (!data) return;

		return TagsService.insert(data);
	}
};
