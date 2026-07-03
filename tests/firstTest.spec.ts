import { test } from "@playwright/test"

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('locator syntax rules', async ({ page }) => {
    // by Tag
    page.locator('input')

    // by ID
    page.locator('#inputEmail1')

    // by Class
    page.locator('.shape-rectangle')

    // by Class value (full)
    page.locator('[input-full-width size-medium status-basic shape-rectangle nb-transition]')

    // by Attribute
    page.locator('[placeholder="Email"]')

    // by Partial Text Match
    page.locator(':text("Using")')

    // by Exact Text Match
    page.locator(':text-is("Using the Grid")')

    // by Combination
    await page.locator('input#inputEmail1[placeholder="Email"]').first().click()

    // by XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')
})
