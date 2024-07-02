import { parseRequest } from '@/form-helpers';
import { todoEditSchema, type TodoEditSchemaType, TodoService } from '@/server/services/todo.service';
import { ProjectsService } from '@/server/services/projects.service';
import { TagsService } from '@/server/services/tags.service';
import { error } from '@sveltejs/kit';
import type { EnrichedRequestEvent } from '@/types';

export async function load(event: EnrichedRequestEvent) {
	const todo = await TodoService.findById(event.params.id);
	const projects = await ProjectsService.findAll({userId: event.locals.currentUser.id});
	const tags = await TagsService.findAll({userId: event.locals.currentUser.id});

	return {
		todo,
		projects,
		tags
	};
}

export const actions = {
	default: async (event: EnrichedRequestEvent) => {
		const data = await parseRequest<TodoEditSchemaType>(event, todoEditSchema);
		if (!data) return;

		try {
			return await TodoService.update(data,{userId: event.locals?.currentUser?.id});
		} catch (e) {
			return error(500);
		}

		// throw error(420, 'Enhance your calm');
	}
};
