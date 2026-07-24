import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(process.env.URL!)
    await page.getByText('Button Triggering AJAX Request').click()

    // we can override config timeouts
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test.skip('Auto-waiting', async ({ page }) => {
    const successButton = page.locator('.bg-success')

    await successButton.waitFor({ state: "visible" })
    const successButtonText = await successButton.allTextContents()

    expect(successButtonText).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 })
})

test.skip('Alternative waits', async ({ page }) => {
    const successButton = page.locator('.bg-success')

    // wait for element
    await page.waitForSelector('.bg-succcess')

    // wait for response
    await page.waitForRequest('http://uitestingplayground.com/ajaxdata')

    // wait for network calls to be completed (NOT RECOMMENDED)
    await page.waitForLoadState('networkidle')

    const successButtonText = await successButton.allTextContents()
    expect(successButtonText).toContain('Data loaded with AJAX get request.')
})

test.skip('Timeouts', async ({ page }) => {
    const successButton = page.locator('.bg-success')

    // "slow" test will be given triple the default timeout
    test.slow()

    // we can override config timeouts
    test.setTimeout(10000)
    await successButton.click({ timeout: 16000 })
})
