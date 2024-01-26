import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	base: '',
	build: {
		assetsDir: './',

		outDir: '../../dist',
		rollupOptions: {
			input: {
				index: path.resolve('./src/client/index.html'),
				worker: path.resolve('./src/client/worker.ts'),
			},
			output: {
				entryFileNames: ({ name }) => (name.includes('worker') ? '[name].js' : '[name].[hash].js'),
			},
		},
		target: 'modules',
	},
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: 'globalThis',
			},
			plugins: [
				NodeGlobalsPolyfillPlugin({
					buffer: true,
				}),
			],
		},
	},
	resolve: {
		alias: {
			'src/types': './src/types',
		},
	},
	root: './src/client',
	server: {
		open: true,
		port: 8080,
	},
});
