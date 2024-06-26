<script>
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import { Input } from "$lib/components/ui/input";
	import { Button } from '@/components/ui/button';
</script>

<h1>Create new Tag</h1>

<form method="POST" class="flex flex-col gap-4"
			use:enhance={() => {
				return () => {
						toast.success("Tag created");
						goto('/tags');
				};
			}}
>
	<div class="flex flex-row gap-4 items-center">
		<label for="title">
			Name
		</label>
		<Input autofocus id="title" name="title" type="text" placeholder="Name" />
	</div>
	<div class="flex flex-row justify-between">
		<Button type="submit">Create</Button>
		<a href="/tags">Back</a>
	</div>
</form>
