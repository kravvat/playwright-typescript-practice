import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  /*
  // whole suite timeout
  globalTimeout: 60000,

  // single scenario timeout
  timeout: 10000,

  // we can overwrite the default timeout for assertions
  expect: {
    timeout: 2000
  },
  */

  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 1,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    headless: false,

    viewport: null,

    video: {
      mode: 'retain-on-failure',
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
