import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  trailingSlash: 'never',
  build: {
    // Genera archivos planos (loan-options.html) en vez de carpetas
    // (loan-options/index.html). Simplifica las URLs limpias en Apache/IONOS.
    format: 'file',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
