<script>
	import { flip } from 'svelte/animate'

	const statuses = [{name: 'open'}, {name: 'in progress'}, {name: 'done'}];

	// let { todos } = $props();
	// const cards = $derived.by(() => {
	// 	const innerCards =  todos?.map((t) => {
	// 		t.name = t.title;
	// 		t.status = 'open';
	//
	// 	});
	// 	console.log(innerCards);
	// 	return innerCards;
	//
	// });

	const cards = [
		{
			name: '1',
			status: 'open'
		},
		{
			name: '2',
			status: 'open'
		},
		{
			name: '3',
			status: 'in progress'
		},
		{
			name: '4',
			status: 'in progress'
		},
		{
			name: '5',
			status: 'in progress'
		},
		{
			name: '6',
			status: 'in progress'
		},
		{
			name: '7',
			status: 'done'
		},
	]


	const dragDuration = 300;

	let draggingCard;
	let animatingCards = new Set();

	function swapWith(card, status) {
		draggingCard.status = status.name;
		// console.log(draggingCard.status, status.name);
		// if (card.status !== status.name) {
		// 	console.log('CHANGE STATUS');
		// }
		if (draggingCard === card || animatingCards.has(card)) return;
		animatingCards.add(card);
		setTimeout(() => animatingCards.delete(card), dragDuration);
		const cardAIndex = cards.indexOf(draggingCard);
		const cardBIndex = cards.indexOf(card);
		cards[cardAIndex] = card;
		cards[cardBIndex] = draggingCard;
	}
</script>

<div class="grid grid-cols-3 gap-2 w-full h-96">
	{#each statuses as status}
		<div class="bg-slate-200 p-4">
			<div class="mb-4">{status.name}</div>
			<div class="flex flex-col gap-2">
				{#if cards.length > 0}
					{#each cards.filter((c) => c.status === status.name) as card (card)}
						<div
							class="bg-white p-4"
							animate:flip={{ duration: dragDuration }}
							class:myplaceholder={draggingCard === card}
							draggable="true"
							on:dragstart={() => draggingCard = card}
							on:dragend={() => draggingCard = undefined}
							on:dragenter={() => swapWith(card, status)}
							on:dragover|preventDefault
						>{card.name}</div>
					{/each}
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
    .container {
        display: grid;
        grid-template-rows: repeat(4, 1fr);
        grid-template-columns: repeat(5, 1fr);
        gap: 24px;
    }

    .card {
        display: flex;
        justify-content: center;
        align-items: center;
        color: darkblue;
        background-color: lightblue;
        width: 100%;
        height: 96px;
        font-size: 1.5rem;
    }

		.myplaceholder {
				background-color: rgba(173, 216, 230, 0.2) !important;
				border: 1px dashed #989898;
		}
</style>
