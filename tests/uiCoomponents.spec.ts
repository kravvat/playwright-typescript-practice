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

test.skip('Lists and Dropdowns', async ({ page }) => {
    const dropdownChevron = page.locator('ngx-header nb-select')

    // this can be used if list has a UL tag
    page.getByRole('list')
    // this can be used if list has a LI tag
    page.getByRole('listitem')

    // this is the one way of locating our list...
    let optionList = page.getByRole('list').locator('nb-option')

    // but this is shorter
    optionList = page.locator('nb-option-list nb-option')

    const themes = ["Light", "Dark", "Cosmic", "Corporate"]
    const themeClasses: Record<string, string> = {
        Light: 'nb-theme-default',
        Dark: 'nb-theme-dark',
        Cosmic: 'nb-theme-cosmic',
        Corporate: 'nb-theme-corporate',
    }

    for (const theme of themes) {
        await dropdownChevron.click()
        await expect(optionList).toHaveText(themes)
        await optionList.getByText(theme).click()

        await expect(page.locator('body')).toContainClass(themeClasses[theme])
    }

    const header = page.locator('nb-layout-header')
    await dropdownChevron.click()
    await optionList.getByText('Cosmic').click()
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')
})

test.skip('Tooltips', async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const tooltipCard = page.locator('nb-card', { hasText: 'Tooltip Placements' })
    await tooltipCard.getByRole('button', { name: 'Top' }).hover()
    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')
})

test('Dialog Boxes', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    const email = "twitter@outlook.com"
    const rowToBeDeleted = page.locator('table tr', { hasText: email })
    await rowToBeDeleted.locator('.nb-trash').click()
    await expect(rowToBeDeleted).not.toBeAttached()
})
