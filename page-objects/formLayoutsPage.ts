import type { Page, Locator } from "@playwright/test"
import { expect } from "@playwright/test"

export class FormLayoutsPage {

    private readonly page: Page

    // Inline form
    private readonly inlineForm: Locator
    private readonly inlineFormNameInput: Locator
    private readonly inlineFormEmailInput: Locator
    private readonly inlineFormRememberMeCheckbox: Locator
    private readonly inlineFormSubmitButton: Locator

    // Using The Grid
    private readonly usingTheGridForm: Locator
    private readonly usingTheGridEmailInput: Locator
    private readonly usingTheGridPasswordInput: Locator
    private readonly usingTheGridSignInButton: Locator

    constructor(page: Page) {
        this.page = page

        this.inlineForm = this.page.locator('nb-card', { hasText: "Inline form" })
        this.inlineFormNameInput = this.inlineForm.getByRole('textbox', { name: "Jane Doe" })
        this.inlineFormEmailInput = this.inlineForm.getByRole('textbox', { name: "Email" })
        this.inlineFormRememberMeCheckbox = this.inlineForm.getByRole('checkbox', { name: "Remember me" })
        this.inlineFormSubmitButton = this.inlineForm.getByRole('button', { name: "Submit" })

        this.usingTheGridForm = page.locator('nb-card', { hasText: "Using the Grid" })
        this.usingTheGridEmailInput = this.usingTheGridForm.getByRole('textbox', { name: "Email" })
        this.usingTheGridPasswordInput = this.usingTheGridForm.getByRole('textbox', { name: "Password" })
        this.usingTheGridSignInButton = this.usingTheGridForm.getByRole('button', { name: "SIgn in" })
    }

    async submitUsingTheGrid(email: string, password: string, optionText: string) {
        const usingTheGridOptionRadio = this.usingTheGridForm.getByRole('radio', { name: optionText })

        await this.usingTheGridEmailInput.fill(email)
        await this.usingTheGridPasswordInput.fill(password)
        await usingTheGridOptionRadio.check({ force: true })
        await this.usingTheGridSignInButton.click()

        await expect(this.usingTheGridEmailInput).toHaveValue(email)
        await expect(this.usingTheGridPasswordInput).toHaveValue(password)
        await expect(usingTheGridOptionRadio).toBeChecked()
    }

    async submitInlineForm(name: string, email: string, rememberMe: boolean) {
        await this.inlineFormNameInput.fill(name)
        await this.inlineFormEmailInput.fill(email)
        if (rememberMe) {
            await this.inlineFormRememberMeCheckbox.check({ force: true })
            await expect(this.inlineFormRememberMeCheckbox).toBeChecked()
        }
        await this.inlineFormSubmitButton.click()

        await expect(this.inlineFormNameInput).toHaveValue(name)
        await expect(this.inlineFormEmailInput).toHaveValue(email)
    }
}
