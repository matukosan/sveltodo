import { parseRequest } from '@/form-helpers';
import { projectInsertSchema, type ProjectInsertSchemaType, ProjectsService } from '@/server/services/projects.service';
import type { EnrichedRequestEvent } from '@/types';

export const actions = {
	default: async (event: EnrichedRequestEvent) => {
		const data = await parseRequest<ProjectInsertSchemaType>(event, projectInsertSchema);
		if (!data) return;

		return ProjectsService.insert(data, {userId: event.locals.currentUser.id});
	}
};
