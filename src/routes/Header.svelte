<script>
	import { page } from '$app/stores';
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	// import OrganizationSwitcher from 'clerk-sveltekit/client/OrganizationSwitcher.svelte';
</script>

<header class="flex flex-row justify-between h-12 items-center p-4">
	<div class="corner">
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined} class:underline={$page.url.pathname === '/'}>
				<a href="/">Todos</a>
			</li>
			<li aria-current={$page.url.pathname === '/projects' ? 'page' : undefined} class:underline={$page.url.pathname.indexOf('/projects') === 0}>
				<a href="/projects">Projects</a>
			</li>
			<li aria-current={$page.url.pathname === '/tags' ? 'page' : undefined} class:underline={$page.url.pathname.indexOf('/tags') === 0}>
				<a href="/tags">Tags</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="flex flex-row gap-2">
		<SignedIn>
<!--			<OrganizationSwitcher />-->
			<UserButton afterSignOutUrl="/" />
		</SignedIn>
		<SignedOut>
			<a href="/signin">Sign in</a> <span>|</span> <a href="/signup">Sign up</a>
			<!-- You could also use <SignInButton mode="modal" /> and <SignUpButton mode="modal" /> here -->
		</SignedOut>
	</div>
</header>

<style>
	.corner {
		width: 3em;
		height: 3em;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
