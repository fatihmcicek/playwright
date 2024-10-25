export class RegisterPage {
    constructor(page) {
        this.page = page

        this.emailInput = page.getByPlaceholder('e-mail')
        this.passwordInput = page.getByPlaceholder('password')
        this.registerButton = page.getByRole('button', { name: 'register' })
    }

    signUpAsNewUser = async () => {
        await this.page.pause()
        // type into email input
        await this.emailInput.waitFor()
        await this.emailInput.fill("testymctesterson@testers.com")
        // type into password input
        await this.passwordInput.waitFor()
        await this.passwordInput.fill("supersecretpassword")
        // click register button
        await this.registerButton.waitFor()
        await this.registerButton.click()
        await this.page.pause()
    }
}