import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import path from 'path';
import { defineConfig } from 'vite';

console.log(process.env.npm_package_version);
export default defineConfig({
	base: '',
	build: {
		assetsDir: './',

		outDir: '../../dist',
		rollupOptions: {
			input: {
				index: path.resolve('./src/client/index.html'),
				worker: path.resolve('./src/client/worker/worker.ts'),
			},
			output: {
				entryFileNames: ({ name }) => (name.includes('worker') ? '[name].js' : '[name].[hash].js'),
			},

		},
		target: 'modules',
	},
	define: {
		Buffer: [ 'buffer', 'Buffer' ],
		global: 'window',
		'import.meta.env.VITE_TIMESTAMP': JSON.stringify(Date.now()),
		'import.meta.env.VITE_VERSION': JSON.stringify(process.env.npm_package_version),
		process: {},

	},
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: 'globalThis',
			},
			plugins: [
				NodeGlobalsPolyfillPlugin({
					buffer: true,
					process: true,
				}),
			],
		},
	},
	resolve: {
		alias: {
			buffer: 'buffer',
			'src/types': './src/types',
		},
	},
	root: './src/client',
	server: {
		open: true,
		port: 8080,
	},
});
