import { defineConfig } from '@winner-fed/winjs';

export default defineConfig({
  plugins: ['../src'],
  viewport: {
    appSelector: '#root',
  },
});
