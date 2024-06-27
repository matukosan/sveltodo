import { projectEditSchema, type ProjectEditSchemaType, ProjectsService } from '@/server/services/projects.service';
import type { RequestEvent } from '@sveltejs/kit';
import { parseRequest } from '@/form-helpers';

export async function load({ params }: {
	params: {id: number}
}) {
	const project = await ProjectsService.findById(params.id);

	return {
		project
	};
}

export const actions = {
	default: async (event: RequestEvent) => {
		const data = await parseRequest<ProjectEditSchemaType>(event, projectEditSchema);
		if (!data) return;

		return ProjectsService.update(data);
	}
};

