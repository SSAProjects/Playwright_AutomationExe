import { test, expect } from '@playwright/test'

const dataset = JSON.parse(JSON.stringify(require("../TestData/AutomationExe_TestData.json")));

import ProductPageObjectManager from '../PageObjects Automation Exe/ProductPageObjectManager';



test(" @practiseTCs Register While checkout TC14", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    await homepg.validateHomePageTitle();

    //Validating the Features Items are displayed.
    await homepg.validateProductTableTitle();


    //Adding the 1st two elements to cart and navigating to cart page when 2nd element is added.
    const [productNames_1, productNames_2] = await homepg.getProductNamesFromHomePage();
    const [prices_1, prices_2] = await homepg.getProductPricesFromHomePage();
    await homepg.addProducts_navigateToCartPageFromHomePage();

    //Validating shopping cart is displayed and click checkout.
    const cartpg = ProdPOManager.getProductCartPage();
        await cartpg.validateCartTitle();
        await cartpg.checkoutFromCartPage();

    //Validating Signup/Login is prompted.
    await cartpg.navigateToLoginSignup();

    //Signup
    const log_signpg = ProdPOManager.getLogin_SignUpPage();
    await log_signpg.signUp(dataset.username, dataset.email);

    
    //New REgistration and account creation.
    const regpg = ProdPOManager.getRegisterPage();
    await regpg.validateRegisterPgTitle();
    await regpg.validateUname_Email_OnRegister(dataset.username, dataset.email);
    await regpg.registerAccount(dataset.password,dataset.firstname,dataset.lastname,dataset.company,dataset.address,dataset.country,dataset.state,dataset.city,dataset.zip,dataset.phone);
    await regpg.validateaccountCreated();
    await regpg.navigateToHomePg(); 

    //LOgged in with registered email.
    await homepg.validateLoggedInuser(dataset.username);

    //Navigate to cart and checkout
    await homepg.navigateToCartPage();
    await cartpg.checkoutFromCartPage();

    //Validate the Delivery address in CheckoutPage.
    const checkoutpg = ProdPOManager.getProductCheckoutPage();
    await checkoutpg.validateDeleveryAddress(dataset.firstname,dataset.lastname,dataset.company,dataset.address,dataset.city,dataset.state,dataset.country,dataset.phone);
       

    //Validating the checkout page has the products added, price and quantity.
    await checkoutpg.validateItemsInCheckout(productNames_1, productNames_2,prices_1, prices_2)


    //Validating the total price
    await checkoutpg.validateTotalPriceInCheckout();

    //Place order
    await checkoutpg.placeOrder();

    //Validate the order is placed after payment details are entered.
    await checkoutpg.payForOrder(dataset.cardName,dataset.cardNumber,dataset.cardCVC,dataset.cardExpMonth,dataset.cardExpYear);
    await checkoutpg.validateOrderPlaced();

    //Delete account and validate account is deleted.
    await homepg.deleteAccount_validateacountDeleted();





});

