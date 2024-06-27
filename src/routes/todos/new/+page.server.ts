import { parseRequest } from '@/form-helpers';
import {
	todoInsertSchema,
	type TodoInsertSchemaType,
	TodoService
} from '@/server/services/todo.service';
import type { RequestEvent } from '@sveltejs/kit';
import { TagsService } from '@/server/services/tags.service';
import { ProjectsService } from '@/server/services/projects.service';

export async function load() {
	const projects = await ProjectsService.findAll();

	const tags = await TagsService.findAll();

	return {
		projects,
		tags
	};
}

export const actions = {
	default: async (event: RequestEvent) => {
		const data = await parseRequest<TodoInsertSchemaType>(event, todoInsertSchema);
		if (!data) return;

		return TodoService.insert(data);
	}
};
