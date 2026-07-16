import type { Page, Locator } from "@playwright/test"
import { expect } from "@playwright/test"

export class DatepickerPage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async selectCommonDatepickerDateFromToday(numberOfDaysFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const dateToAssert = await this.selectDateInCalendar(numberOfDaysFromToday)

        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    async selectDatepickerWithRangeDatesRange(startDayFromToday: number, endDayFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()

        const dateToAssertStart = await this.selectDateInCalendar(startDayFromToday)
        const dateToAssertEnd = await this.selectDateInCalendar(endDayFromToday)
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`

        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    private async selectDateInCalendar(numberOfDaysFromToday: number) {

        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDay = date.getDate().toString()
        const expectedMonthShort = date.toLocaleDateString('En-US', { month: "short" })
        const expectedMonthLong = date.toLocaleDateString('En-US', { month: "long" })
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDay}, ${expectedYear}`

        let actualCalendarMonthYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedCalendarMonthYear = ` ${expectedMonthLong} ${expectedYear} `

        while (!actualCalendarMonthYear?.includes(expectedCalendarMonthYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            actualCalendarMonthYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }

        await this.page
            .locator('.day-cell:not(.bounding-month):visible')
            .getByText(expectedDay, { exact: true })
            .click()
        return dateToAssert
    }
}