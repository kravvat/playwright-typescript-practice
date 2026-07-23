import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

export default defineConfig<TestOptions>({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    baseURL: 'http://localhost:4200/',
    globalsqaUrl: 'https://globalsqa.com/demo-site/draganddrop/',

    headless: false,

    viewport: null,

    video: {
      mode: 'off',
      size: {
        width: 3840,
        height: 2160,
      }
    },

    launchOptions: {
      args: ['--start-maximized'],
    },

    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium'
      },
    },
  ],

  webServer: {
    command: 'npm start',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
