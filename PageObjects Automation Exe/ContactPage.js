import {test,expect} from '@playwright/test'


class ContactPage{

    constructor(page) {
        this.page = page;
        this.contactTitle = page.locator(".contact-form .text-center");
        this.username = page.locator("[placeholder='Name']");
        this.email = page.locator("[placeholder='Email']");
        this.contactSummary = page.locator("[placeholder='Subject']");
        this.contactMsg = page.locator("[placeholder='Your Message Here']");
        this.contactUpload = page.locator("[name='upload_file']");
        this.contactSubmitButton = page.locator("[name='submit']");
        this.contactFormSubmitText = page.locator("div.status");
        this.continue = page.locator(".btn-success");

        
        
        
    }

    async validatecontactPageTitle()
    {
        await expect(this.contactTitle).toContainText("Get In Touch");
    }

    async submitContactForm(username,email,uploadfilepath)
    {
        await this.username.fill(username);
            await this.email.fill(email);
            await this.contactSummary.fill("Thank You");
            await this.contactMsg.fill("Practise site is good");
            await this.contactUpload.click();
            await this.contactUpload.setInputFiles(uploadfilepath); //this will upload the file
            this.page.on('dialog', dialog => dialog.accept());
            await this.contactSubmitButton.click();
    }

    async validateContactFormSubmitted()
    {
        await expect(this.contactFormSubmitText).toContainText("Success! Your details have been submitted successfully.");
            
    }

    async navigateToHomePageFromContactPage()
    {
        await this.continue.click();
            
    }

    
}

export default ContactPage;