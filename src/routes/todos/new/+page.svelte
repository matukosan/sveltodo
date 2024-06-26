<script>
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import { Input } from "$lib/components/ui/input";
	import { Button } from '@/components/ui/button';
	import * as Select from "$lib/components/ui/select";
	import XIcon from '@/components/icons/XIcon.svelte';
	let { data } = $props();

	let currentTags = $state([]);

	let currentTagsIds = $derived.by(() => {
		return currentTags.map((ct) => ct.id);
	})

	let tagsList = $derived.by(() => {
		return data.tags.filter((t) => {
			return !currentTags?.find((ct) => {
				return ct.id === t.id;
			});
		});
	});

	let selectedTag = $state({label: '', value: ''});
</script>

<h1>Create new Todo</h1>

<form method="POST" class="flex flex-col gap-4"
			use:enhance={() => {
				return () => {
						toast.success("Todo created");
						goto('/');
				};
			}}
>
	<div class="flex flex-row gap-4 items-center">
		<label for="title">
			Name
		</label>
		<Input autofocus id="title" name="title" type="text" placeholder="Name" />
	</div>

	<div class="flex flex-row gap-4 items-center">
		<label>
			Project
		</label>

		<Select.Root portal={null}>
			<Select.Trigger class="w-[180px]">
				<Select.Value placeholder="Select a project" />
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label>Projects</Select.Label>
					{#each data.projects as project}
							<Select.Item value={project.id} label={project.title}
						>{project.title}</Select.Item
						>
					{/each}
				</Select.Group>
			</Select.Content>
			<Select.Input name="projectId" />
		</Select.Root>
	</div>

	<div>
		<label>
			Tags
		</label>
		<div class="flex flex-row gap-2 mt-2">
			{#if currentTags && currentTags?.length > 0}
				{#each currentTags as tag}
					<div class="p-1 px-3 bg bg-blue-300 rounded-3xl flex flex-row gap-2 items-center">
						{tag.title}
						<span class="fill-gray-500 hover:fill-gray-800 cursor-pointer" onclick={() => {
							currentTags = currentTags.filter((ct) => {
								return ct.id !== tag.id;
							})
						}}><XIcon /></span>
					</div>
				{/each}
			{/if}
		</div>
		<div class="flex flex-row gap-2 mt-2">
			<Select.Root portal={null} bind:selected={selectedTag}>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder="Add a tag" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Tags</Select.Label>
						{#each tagsList as tag}
							<Select.Item value={tag.id} label={tag.title} onclick={() => {
								const tagToAdd = data.tags.find((t) => t.id === tag.id);
								currentTags.push(tagToAdd);
								selectedTag = {label: '', value: ''}; }
							}>
								{tag.title}
							</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
				<Select.Input name="tagId" />
			</Select.Root>
		</div>

		<input type="hidden" name="tagsIds" value={currentTagsIds} />
	</div>

	<div class="flex flex-row justify-between">
		<Button type="submit">Create</Button>
		<a href="/">Back</a>
	</div>
</form>
