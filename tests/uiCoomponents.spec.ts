import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test.describe('Form Layouts page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test.skip('Input fields', async ({ page }) => {
        const email = "kacper@gmail.com"
        const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" })

        await usingTheGridEmailInput.fill(email)
        await usingTheGridEmailInput.clear()

        await usingTheGridEmailInput.pressSequentially(email, { delay: 500 })

        // generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual(email)

        // locator assertion
        await expect(usingTheGridEmailInput).toHaveValue(email)
    })

    test('Radio buttons', async ({ page }) => {
        const usingTheGridForm = page.locator('nb-card', { hasText: "Using the Grid" })

        await usingTheGridForm.getByLabel('Option 1').check({ force: true })
        let firstRadioStatus = await usingTheGridForm.getByLabel('Option 1').isChecked()
        expect(firstRadioStatus).toBeTruthy()

        await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).check({ force: true })
        await expect(usingTheGridForm.getByRole('radio', { name: 'Option 2' })).toBeChecked()
        firstRadioStatus = await usingTheGridForm.getByLabel('Option 1').isChecked()
        expect(firstRadioStatus).toBeFalsy()
    })
})
