import { defineConfig } from 'vite';

export default defineConfig({
	publicDir: '../static',
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
