<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import { Input } from "$lib/components/ui/input";
	import { Button } from '@/components/ui/button';
	import * as Select from "$lib/components/ui/select";
	import XIcon from '@/components/icons/XIcon.svelte';

	let { data } = $props();

	let currentTags: { id: number, title: string }[] = $state(data.todo?.todoTags.map((tt: {tag: Record<string, string>}) => {
		return tt.tag;
	}));

	let tagsList = $derived.by(() => {
		return data.tags.filter((t: {id: number}) => {
			return !currentTags?.find((ct) => {
				return ct.id === t.id;
			});
		});
	});

	let selectedTag = $state({label: '', value: ''});

	const selectTagHandler = (tagId: number) => {
		return () => {
			const tagToAdd = data.tags.find((t: {id: number}) => t.id === tagId);
			currentTags.push(tagToAdd);
			selectedTag = {label: '', value: ''};
		}
	}

	let inProgress = $state(false);
	let errorMessage = $state('');

</script>

<h1>Edit Todo</h1>

<form method="POST" class="flex flex-col gap-4"
			use:enhance={() => {
				inProgress = true;
				errorMessage = '';
				return async ({result}) => {
					inProgress = false;
					if (result.type === 'error'){
						errorMessage = 'Updating todo failed';
					} else {
						toast.success("Todo updated");
						goto('/');
					}
				};
			}}
>
	{inProgress ? 'IN PROGRESS' : 'NOT IN PROGRESS'}
	<div class="flex flex-row gap-4 items-center">
		<label for="title">
			Title
		</label>
		<Input disabled={inProgress} autofocus id="title" name="title" type="text" placeholder="Name" value={data.todo?.title}/>

		<input type="hidden" name="id" value={data.todo?.id} />
	</div>

	<div class="flex flex-row gap-4 items-center">
		<span>
			Project
		</span>

		<Select.Root disabled={inProgress} portal={null} selected={{label: data.todo?.project?.title, value: data.todo?.project?.id}}>
			<Select.Trigger class="w-[180px]">
				<Select.Value placeholder="Select a project" />
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label>Projects</Select.Label>
					{#each data.projects as project}
						<Select.Item value={project.id} label={project.title}>
							{project.title}
						</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
			<Select.Input name="projectId" />
		</Select.Root>
	</div>


	<div>
		<span>
			Tags
		</span>
		<div class="flex flex-row gap-2 mt-2">
			{#if currentTags && currentTags?.length > 0}
				{#each currentTags as tag}
					<div class="p-1 px-3 bg bg-blue-300 rounded-3xl flex flex-row gap-2 items-center">
						{tag.title}
						<button disabled={inProgress} class="fill-gray-500 hover:fill-gray-800 cursor-pointer" onclick={() => {
							currentTags = currentTags.filter((ct) => {
								return ct.id !== tag.id;
							})
						}}><XIcon /></button>
					</div>
				{/each}
			{/if}
		</div>
		<div class="flex flex-row gap-2 mt-2">
			<Select.Root portal={null} bind:selected={selectedTag} disabled={inProgress}>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder="Add a tag" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Tags</Select.Label>
						{#each tagsList as tag}
							<Select.Item value={tag.id} label={tag.title} onclick={selectTagHandler(tag.id)}>
								{tag.title}
							</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</div>

		{#each currentTags as ct}
			<input type="hidden" name="tagIds" value={ct.id} />
		{/each}
	</div>


	<div class="flex flex-row justify-between">
		<Button type="submit" disabled={inProgress}>Save</Button>
		<a href="/">Back</a>
	</div>

	{#if errorMessage}
		<div class="text-red-600">
			{errorMessage}
		</div>
	{/if}
</form>
