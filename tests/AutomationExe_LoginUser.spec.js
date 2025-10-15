import {test,expect} from '@playwright/test'

const dataset = JSON.parse(JSON.stringify(require("../TestData/AutomationExe_TestData.json")));

import ProductPageObjectManager from '../PageObjects Automation Exe/ProductPageObjectManager';



test(" @practiseTCs Valid Login User TC2", async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    await homepg.validateHomePageTitle();

    

   //Navigating to Login screen, login and check the user
   await homepg.navigateToLogin_signuplink();
   const log_signpg = ProdPOManager.getLogin_SignUpPage();
   await log_signpg.validateLoginTitle();
   await log_signpg.login(dataset.validemail,dataset.password);
   await homepg.validateLoggedInuser(dataset.validusername);


   
   
    //await page.locator("[href*='delete']").click();
    //await expect(page.locator("[data-qa='account-deleted']")).toContainText("Account Deleted!");

   
});

test(" @practiseTCs,@error Invalid Login User TC3", async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    await homepg.validateHomePageTitle();

   //Navigating to Login screen, login and check for error on invalid login
   await homepg.navigateToLogin_signuplink();
   const log_signpg = ProdPOManager.getLogin_SignUpPage();
   await log_signpg.validateLoginTitle();
   await log_signpg.login(dataset.invalidemail,dataset.password);
    await log_signpg.validateLoginError();
   
   
   
   
});

test(" @practiseTCs Logout User TC4", async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    await homepg.validateHomePageTitle();

    

   //Navigating to Login screen, login and check the user
   await homepg.navigateToLogin_signuplink();
   const log_signpg = ProdPOManager.getLogin_SignUpPage();
   await log_signpg.validateLoginTitle();
   await log_signpg.login(dataset.validemail,dataset.password);
   await homepg.validateLoggedInuser(dataset.validusername);

   //LOgout and validating option to Signup is displayed.
   await homepg.logout_validateSignupText();
   
   
   
});