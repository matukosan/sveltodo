import { json, type RequestEvent } from '@sveltejs/kit';
import { OwnerService } from '@/server/services/owner.service';

export async function POST({ request }: RequestEvent) {
	const data = await request.json();
	console.log(data);

	switch(data.type) {
		case 'organization.created':
			await OwnerService.insertOrg({id: data.data.id})
			break;
		case 'organization.deleted':
			await OwnerService.deleteOrg(data.data.id)
			break;
		case 'user.created':
			console.log('NEW USER', data.data.id);
			await OwnerService.insertUser({id: data.data.id})
			break;
		case 'user.deleted':
			await OwnerService.deleteUser(data.data.id)
			break;
	}

	return json(data);
}
