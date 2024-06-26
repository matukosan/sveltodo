<script>
	import DeletePrompt from './DeletePrompt.svelte';
	import { buttonVariants } from '@/components/ui/button';
	import * as Table from "$lib/components/ui/table";
	import EditIcon from '@/components/icons/EditIcon.svelte';

	let { data } = $props();

</script>


<div class="flex flex-row justify-between mb-4">
	<h1>Todos</h1>
	<a href="/todos/new" class={buttonVariants({ variant: "default" })}>New Todo</a>
</div>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[100px]">ID</Table.Head>
			<Table.Head>Name</Table.Head>
			<Table.Head>Project</Table.Head>
			<Table.Head>Tags</Table.Head>
			<Table.Head class="text-right"></Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each data.todos as todo, i (i)}
			<Table.Row class="hover:bg-slate-200 transition-all">
				<Table.Cell class="font-medium">{todo.id}</Table.Cell>
				<Table.Cell>{todo.title}</Table.Cell>
				<Table.Cell>{todo.project?.title}</Table.Cell>
				<Table.Cell>
					<div class="flex flex-row gap-2">
						{#each todo?.todoTags as todoTag}
							<div class="p-1 px-3 bg bg-blue-300 rounded-3xl">{todoTag.tag.title}</div>
						{/each}
					</div>
				</Table.Cell>
				<Table.Cell class="text-right flex flex-row gap-2 justify-end items-center">
					<a href="/todos/{todo.id}/edit" class={buttonVariants({ variant: "destructiveOutline" })}>
						<EditIcon />
					</a>
					<DeletePrompt id={todo.id}></DeletePrompt>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
