import { test as base } from '@playwright/test'
import { PageManager } from './page-objects/pageManager'

export type TestOptions = {
    globalsqaUrl: string,
    navigateToFormLayouts: void
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    globalsqaUrl: ['', { option: true }],

    pageManager: async ({ page, navigateToFormLayouts }, use) => {
        const pageManager = new PageManager(page)

        await use(pageManager)
    },

    navigateToFormLayouts: async ({ page }, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()

        await use()
    },
})
