import 'dotenv/config'
import { defineConfig } from '@playwright/test';
import type { TestOptions } from './test-options';

export default defineConfig<TestOptions>({
  retries: 1,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:4200/',
    globalsqaUrl: 'https://globalsqa.com/demo-site/draganddrop/',

    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      timeout: 60000,
      use: {
        browserName: 'chromium'
      },
    },
  ],
});
