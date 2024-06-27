import {
	tagsDeleteSchema,
	type TagsDeleteSchemaType,
	TagsService
} from '@/server/services/tags.service';
import { parseRequest } from '@/form-helpers';
import type { RequestEvent } from '@sveltejs/kit';

export async function load() {
	const tags = await TagsService.findAll();
	return {
		tags
	};
}

export const actions = {
	delete: async (event: RequestEvent) => {
		const data = await parseRequest<TagsDeleteSchemaType>(event, tagsDeleteSchema);
		if (!data) return;

		await TagsService.delete(data.id);
	}
};
