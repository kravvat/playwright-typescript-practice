import { test } from '../test-options'
import { faker } from '@faker-js/faker'

test("Parametrized methods", async ({ pageManager }) => {
    const randomFullName: string = faker.person.fullName({ firstName: "Kacper", sex: "male" })
    const randomEmail: string = `${randomFullName.replace(' ', '').toLowerCase()}${faker.number.int(1000)}@gmail.com`

    await pageManager.onFormLayoutsPage().submitUsingTheGrid(randomEmail, "Pass1@", "Option 2")
    await pageManager.onFormLayoutsPage().submitInlineForm(randomFullName, randomEmail, true)
})
