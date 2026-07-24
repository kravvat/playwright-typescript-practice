import 'dotenv/config'
import { defineConfig } from '@playwright/test';
import type { TestOptions } from './test-options';

export default defineConfig<TestOptions>({
    use: {
        baseURL: 'http://localhost:4200/',
        globalsqaUrl: 'https://globalsqa.com/demo-site/draganddrop/',
    },

    projects: [
        {
            name: 'firefox',
            use: {
                browserName: 'firefox'
            },
        },
    ],
});