test(" @practiseTCs Register While checkout and validate delivery address and billing address TC23", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    await homepg.validateHomePageTitle();

    //Validating the Features Items are displayed.
    await homepg.validateProductTableTitle();


    //Adding the 1st two elements to cart and navigating to cart page when 2nd element is added.
    const [productNames_1, productNames_2] = await homepg.getProductNamesFromHomePage();
    const [prices_1, prices_2] = await homepg.getProductPricesFromHomePage();
    await homepg.addProducts_navigateToCartPageFromHomePage();

    //Validating shopping cart is displayed and click checkout.
    const cartpg = ProdPOManager.getProductCartPage();
        await cartpg.validateCartTitle();
        await cartpg.checkoutFromCartPage();

    //Validating Signup/Login is prompted.
    await cartpg.navigateToLoginSignup();

    //Signup
    const log_signpg = ProdPOManager.getLogin_SignUpPage();
    await log_signpg.signUp(dataset.username, dataset.email);

    
    //New REgistration and account creation.
    const regpg = ProdPOManager.getRegisterPage();
    await regpg.validateRegisterPgTitle();
    await regpg.validateUname_Email_OnRegister(dataset.username, dataset.email);
    await regpg.registerAccount(dataset.password,dataset.firstname,dataset.lastname,dataset.company,dataset.address,dataset.country,dataset.state,dataset.city,dataset.zip,dataset.phone);
    await regpg.validateaccountCreated();
    await regpg.navigateToHomePg(); 

    //LOgged in with registered email.
    await homepg.validateLoggedInuser(dataset.username);

    //Navigate to cart and checkout
    await homepg.navigateToCartPage();
    await cartpg.checkoutFromCartPage();

    //Validate the Delivery address in CheckoutPage.
    const checkoutpg = ProdPOManager.getProductCheckoutPage();
    await checkoutpg.validateDeleveryAddress(dataset.firstname,dataset.lastname,dataset.company,dataset.address,dataset.city,dataset.state,dataset.country,dataset.phone);
       

    //Validate the Billing address in CheckoutPage.
    await checkoutpg.validateBillingAddress(dataset.firstname,dataset.lastname,dataset.company,dataset.address,dataset.city,dataset.state,dataset.country,dataset.phone);
     



    //Delete account and validate account is deleted.
    await homepg.deleteAccount_validateacountDeleted();

});



test(" @practiseTCs Register While checkout and Download Invoice TC24", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const ProdPOManager = new ProductPageObjectManager(page);
    const homepg = ProdPOManager.getHomePage();
    await homepg.LandingPage();

    //Validating the home page title.
    await homepg.validateHomePageTitle();

    //Validating the Features Items are displayed.
    await homepg.validateProductTableTitle();


    //Adding the 1st two elements to cart and navigating to cart page when 2nd element is added.
    const [productNames_1, productNames_2] = await homepg.getProductNamesFromHomePage();
    const [prices_1, prices_2] = await homepg.getProductPricesFromHomePage();
    await homepg.addProducts_navigateToCartPageFromHomePage();

    //Validating shopping cart is displayed and click checkout.
    const cartpg = ProdPOManager.getProductCartPage();
        await cartpg.validateCartTitle();
        await cartpg.checkoutFromCartPage();

    //Validating Signup/Login is prompted.
    await cartpg.navigateToLoginSignup();

    //Signup
    const log_signpg = ProdPOManager.getLogin_SignUpPage();
    await log_signpg.signUp(dataset.username, dataset.email);

    
    //New REgistration and account creation.
    const regpg = ProdPOManager.getRegisterPage();
    await regpg.validateRegisterPgTitle();
    await regpg.validateUname_Email_OnRegister(dataset.username, dataset.email);
    await regpg.registerAccount(dataset.password,dataset.firstname,dataset.lastname,dataset.company,dataset.address,dataset.country,dataset.state,dataset.city,dataset.zip,dataset.phone);
    await regpg.validateaccountCreated();
    await regpg.navigateToHomePg(); 

    //LOgged in with registered email.
    await homepg.validateLoggedInuser(dataset.username);

    //Navigate to cart and checkout
    await homepg.navigateToCartPage();
    await cartpg.checkoutFromCartPage();

    //Validate the Delivery address in CheckoutPage.
    const checkoutpg = ProdPOManager.getProductCheckoutPage();
    await checkoutpg.validateDeleveryAddress(dataset.firstname,dataset.lastname,dataset.company,dataset.address,dataset.city,dataset.state,dataset.country,dataset.phone);
       

    //Validating the checkout page has the products added, price and quantity.
    await checkoutpg.validateItemsInCheckout(productNames_1, productNames_2,prices_1, prices_2)


    //Validating the total price
    await checkoutpg.validateTotalPriceInCheckout();

    //Place order
    await checkoutpg.placeOrder();

    //Validate the order is placed after payment details are entered.
    await checkoutpg.payForOrder(dataset.cardName,dataset.cardNumber,dataset.cardCVC,dataset.cardExpMonth,dataset.cardExpYear);
    await checkoutpg.validateOrderPlaced();

    

    //Download invoice and validate invoice is downloaded.
    await checkoutpg.downloadInvoice_validate();

    //Delete account and validate account is deleted.
    await homepg.deleteAccount_validateacountDeleted();





});