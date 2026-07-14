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

    /**
     * This method fills out, submits, and validates the Using the Grid form 
     * @param email - email address of the user
     * @param password - password of the user
     * @param optionText - optional radio button to be checked by the user
     */
    async submitUsingTheGrid(email: string, password: string, optionText?: "Option 1" | "Option 2") {
        if (optionText) {
            const usingTheGridOptionRadio = this.usingTheGridForm.getByRole('radio', { name: optionText })

            await usingTheGridOptionRadio.check({ force: true })
            await expect(usingTheGridOptionRadio).toBeChecked()
        }

        await this.usingTheGridEmailInput.fill(email)
        await this.usingTheGridPasswordInput.fill(password)
        await this.usingTheGridSignInButton.click()

        await expect(this.usingTheGridEmailInput).toHaveValue(email)
        await expect(this.usingTheGridPasswordInput).toHaveValue(password)
    }

    /**
     * This method fills out, submits, and validates the Inline form
     * @param name - first and last name of the user
     * @param email - email address of the user
     * @param rememberMe - true or false, depending on whether the user wants their session to be cached
     */
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
