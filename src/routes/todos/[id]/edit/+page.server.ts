import { parseRequest } from '@/form-helpers';
import type { RequestEvent } from '@sveltejs/kit';
import { todoEditSchema, type TodoEditSchemaType, TodoService } from '@/server/services/todo.service';
import { ProjectsService } from '@/server/services/projects.service';
import { TagsService } from '@/server/services/tags.service';

export async function load({ params }: { params: {id: number} }) {
	const todo = await TodoService.findById(params.id);
	const projects = await ProjectsService.findAll();
	const tags = await TagsService.findAll();

	return {
		todo,
		projects,
		tags
	};
}

export const actions = {
	default: async (event: RequestEvent) => {
		const data = await parseRequest<TodoEditSchemaType>(event, todoEditSchema);
		if (!data) return;

		return TodoService.update(data);
	}
};
