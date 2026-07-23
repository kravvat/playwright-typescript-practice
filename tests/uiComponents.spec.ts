import { test, expect } from "@playwright/test"

test.describe.configure({ mode: 'parallel' })

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test.describe.skip('Form Layouts page', () => {
    test.describe.configure({ retries: 2 })
    test.describe.configure({ mode: 'serial' })

    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test.skip('Input fields', async ({ page }, testInfo) => {
        if (testInfo.retry) {
            // we can for instance clear the DB here
            // in case this scenario has failed previously
        }

        const email = "kacper@gmail.com"
        const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" })

        await usingTheGridEmailInput.fill(email)
        await usingTheGridEmailInput.clear()

        await usingTheGridEmailInput.pressSequentially(email, { delay: 250 })

        // generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual(email)

        // locator assertion
        await expect(usingTheGridEmailInput).toHaveValue("itWillFail")
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

test.skip('Checkboxes', async ({ page }) => {
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

test.skip('Dialog Boxes', async ({ page }) => {
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

test.skip('Tables', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // unique text
    let email = "twitter@outlook.com"
    const targetRow = page.getByRole('row', { name: email })
    await targetRow.locator('.nb-edit').click()

    const age = "22"
    const ageInputField = page.locator('input-editor').getByPlaceholder('Age')
    await ageInputField.clear()
    await ageInputField.fill(age)
    await page.locator('.nb-checkmark').click()

    // specific cell value
    email = "kacper@gmail.com"
    await page.locator('.ng2-smart-pagination').getByText('2').click()
    const targetRowById = page.getByRole('row', { name: '11' }).filter({ has: page.locator('td').nth(1).getByText('11') })
    await targetRowById.locator('.nb-edit').click()
    const emailInputField = page.locator('input-editor').getByPlaceholder('E-mail')
    await emailInputField.clear()
    await emailInputField.fill(email)
    await page.locator('.nb-checkmark').click()
    await expect(targetRowById.locator('td').nth(5)).toHaveText(email)

    // multiple rows
    const ages = ["20", "30", "40", "200"]
    const ageFilterField = await page.locator('input-filter').getByPlaceholder('Age')

    await page.locator('.ng2-smart-pagination').getByText('1').click()
    for (let age of ages) {
        await ageFilterField.clear()
        await ageFilterField.fill(age)
        await page.waitForTimeout(1000)

        if (age === "200") {
            await expect(await page.getByRole('table').textContent()).toContain('No data found')
            break
        }

        const ageRows = await page.locator('tbody tr')
        for (let row of await ageRows.all()) {
            const cellValue = await row.locator('td').last().textContent()
            await expect(cellValue).toEqual(age)
        }
    }
})

test.skip('Datepicker', async ({ page }) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker')

    // hardcoding dates is not recommended
    await calendarInputField.click()
    await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', { exact: true }).click()
    await expect(calendarInputField).toHaveValue('Jul 1, 2026')

    // using Date object is preferable
    let date = new Date()
    date.setDate(date.getDate() + 30)
    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleDateString('En-US', { month: "short" })
    const expectedMonthLong = date.toLocaleDateString('En-US', { month: "long" })
    const expectedYear = date.getFullYear()

    await calendarInputField.click()
    let actualCalendarMonthYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedCalendarMonthYear = ` ${expectedMonthLong} ${expectedYear} `

    while (!actualCalendarMonthYear?.includes(expectedCalendarMonthYear)) {
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        actualCalendarMonthYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click()
    await expect(calendarInputField).toHaveValue(`${expectedMonthShort} ${expectedDate}, ${expectedYear}`)
})

test.skip('Sliders', async ({ page }) => {
    // by updating attributes
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    await tempGauge.evaluate(node => {
        node.setAttribute('cx', '47.369')
        node.setAttribute('cy', '232.630')
    })
    await tempGauge.click()

    // by mouse movement
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()

    const box = await tempBox.boundingBox()
    if (!box) {
        throw new Error('Temperature box is not visible')
    }

    const centerX = box.x + box.width / 2
    const centerY = box.y + box.height / 2
    await page.mouse.move(centerX, centerY)
    await page.mouse.down()
    await page.mouse.move(centerX + 100, centerY + 100, { steps: 10 })
    await page.mouse.up()
    await expect(tempBox).toContainText('30')
})

test.skip('XYZ', async ({ page }) => {
})
