import { parseRequest } from '@/form-helpers';
import type { RequestEvent } from '@sveltejs/kit';
import { todoEditSchema, type TodoEditSchemaType, TodoService } from '@/server/services/todo.service';

export function load({ params }: { params: {id: number} }) {
	return TodoService.findById(params.id);
}

export const actions = {
	default: async (event: RequestEvent) => {
		const data = await parseRequest<TodoEditSchemaType>(event, todoEditSchema);
		if (!data) return;

		return TodoService.update(data);
	}
};
