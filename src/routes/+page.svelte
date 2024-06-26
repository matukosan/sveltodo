<script>
	import DeletePrompt from './DeletePrompt.svelte';
	import { buttonVariants } from '@/components/ui/button';
	import {Root, Header, Row, Head, Body, Cell} from "$lib/components/ui/table";
	import EditIcon from '@/components/icons/EditIcon.svelte';

	let { data } = $props();

</script>

<div class="flex flex-row justify-between mb-4">
	<h1>Todos</h1>
	<a href="/todos/new" class={buttonVariants({ variant: "default" })}>New Todo</a>
</div>

<Root>
	<Header>
		<Row>
			<Head class="w-[100px]">ID</Head>
			<Head>Name</Head>
			<Head>Project</Head>
			<Head>Tags</Head>
			<Head class="text-right"></Head>
		</Row>
	</Header>
	<Body>
		{#each data.todos as todo, i (i)}
			<Row class="hover:bg-slate-200 transition-all">
				<Cell class="font-medium">{todo.id}</Cell>
				<Cell>{todo.title}</Cell>
				<Cell>{todo.project?.title}</Cell>
				<Cell>
					<div class="flex flex-row gap-2">
						{#each todo?.todoTags as todoTag}
							<div class="p-1 px-3 bg bg-blue-300 rounded-3xl">{todoTag.tag.title}</div>
						{/each}
					</div>
				</Cell>
				<Cell class="text-right flex flex-row gap-2 justify-end items-center">
					<a href="/todos/{todo.id}/edit" class={buttonVariants({ variant: "destructiveOutline" })}>
						<EditIcon />
					</a>
					<DeletePrompt id={todo.id}></DeletePrompt>
				</Cell>
			</Row>
		{/each}
	</Body>
</Root>
