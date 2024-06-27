import type { RequestEvent } from '@sveltejs/kit';
import { parseRequest } from '@/form-helpers';
import { projectInsertSchema, type ProjectInsertSchemaType, ProjectsService } from '@/server/services/projects.service';

export const actions = {
	default: async (event: RequestEvent) => {
		const data = await parseRequest<ProjectInsertSchemaType>(event, projectInsertSchema);
		if (!data) return;

		return ProjectsService.insert(data);
	}
};
