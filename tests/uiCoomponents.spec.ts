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

    test.skip('Radio buttons', async ({ page }) => {
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

test('Checkboxes', async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    // check() is better than click() for checkboxes
    await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true })
    await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true })

    const allCheckboxes = page.getByRole('checkbox')
    // this is not an Array out of the box so we have to use .all()
    for (const checkbox of await allCheckboxes.all()) {
        await checkbox.uncheck({ force: true })
        expect(await checkbox.isChecked()).toBeFalsy()
    }
})
