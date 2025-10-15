import { test, expect } from '@playwright/test';
class RegisterPage
{
    constructor(page) {
        this.page = page;
        this.registerPgTitle = page.locator("b:has-text('Enter Account Information')");
        this.username = page.locator("#name");
        this.email = page.locator("#email");
        this.gender = page.locator("#id_gender2");
        this.password = page.locator("#password");
        this.day = page.locator("#days");
    this.month = page.locator("#months");
    this.year = page.locator("#years");
    this.newletter = page.locator("#newsletter");
        this.firstname = page.locator("#first_name");
        this.lastname = page.locator("#last_name");
        this.company = page.locator("#company");
        this.address = page.locator("#address1");
        this.country = page.locator("#country");
        this. state = page.locator("#state");
        this.city = page.locator("#city");
        this.zip = page.locator("#zipcode");
        this.phone = page.locator("#mobile_number");
        this.createButton = page.locator("[data-qa='create-account']");
        this.accountCreationText = page.locator("b:has-text('Account Created!')");
        this.continueButtonToHomePage = page.locator("[data-qa='continue-button']");
        
        
    }

    async validateRegisterPgTitle()
    {
        await expect(this.registerPgTitle).toBeVisible();
    }

    async validateUname_Email_OnRegister(username,email)
    {
        const actualUname = await this.username.inputValue();
        await expect(actualUname).toContain(username);
        const actualEmail = await this.email.inputValue();
      await expect(actualEmail).toContain(email);
    }

    async registerAccount(password,firstname,lastname,company,address,country,state,city,zip,phone)
    {
        await this.gender.click();
        await this.password.fill(password);
        await this.day.selectOption("28");
    await this.month.selectOption("March");
    await this.year.selectOption("2015");
    await this.newletter.check();
        await this.firstname.fill(firstname);
        await this.lastname.fill(lastname);
        await this.company.fill(company);
        await this.address.fill(address);
        await this.country.selectOption(country);
        await this.state.fill(state);
        await this.city.fill(city);
        await this.zip.fill(zip);
        await this.phone.fill(phone);
        await this.createButton.click();
    }

    async validateaccountCreated()
    {
        await expect(this.accountCreationText).toBeVisible();
    }

    async navigateToHomePg()
    {
        await this.continueButtonToHomePage.click();
    }



}

export default RegisterPage;