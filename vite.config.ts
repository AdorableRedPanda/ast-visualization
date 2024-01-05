import { defineConfig } from 'vite';

export default defineConfig({
	publicDir: '../static',
	root: './src/client',
	server: {
		open: true,
		port: 8080,
	},
});
