<script>
	import { buttonVariants } from '@/components/ui/button';
	import DeletePrompt from '../DeletePrompt.svelte';
	import EditIcon from '@/components/icons/EditIcon.svelte';
	let { data } = $props();
</script>

<div class="flex flex-row justify-between items-center">
	<h1>View Project</h1>
	<div class="text-right flex flex-row gap-2 justify-end items-center">
		<a href="/projects/{data.project?.id}/edit" class={buttonVariants({ variant: "destructiveOutline" })}><EditIcon /></a>
		<DeletePrompt id={data.project?.id}></DeletePrompt>
	</div>
</div>

<div>
	<div class="mt-6 border-t border-gray-100">
		<dl class="divide-y divide-gray-100">
			<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
				<dt class="text-sm font-medium leading-6 text-gray-900">ID</dt>
				<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.project?.id}</dd>
			</div>
			<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
				<dt class="text-sm font-medium leading-6 text-gray-900">Title</dt>
				<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.project?.title}</dd>
			</div>
			<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
				<dt class="text-sm font-medium leading-6 text-gray-900">Todos</dt>
				<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.project?.todos?.length} todos</dd>
			</div>
		</dl>
	</div>
</div>
