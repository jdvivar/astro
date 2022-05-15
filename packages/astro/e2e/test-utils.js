import { loadFixture as baseLoadFixture } from '../test/test-utils.js';

export function loadFixture(inlineConfig) {
	if (!inlineConfig || !inlineConfig.root)
		throw new Error("Must provide { root: './fixtures/...' }");

	// resolve the relative root (i.e. "./fixtures/tailwindcss") to a full filepath
	// without this, the main `loadFixture` helper will resolve relative to `packages/astro/test`
	return baseLoadFixture({
		...inlineConfig,
		root: new URL(inlineConfig.root, import.meta.url).toString()
	})
}

export function onAfterHMR(page) {
	return page.waitForEvent('console', message => message.text() === 'astro:hmr:after')
}
