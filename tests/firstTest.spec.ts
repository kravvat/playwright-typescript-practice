import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test.skip('Locator syntax rules', async ({ page }) => {
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

test.skip('User facing locators', async ({ page }) => {
    await page.getByRole('textbox', { name: "Email" }).first().click()
    await page.getByRole('button', { name: "Sign in" }).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTestId('Banana').click()

    await page.getByTitle('IoT Dashboard').click()
})

test.skip('Locating child elements', async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', { name: "Sign in" }).first().click()

    // by Index (NOT RECOMMENDED)
    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test.skip('Locating parent elements', async ({ page }) => {
    await page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" }).click()
    await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('textbox', { name: "Email" }).click()

    await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('textbox', { name: "Email" }).click()
    await page.locator('nb-card').filter({ has: page.locator('.status-danger') }).getByRole('button', { name: "Submit" }).click()

    await page
        .locator('nb-card')
        .filter({ has: page.locator('nb-checkbox') })
        .filter({ hasText: "Sign in" })
        .getByRole('textbox', { name: "Email" })
        .click()

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', { name: "Email" }).click()
})

test.skip('Reusing the locators', async ({ page }) => {
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
    const emailField = basicForm.getByRole('textbox', { name: "Email" })

    const email: string = "kacper@gmail.com"
    const password: string = "StrongPassword123!"

    await emailField.fill(email)
    await basicForm.getByRole('textbox', { name: "Password" }).fill(password)
    await basicForm.locator(".custom-checkbox").click()
    await basicForm.getByRole('button', { name: "Submit" }).click()

    await expect(emailField).toHaveValue(email)
})

test.skip('Extracting values', async ({ page }) => {
    // single text value
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
    const buttonText: string | null = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    // all text values
    const allRadioLabels: Array<string> = await page.locator('nb-radio').allTextContents()
    expect(allRadioLabels).toContain("Disabled Option")

    // input value
    const emailField = basicForm.getByRole('textbox', { name: "Email" })
    const expectedEmail: string = "kacper@gmail.com"
    await emailField.fill(expectedEmail)
    const actualEmail = await emailField.inputValue()
    expect(actualEmail).toEqual(expectedEmail)

    // atribute value
    const expectedPlaceholderValue = await emailField.getAttribute('placeholder')
    expect(expectedPlaceholderValue).toEqual("Email")
})

test.skip('Assertions', async ({ page }) => {
    const basicFormButton = page.locator('nb-card').filter({ hasText: "Basic form" }).locator('button')

    // general assertions
    const value: number = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    // locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    // soft assertion
    await expect.soft(basicFormButton).toHaveText('notSubmit')
    await basicFormButton.click()
})

