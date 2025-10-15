import { test, expect } from '@playwright/test';
class Login_SignUpPage
{
    constructor(page) {
        this.page = page;
        this.SignupTitle = page.locator("h2:has-text('New User Signup!')");
        this.username = page.locator("[placeholder='Name']");
   this.email =  page.locator("[data-qa='signup-email']");
   this.signupButton = page.locator("[data-qa='signup-button']");
   this.signupErrorText = page.locator("[action*='signup'] p");
   this.loginTitle = page.locator("h2:has-text('Login to your account')")
   this.validemail = page.locator("[data-qa='login-email']");
      this.password = page.locator("[data-qa='login-password']");
      this.loginBUtton = page.locator("[data-qa='login-button']");
      this.loginErrorText = page.locator("[action*='login'] p");
      this.cartLink = page.getByRole('link', { name: "Cart" });
        
    }

    async validateSignupTitle()
    {
        await expect(this.SignupTitle).toBeVisible();
    }

    async signUp(username,email)
    {
        await this.username.fill(username);
        await this.email.fill(email);
        await this.signupButton.click();

    }

    async signUpwithExistingEmail_validateError(username,registeredemail)
    {
        await this.username.fill(username);
        await this.email.fill(registeredemail);
        await this.signupButton.click();
        await expect(this.signupErrorText).toContainText("Email Address already exist!");

    }

    async validateLoginTitle()
    {
        await expect(this.loginTitle).toBeVisible();
    }

    async login(validemail,password)
    {
        await this.validemail.fill(validemail);
           await this.password.fill(password);
           await this.loginBUtton.click();
    }

    async validateLoginError()
    {
        await expect(this.loginErrorText).toContainText("Your email or password is incorrect!");
    }

    async navigateToCartPageFromLoginPage()
    {
        await this.cartLink.click();
    }
    
}

export default Login_SignUpPage;