<script>
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import { enhance } from '$app/forms';
	import { Button } from '@/components/ui/button';
	import Trash from '@/components/icons/Trash.svelte';
	import toast from 'svelte-french-toast';
	import { invalidateAll } from '$app/navigation';
	let {id} = $props();
</script>

<AlertDialog.Root closeOnOutsideClick >
	<AlertDialog.Trigger asChild let:builder>
		<Button builders={[builder]} variant="destructiveOutline" class="fill-red-600"><Trash/></Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete this todo
				and remove your data from our servers.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<form method="POST" action="?/delete" class="flex flex-col gap-4"
						use:enhance={() => {
							return () => {
									toast.success("Todo deleted");
									invalidateAll();
							};
						}}
			>
				<input type="hidden" name="id" value={id} />
				<AlertDialog.Action type="submit">Continue</AlertDialog.Action>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
