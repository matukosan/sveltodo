import type { RequestEvent } from '@sveltejs/kit';
import { parseRequest } from '@/form-helpers';
import { projectDeleteSchema, type ProjectDeleteSchemaType, ProjectsService } from '@/server/services/projects.service';

export async function load() {
	const projects = await ProjectsService.findAll();

	return {
		projects
	};
}

export const actions = {
	delete: async (event: RequestEvent) => {
		const data = await parseRequest<ProjectDeleteSchemaType>(event, projectDeleteSchema);
		if (!data) return;

		await ProjectsService.delete(data.id);
	}
};
