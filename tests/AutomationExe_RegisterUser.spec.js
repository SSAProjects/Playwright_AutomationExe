import { test, expect } from '@playwright/test'

const dataset = JSON.parse(JSON.stringify(require("../TestData/AutomationExe_TestData.json")));


import ProductPageObjectManager from '../PageObjects Automation Exe/ProductPageObjectManager';



test(" @practiseTCs Register Valid User TC1", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    await homepg.validateHomePageTitle();

    

    //Navigating to login screen and signup
    await homepg.navigateToLogin_signuplink();
    const log_signpg = ProdPOManager.getLogin_SignUpPage();
    await log_signpg.validateSignupTitle();
    await log_signpg.signUp(dataset.username, dataset.email);



    //Navigating to Register page and creating account
    const regpg = ProdPOManager.getRegisterPage();
    await regpg.validateRegisterPgTitle();
    await regpg.validateUname_Email_OnRegister(dataset.username, dataset.email);
    await regpg.registerAccount(dataset.password,dataset.firstname,dataset.lastname,dataset.company,dataset.address,dataset.country,dataset.state,dataset.city,dataset.zip,dataset.phone);
    await regpg.validateaccountCreated();
    await regpg.navigateToHomePg();  
  
    

    //Validating logged in user and deleting account.
    await homepg.validateLoggedInuser(dataset.username);
    await homepg.deleteAccount_validateacountDeleted();
    
    
    
});

test(" @practiseTCs,@error Register with existing User TC5", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    const title = homepg.validateHomePageTitle();

    await homepg.navigateToLogin_signuplink();

    //Navigating to login page and validating signup with existing address.
    const log_signpg = ProdPOManager.getLogin_SignUpPage();
    await log_signpg.validateSignupTitle();
    await log_signpg.signUpwithExistingEmail_validateError(dataset.username, dataset.validemail);
   
    
});