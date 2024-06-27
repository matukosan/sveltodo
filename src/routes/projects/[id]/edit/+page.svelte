<script>
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import { Input } from "$lib/components/ui/input";
	import { Button } from '@/components/ui/button';

	let { data } = $props();
</script>

<h1>Edit Project</h1>

<form method="POST" class="flex flex-col gap-4"
			use:enhance={() => {
				return () => {
						toast.success("Project updated");
						goto('/projects');
				};
			}}
>
	<div class="flex flex-row gap-4 items-center">
		<label for="title">
			Title
		</label>
		<Input autofocus id="title" name="title" type="text" placeholder="Name" value={data.project?.title}/>

		<input type="hidden" name="id" value={data.project?.id} />
	</div>
	<div class="flex flex-row justify-between">
		<Button type="submit">Save</Button>
		<a href="/projects">Back</a>
	</div>
</form>
