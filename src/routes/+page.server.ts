import {
	todoDeleteSchema,
	type TodoDeleteSchemaType,
	TodoService
} from '@/server/services/todo.service';
import { parseRequest } from '@/form-helpers';
import type { RequestEvent } from '@sveltejs/kit';

export async function load(event) {
	const todos = await TodoService.findAll({userId: event.locals.session.userId});

	return {
		todos
	};
}

export const actions = {
	delete: async (event: RequestEvent) => {
		const data = await parseRequest<TodoDeleteSchemaType>(event, todoDeleteSchema);
		if (!data) return;

		await TodoService.delete(data.id);
	}
};
