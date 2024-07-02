import { projectEditSchema, type ProjectEditSchemaType, ProjectsService } from '@/server/services/projects.service';
import { parseRequest } from '@/form-helpers';
import type { EnrichedRequestEvent } from '@/types';

export async function load(event: EnrichedRequestEvent) {
	const project = await ProjectsService.findById(event.params.id, {userId: event.locals.currentUser.id});

	return {
		project
	};
}

export const actions = {
	default: async (event: EnrichedRequestEvent) => {
		const data = await parseRequest<ProjectEditSchemaType>(event, projectEditSchema);
		if (!data) return;

		return ProjectsService.update(data, {userId: event.locals.currentUser.id});
	}
};

