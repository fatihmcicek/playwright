import { v4 as uuidv4 } from 'uuid';

export class RegisterPage {
    constructor(page) {
        this.page = page

        this.emailInput = page.getByPlaceholder('e-mail')
        this.passwordInput = page.getByPlaceholder('password')
        this.registerButton = page.getByRole('button', { name: 'register' })
    }

    signUpAsNewUser = async () => {
        await this.emailInput.waitFor()
        const emailId = uuidv4()
        const email = emailId + '@gmail.com'
        await this.emailInput.fill(email)
        await this.emailInput.waitFor()
        const password = uuidv4()
        await this.emailInput.fill(password)

        await this.registerButton.waitFor()
        await this.registerButton.click()
    }
}
