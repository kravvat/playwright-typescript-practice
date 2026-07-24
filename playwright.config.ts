import 'dotenv/config'
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

    viewport: {
      width: 1280,
      height: 720
    },

    video: {
      mode: 'off',
      size: {
        width: 1920,
        height: 1080,
      }
    },

    launchOptions: {
      // args: ['--start-maximized'],
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
