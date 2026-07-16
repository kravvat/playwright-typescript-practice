import { test, expect } from "@playwright/test"
import { NavigationMenu } from "../page-objects/navigationMenu"
import { FormLayoutsPage } from "../page-objects/formLayoutsPage"
import { DatepickerPage } from "../page-objects/datepickerPage"

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test.skip('Navigation', async ({ page }) => {
    const navigation = new NavigationMenu(page)

    await navigation.goToFormLayoutsPage()
    await navigation.goToDatepickerPage()
    await navigation.goToToastrPage()
    await navigation.goToTooltipPage()
    await navigation.goToSmartTablePage()
})

test.skip("Parametrized methods", async ({ page }) => {
    const navigation = new NavigationMenu(page)
    const formLayoutsPage = new FormLayoutsPage(page)

    await navigation.goToFormLayoutsPage()
    await formLayoutsPage.submitUsingTheGrid("kacper@gmail.com", "Pass1@", "Option 2")
    await formLayoutsPage.submitInlineForm("Kacper Stec", "kacper@gmail.com", true)
})

test("Datepicker", async ({ page }) => {
    const navigation = new NavigationMenu(page)
    const datepickerPage = new DatepickerPage(page)

    await navigation.goToDatepickerPage()
    await datepickerPage.selectCommonDatepickerDateFromToday(360)
    await datepickerPage.selectDatepickerWithRangeDatesRange(1, 16)
})
