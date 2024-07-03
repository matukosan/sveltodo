<script>
	import { flip } from 'svelte/animate'

	const statuses = [{name: 'open'}, {name: 'in progress'}, {name: 'done'}];

	let { todos } = $props();

	const cards = $state([]);

	todos.map((t) => {
		t.status = 'open';
		cards.push(t);
	});

	const dragDuration = 300;

	let draggingCard = $state();
	let animatingCards = new Set();

	function swapWith(card, status) {
		draggingCard.status = status.name;
		if (draggingCard === card || animatingCards.has(card)) return;
		animatingCards.add(card);
		setTimeout(() => animatingCards.delete(card), dragDuration);
		const cardAIndex = cards.indexOf(draggingCard);
		const cardBIndex = cards.indexOf(card);
		cards[cardAIndex] = card;
		cards[cardBIndex] = draggingCard;
	}

	function swapStatus(status) {
		draggingCard.status = status.name;
	}

	function dragEnd() {
		if (!draggingCard) return;
		console.log('CHANGE STATUS FOR', draggingCard);
		draggingCard = undefined;
	}

</script>

<div class="grid grid-cols-3 gap-2 w-full">
	{#each statuses as status}
		<div class="bg-slate-200 p-4"
				 on:dragend={dragEnd}
				 on:dragenter={() => swapStatus(status)}
		>
			<div class="mb-4">{status.name}</div>
			<div
				class="flex flex-col gap-2 h-[500px] p-2"
				class:dragactive={!!draggingCard}
			>
				{#if cards.length > 0}
					{#each cards.filter((c) => c.status === status.name) as card (card)}
						<div
							class="bg-white p-4"
							class:dragging={draggingCard == card}
							animate:flip={{ duration: dragDuration }}
							draggable="true"
							on:dragstart={() => draggingCard = card}
							on:dragend={dragEnd}
							on:dragenter={() => swapWith(card, status)}
							on:dragover|preventDefault
						>{card.title}</div>
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

		.dragactive {
        outline: 1px dashed #989898;
		}

		.dragging {
				background-color: rgba(173, 216, 230, 0.16);
		}
</style>
