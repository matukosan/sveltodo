<script>
	import DeletePrompt from './DeletePrompt.svelte';
	import { buttonVariants } from '@/components/ui/button';
	import * as Table from "$lib/components/ui/table";
	import EditIcon from '@/components/icons/EditIcon.svelte';

	let { data } = $props();

</script>


<div class="flex flex-row justify-between mb-4">
	<h1>Projects</h1>
	<a href="/projects/new" class={buttonVariants({ variant: "default" })}>New Project</a>
</div>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[100px]">ID</Table.Head>
			<Table.Head>Name</Table.Head>
			<Table.Head>Todos</Table.Head>
			<Table.Head class="text-right"></Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each data.projects as project, i (i)}
			<Table.Row class="hover:bg-slate-200 transition-all">
				<Table.Cell class="font-medium">{project.id}</Table.Cell>
				<Table.Cell>{project.title}</Table.Cell>
				<Table.Cell>{project.todos?.length} todos</Table.Cell>
				<Table.Cell class="text-right flex flex-row gap-2 justify-end items-center">
					<a href="/projects/{project.id}/edit" class={buttonVariants({ variant: "destructiveOutline" })}><EditIcon /></a>
					<DeletePrompt id={project.id}></DeletePrompt>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
