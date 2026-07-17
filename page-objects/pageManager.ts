import { Page } from "@playwright/test"
import { NavigationMenu } from "../page-objects/navigationMenu"
import { FormLayoutsPage } from "../page-objects/formLayoutsPage"
import { DatepickerPage } from "../page-objects/datepickerPage"

export class PageManager {

    private readonly page: Page
    private readonly navigationMenu: NavigationMenu
    private readonly formLayoutsPage: FormLayoutsPage
    private readonly datepickerPage: DatepickerPage

    constructor(page: Page) {
        this.page = page
        this.navigationMenu = new NavigationMenu(this.page)
        this.formLayoutsPage = new FormLayoutsPage(this.page)
        this.datepickerPage = new DatepickerPage(this.page)
    }

    navigateTo() {
        return this.navigationMenu
    }

    onFormLayoutsPage() {
        return this.formLayoutsPage
    }

    onDatepickerPage() {
        return this.datepickerPage
    }
}