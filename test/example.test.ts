import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Component from '../src/Component.astro';

test('Component test', async () => {
	const container = await AstroContainer.create();

	// First get the component's output, this returns a string with the HTML output
	const result = await container.renderToString(Component, {
		props: {
			message: 'World',
		},
	});

	// Then we can use the result to check if the component is rendering correctly
	// For example, we can check if the output contains a specific string
	expect(result).toContain('Hello World!');
});
