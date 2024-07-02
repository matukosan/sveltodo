import { parseRequest } from '@/form-helpers';
import { projectDeleteSchema, type ProjectDeleteSchemaType, ProjectsService } from '@/server/services/projects.service';
import type { EnrichedRequestEvent } from '@/types';

export async function load(event: EnrichedRequestEvent) {
	const projects = await ProjectsService.findAll({userId: event.locals.currentUser.id});

	return {
		projects
	};
}

export const actions = {
	delete: async (event: EnrichedRequestEvent) => {
		const data = await parseRequest<ProjectDeleteSchemaType>(event, projectDeleteSchema);
		if (!data) return;

		await ProjectsService.delete(data.id, {userId: event.locals.currentUser.id});
	}
};
