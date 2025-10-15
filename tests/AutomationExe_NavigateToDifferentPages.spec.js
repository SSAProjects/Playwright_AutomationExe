import { test, expect } from '@playwright/test'

import ProductPageObjectManager from '../PageObjects Automation Exe/ProductPageObjectManager';

const dataset = JSON.parse(JSON.stringify(require("../TestData/AutomationExe_TestData.json")));





test(" @practiseTCs Contact Form Page TC6", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    await homepg.validateHomePageTitle();

    //Navigating to Contact form and validating the correct page is displayed.
    await homepg.navigateToContactPage();
    const contactpg = ProdPOManager.getContactPage();
    await contactpg.validatecontactPageTitle();


    //Filling the contact form and submitting
    await contactpg.submitContactForm(dataset.username, dataset.email, dataset.uploadfilepath);

    //Validating the form is submitted.
    await contactpg.validateContactFormSubmitted();
    await contactpg.navigateToHomePageFromContactPage();
    await homepg.validateHomePageTitle();

});

test(" @practiseTCs TestCase Page TC7", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    await homepg.validateHomePageTitle();

    //Navigating to Test cases page and validating the correct page is displayed.
    await homepg.navigateToTestCasesPage();
    const testpg = ProdPOManager.getTestcasePage();
    await testpg.validateTestcasePageTitle();


});

test(" @practiseTCs Product Page and view a product TC8", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    await homepg.validateHomePageTitle();

    //Navigating to Product page and validating the correct page is displayed.
    await homepg.navigateToProductPage();
    const prodpg = ProdPOManager.getProductPage();
    await prodpg.validateproductTableTitle();




    //Selecting the view details of the first item.
    const [productNames_1, productNames_2] = await prodpg.getProductNamesFromProductPage();
    const [prices_1, prices_2] = await prodpg.getProductPricesFromProductPage();
    await prodpg.navigateToViewDetailsOfSelectProduct();


    //Validating product details page is displayed with all deatils.
    const viewpg = ProdPOManager.getViewDetailsPage();
    await viewpg.validateProductViewed(productNames_1, prices_1);

});

test(" @practiseTCs Product Page and review a product TC21", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    await homepg.validateHomePageTitle();

    //Navigating to Product page and validating the correct page is displayed.
    await homepg.navigateToProductPage();
    const prodpg = ProdPOManager.getProductPage();
    await prodpg.validateproductTableTitle();




    //Selecting the view details of the first item.
    const [productNames_1, productNames_2] = await prodpg.getProductNamesFromProductPage();
    const [prices_1, prices_2] = await prodpg.getProductPricesFromProductPage();
    await prodpg.navigateToViewDetailsOfSelectProduct();


    //Validating product details page is displayed with all deatils.
    const viewpg = ProdPOManager.getViewDetailsPage();
    await viewpg.validateProductViewed(productNames_1, prices_1);

    //Validating review can be written and submitted.
    await viewpg.submitReviewDetails(dataset.username,dataset.email);
    await viewpg.validateReviewSubmitted();


});

test(" @practiseTCs Scroll down and Scroll up with Arrow key TC25", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    await homepg.validateHomePageTitle();

    //Scroll to bottom of screen
    await homepg.scrollToPageBottom();

    //Validating Subscription is displayed
    await homepg.validateSubscriptionSection();

    //Scrollup using arrow key
    await homepg.scrollToPageupWithButton();

    //Validating top pf screen is reached with text
    await homepg.validateTextonPageUp();
});

test(" @practiseTCs Scroll down and Scroll up with functionality of playwright TC26", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    await homepg.validateHomePageTitle();

    //Scroll to bottom of screen
    await homepg.scrollToPageBottom();

    //Validating Subscription is displayed
    await homepg.validateSubscriptionSection();

    //Scrollup using arrow key
    await homepg.scrollToPageUP();


    //Validating top pf screen is reached with text
    await homepg.validateTextonPageUp();
});