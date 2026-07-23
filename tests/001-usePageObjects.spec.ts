import { test } from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"
import { faker } from '@faker-js/faker'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test.skip('Navigation', async ({ page }) => {
    const pageManager = new PageManager(page)

    await pageManager.navigateTo().goToFormLayoutsPage()
    await pageManager.navigateTo().goToDatepickerPage()
    await pageManager.navigateTo().goToToastrPage()
    await pageManager.navigateTo().goToTooltipPage()
    await pageManager.navigateTo().goToSmartTablePage()
})

test.skip("Parametrized methods", async ({ page }) => {
    const pageManager = new PageManager(page)
    const randomFullName: string = faker.person.fullName({ firstName: "Kacper", sex: "male" })
    const randomEmail: string = `${randomFullName.replace(' ', '').toLowerCase()}${faker.number.int(1000)}@gmail.com`

    await pageManager.navigateTo().goToFormLayoutsPage()
    await pageManager.onFormLayoutsPage().submitUsingTheGrid(randomEmail, "Pass1@", "Option 2")
    await pageManager.onFormLayoutsPage().submitInlineForm(randomFullName, randomEmail, true)
})

test.skip("Datepicker", async ({ page }) => {
    const pageManager = new PageManager(page)

    await pageManager.navigateTo().goToDatepickerPage()
    await pageManager.onDatepickerPage().selectCommonDatepickerDateFromToday(360)
    await pageManager.onDatepickerPage().selectDatepickerWithRangeDatesRange(1, 16)
})
