import {test,expect} from '@playwright/test'

const dataset = JSON.parse(JSON.stringify(require("../TestData/AutomationExe_TestData.json")));


import ProductPageObjectManager from '../PageObjects Automation Exe/ProductPageObjectManager';

test(" @practiseTCs View Products by Main Categories TC18", async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    await homepg.validateHomePageTitle();

   //Validating the category section
        await homepg.validatecategory();

    //Validating correct results are displayed for the categories selected
        await homepg.validateResultsForCategorySelected();
});

test(" @practiseTCs View Products by Brands TC19", async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    await homepg.validateHomePageTitle();

   //Navigating to Product page
   await homepg.navigateToProductPage();

   
        

        //Validating the BRAND category section correct results are displayed for the categories selected
        const prodpg = ProdPOManager.getProductPage();
        await prodpg.validateResultsForBrandsSelected();
});