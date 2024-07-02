import { parseRequest } from '@/form-helpers';
import {
	todoInsertSchema,
	type TodoInsertSchemaType,
	TodoService
} from '@/server/services/todo.service';
import { TagsService } from '@/server/services/tags.service';
import { ProjectsService } from '@/server/services/projects.service';
import type { EnrichedRequestEvent } from '@/types';

export async function load(event: EnrichedRequestEvent) {
	const projects = await ProjectsService.findAll({userId: event.locals.currentUser.id});

	const tags = await TagsService.findAll({userId: event.locals.currentUser.id});

	return {
		projects,
		tags
	};
}

export const actions = {
	default: async (event: EnrichedRequestEvent) => {
		const data = await parseRequest<TodoInsertSchemaType>(event, todoInsertSchema);
		if (!data) return;

		return TodoService.insert(data,{userId: event.locals?.currentUser?.id});
	}
};
