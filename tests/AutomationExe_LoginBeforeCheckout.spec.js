import {test,expect} from '@playwright/test'

import ProductPageObjectManager from '../PageObjects Automation Exe/ProductPageObjectManager';

const dataset = JSON.parse(JSON.stringify(require("../TestData/AutomationExe_TestData.json")));

    

test (" @practiseTCs Login Before Checkout TC16", async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    await homepg.validateHomePageTitle();

   //Navigating to Login screen, login and valiadate the user
   await homepg.navigateToLogin_signuplink();
   const log_signpg = ProdPOManager.getLogin_SignUpPage();
   await log_signpg.validateLoginTitle();
   await log_signpg.login(dataset.validemail,dataset.password);
   await homepg.validateLoggedInuser(dataset.validusername);

  

   //Adding the 1st two elements to cart and navigating to cart page when 2nd element is added.
    const [productNames_1, productNames_2] = await homepg.getProductNamesFromHomePage();
    const [prices_1, prices_2] = await homepg.getProductPricesFromHomePage();
    await homepg.addProducts_navigateToCartPageFromHomePage();


        //Validating Cart page is displayed and checkout
        const cartpg = ProdPOManager.getProductCartPage();
        await cartpg.validateCartTitle();
        await cartpg.checkoutFromCartPage();
    
    
       
       //Validating the address in checkout page.
       const checkoutpg = ProdPOManager.getProductCheckoutPage();
        await checkoutpg.validateDeleveryAddress(dataset.firstname,dataset.lastname,dataset.company,dataset.address,dataset.city,dataset.state,dataset.country,dataset.phone);
       

        //Validating the items in checkout page.
        await checkoutpg.validateItemsInCheckout(productNames_1, productNames_2,prices_1, prices_2)

        //Validating the total price in checkout page.
        await checkoutpg.validateTotalPriceInCheckout();

        //Placing order
        await checkoutpg.placeOrder();

        //Validating the order is placed after payment details are entered.
        await checkoutpg.payForOrder(dataset.cardName,dataset.cardNumber,dataset.cardCVC,dataset.cardExpMonth,dataset.cardExpYear);
        await checkoutpg.validateOrderPlaced();
        
       // await page.locator("[href*='delete']").click();
    //await expect(page.locator("[data-qa='account-deleted']")).toContainText("Account Deleted!");
        //await page.locator("[data-qa='continue-button']").click();





});