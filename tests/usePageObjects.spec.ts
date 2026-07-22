import { test } from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test('Navigation', async ({ page }) => {
    const pageManager = new PageManager(page)

    await pageManager.navigateTo().goToFormLayoutsPage()
    await pageManager.navigateTo().goToDatepickerPage()
    await pageManager.navigateTo().goToToastrPage()
    await pageManager.navigateTo().goToTooltipPage()
    await pageManager.navigateTo().goToSmartTablePage()
})

test("Parametrized methods", async ({ page }) => {
    const pageManager = new PageManager(page)

    await pageManager.navigateTo().goToFormLayoutsPage()
    await pageManager.onFormLayoutsPage().submitUsingTheGrid("kacper@gmail.com", "Pass1@", "Option 2")
    await pageManager.onFormLayoutsPage().submitInlineForm("Kacper Stec", "kacper@gmail.com", true)
})

test("Datepicker", async ({ page }) => {
    const pageManager = new PageManager(page)

    await pageManager.navigateTo().goToDatepickerPage()
    await pageManager.onDatepickerPage().selectCommonDatepickerDateFromToday(360)
    await pageManager.onDatepickerPage().selectDatepickerWithRangeDatesRange(1, 16)
})
