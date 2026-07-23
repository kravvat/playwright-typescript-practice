import { test as base } from '@playwright/test'

export type TestOptions = {
    globalsqaUrl: string
}

export const test = base.extend<TestOptions>({
    globalsqaUrl: ['', { option: true }]
})
