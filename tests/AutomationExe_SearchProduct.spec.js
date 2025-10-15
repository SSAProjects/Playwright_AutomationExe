import { test, expect } from '@playwright/test'

import ProductPageObjectManager from '../PageObjects Automation Exe/ProductPageObjectManager';

const dataset = JSON.parse(JSON.stringify(require("../TestData/AutomationExe_TestData.json")));




test(" @practiseTCs Search Product TC9", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    await homepg.validateHomePageTitle();

    //Navigating to Products Link and validating product page is dislayed.
    await homepg.navigateToProductPage();
    const prodpg = ProdPOManager.getProductPage();
    await prodpg.validateproductTableTitle();

    //Searching for a product
    await prodpg.searchProduct(dataset.searchString);

    //Validating the search results have the searched product
    await prodpg.validateSearchResultsForSearchString(dataset.searchString);

});

test(" @practiseTCs Search Product and verify Cart after Login TC20", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    await homepg.validateHomePageTitle();

    //Navigating to Products Link and validating product page is dislayed.
    await homepg.navigateToProductPage();
    const prodpg = ProdPOManager.getProductPage();
    await prodpg.validateproductTableTitle();

    //Searching for a product
    await prodpg.searchProduct(dataset.searchString);

    //Validating the search results have the searched product and add them to cart
    await prodpg.validateSearchResultsForSearchString_AddToCart(dataset.searchString);
    const searchresults_productNames = await prodpg.getProductNamesOfSearchResults();

    
   

    //Navigating to Cart page and validating items in cart
    await prodpg.navigateToCartPageFromProductPage();
    const cartpg = ProdPOManager.getProductCartPage();
    await cartpg.validateSearchProductsInCart(searchresults_productNames);

    

    //Navigating to login page
    await cartpg.navigateToLoginPageFromCartPage();
    const log_signpg = ProdPOManager.getLogin_SignUpPage();
    await log_signpg.validateLoginTitle();
   await log_signpg.login(dataset.validemail,dataset.password);

    //Navigating to cart page and revalidating items in cart.
    await log_signpg.navigateToCartPageFromLoginPage();
    await cartpg.validateSearchProductsInCart(searchresults_productNames);
    
});