import { test, expect } from '@playwright/test'


import ProductPageObjectManager from '../PageObjects Automation Exe/ProductPageObjectManager';

const dataset = JSON.parse(JSON.stringify(require("../TestData/AutomationExe_TestData.json")));

test(" @practiseTCs Add Products To Cart TC12", async ({ browser }) => {
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
    

    //Adding the 1st two elements to cart and navigating to cart page when 2nd element is added.
    const [productNames_1, productNames_2] = await prodpg.getProductNamesFromProductPage();
    const [prices_1, prices_2] = await prodpg.getProductPricesFromProductPage();
    await prodpg.addProducts_navigateToCartPageFromProductPage();

   

    //Validating the cart page has the products added, price and quantity.
    const cartpg = ProdPOManager.getProductCartPage();
    await cartpg.validateCartforProductsPriceQuantity(productNames_1,productNames_2,prices_1,prices_2);


});

test (" @practiseTCs Search, View Product and add to cart TC13", async ({ browser }) => {
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

    //Searching for a product and click view details for the first searched product.
    await prodpg.searchProduct(dataset.searchString);
    await prodpg.viewSearchedProduct();
    
    

    //Increase quantity to 4 and adding to cart.
    const viewpg = ProdPOManager.getViewDetailsPage();
    const productNameofViwedProduct = await viewpg.getViewedProductName();
    await viewpg.increaseViewedProductQuantity(dataset.increasedQuantity);
    await viewpg.addViewedProductToCart();
    
    

    //Validating the cart has increased quantity.
    await viewpg.validateIncreasedQuantityInCart(productNameofViwedProduct,dataset.increasedQuantity);
});

test(" @practiseTCs Add Products To Cart from Recommended Items TC22", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    await homepg.validateHomePageTitle();

    //Scrolling to bottom of page and validating recommended Items section.
    await homepg.scrollToPageBottom();
    await homepg.validateRecommendedItemsSection();

    //Adding one product from recommended section and view cart.
   await homepg.addRecommendeItemToCart(dataset.RecommendedItemName);

    //validating the recommended item is in cart.
    const cartpg = ProdPOManager.getProductCartPage();
    await cartpg.validateRecommendedItemInCart(dataset.RecommendedItemName);

});