import {test,expect} from '@playwright/test'

import ProductPageObjectManager from '../PageObjects Automation Exe/ProductPageObjectManager';
const dataset = JSON.parse(JSON.stringify(require("../TestData/AutomationExe_TestData.json")));



test(" @practiseTCs Subscription from Home Page TC10", async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    await homepg.validateHomePageTitle();

   //Scrolling to bottom of page
   await homepg.scrollToPageBottom();
   await homepg.validateSubscriptionSection();
   

      //Validating subscription can be filled in.
   await homepg.submitSubscription_validate(dataset.validemail);


   
});

test(" @practiseTCs Subscription from Cart Page TC11", async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    await homepg.validateHomePageTitle();

   //Navigating to cart page
   await homepg.navigateToCartPage();
   

   //Scrolling to bottom of page for Subscription element and validating subscribtion can be submitted.
   const cartpg = ProdPOManager.getProductCartPage();
   await cartpg.scrollToSubscription();
   await cartpg.submitSubscription_validateFromCartPage(dataset.validemail);
   

   
});