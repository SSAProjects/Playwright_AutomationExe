import { test, expect } from '@playwright/test'

const dataset = JSON.parse(JSON.stringify(require("../TestData/AutomationExe_TestData.json")));


import ProductPageObjectManager from '../PageObjects Automation Exe/ProductPageObjectManager';


test(" @practiseTCs Remove from Cart TC17", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    await homepg.validateHomePageTitle();

    //Adding the first 2 items to cart and navigating to cart.
    await homepg.validateProductTableTitle();
    const [productNames_1, productNames_2] = await homepg.getProductNamesFromHomePage();
    const [prices_1, prices_2] = await homepg.getProductPricesFromHomePage();
    await homepg.addProducts_navigateToCartPageFromHomePage();



    //Validating shopping cart page is displayed.
    const cartpg = ProdPOManager.getProductCartPage();
    await cartpg.validateCartTitle();




    //Validating the items in cart

    await cartpg.validateCartforProductsPriceQuantity(productNames_1, productNames_2, prices_1, prices_2);




    //Delete Product from Cart and validate
    await cartpg.deleteProduct_validate(productNames_1);

    


});