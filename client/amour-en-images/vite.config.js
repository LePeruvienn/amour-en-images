import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '/amour-en-images/',	// Spécifiez le sous-répertoire pour GitHub Pages
	build: {
		outDir: 'dist',	// Dossier de sortie de la construction
		sourcemap: false,	// Désactive la génération des source maps pour la production
	},
})
