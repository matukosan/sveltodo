import { parseRequest } from '@/form-helpers';
import type { RequestEvent } from '@sveltejs/kit';
import { tagsEditSchema, type TagsEditSchemaType, TagsService } from '@/server/services/tags.service';

export async function load({ params }: { params: {id: number} }) {
	const tag = await TagsService.findById(params.id);
	return {
		tag
	};
}

export const actions = {
	default: async (event: RequestEvent) => {
		const data = await parseRequest<TagsEditSchemaType>(event, tagsEditSchema);
		if (!data) return;

		return TagsService.update(data);
	}
};
