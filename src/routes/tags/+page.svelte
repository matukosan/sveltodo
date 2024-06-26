<script>
	import DeletePrompt from './DeletePrompt.svelte';
	import { buttonVariants } from '@/components/ui/button';
	import * as Table from "$lib/components/ui/table";
	import { goto } from '$app/navigation';
	import EditIcon from '@/components/icons/EditIcon.svelte';

	let { data } = $props();

</script>


<div class="flex flex-row justify-between mb-4">
	<h1>Tags</h1>
	<a href="/tags/new" class={buttonVariants({ variant: "default" })}>New Tag</a>
</div>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[100px]">ID</Table.Head>
			<Table.Head>Name</Table.Head>
			<Table.Head class="text-right"></Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each data.tags as tag, i (i)}
			<Table.Row class="hover:bg-slate-200 transition-all">
				<Table.Cell class="font-medium">{tag.id}</Table.Cell>
				<Table.Cell>{tag.title}</Table.Cell>
				<Table.Cell class="text-right flex flex-row gap-2 justify-end items-center">
					<a href="/tags/{tag.id}/edit" class={buttonVariants({ variant: "destructiveOutline" })}><EditIcon /></a>
					<DeletePrompt id={tag.id}></DeletePrompt>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
