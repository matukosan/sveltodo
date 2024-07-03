<script>
	import { flip } from 'svelte/animate'

	const dragDuration = 300;
	let cards = Array(20).fill().map((_, i) => {return {value: i + 1};});

	console.log(cards);

	let draggingCard;
	let animatingCards = new Set();

	function swapWith(card) {
		if (draggingCard === card || animatingCards.has(card)) return;
		animatingCards.add(card);
		setTimeout(() => animatingCards.delete(card), dragDuration);
		const cardAIndex = cards.indexOf(draggingCard);
		const cardBIndex = cards.indexOf(card);
		cards[cardAIndex] = card;
		cards[cardBIndex] = draggingCard;
	}
</script>

<div class="container">
	{#if cards.length}
		{#each cards as card (card)}
			<div
				animate:flip={{ duration: dragDuration }}
				class="card"
				class:myplaceholder={draggingCard === card}
				draggable="true"
				on:dragstart={() => draggingCard = card}
				on:dragend={() => draggingCard = undefined}
				on:dragenter={() => swapWith(card)}
				on:dragover|preventDefault
			>
				{card?.value}
			</div>
		{/each}
	{/if}
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
