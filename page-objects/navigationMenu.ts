import type { Page } from "@playwright/test"
import { HelperBase } from "./helperBase"

type NavigationGroup = 'Forms' | 'Modal & Overlays' | 'Tables & Data'

export class NavigationMenu extends HelperBase {

    constructor(page: Page) {
        super(page)
    }

    private async selectNavigationGroup(navigationGroup: NavigationGroup) {
        const groupLocator = this.page.getByTitle(navigationGroup)
        const isGroupExpanded = await groupLocator.getAttribute('aria-expanded')
        if (isGroupExpanded === 'false') {
            await groupLocator.click()
        }
    }

    async goToFormLayoutsPage() {
        await this.selectNavigationGroup('Forms')
        await this.page.getByText('Form Layouts').click()
    }

    async goToDatepickerPage() {
        await this.selectNavigationGroup('Forms')
        await this.page.getByText('Datepicker').click()
    }

    async goToToastrPage() {
        await this.selectNavigationGroup('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    async goToTooltipPage() {
        await this.selectNavigationGroup('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    async goToSmartTablePage() {
        await this.selectNavigationGroup('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }
}
