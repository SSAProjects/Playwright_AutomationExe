import {test,expect} from '@playwright/test'

const dataset = JSON.parse(JSON.stringify(require("../TestData/AutomationExe_TestData.json")));


import ProductPageObjectManager from '../PageObjects Automation Exe/ProductPageObjectManager';



test (" @practiseTCs Register Before Checkout TC15", async ({browser})=>
{
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
        
       //Validating the correct user is logged in.
       await homepg.validateLoggedInuser(dataset.username);

       
       //Adding the first 2 items to cart and navigating to cart page.
       await homepg.validateProductTableTitle();
       const [productNames_1, productNames_2] = await homepg.getProductNamesFromHomePage();
    const [prices_1, prices_2] = await homepg.getProductPricesFromHomePage();
    await homepg.addProducts_navigateToCartPageFromHomePage();


        

        //Validating cart page is displayed and checkout.
        const cartpg = ProdPOManager.getProductCartPage();
        await cartpg.validateCartTitle();
        await cartpg.checkoutFromCartPage();
    
    
       
       //Validating address in checkout page
       const checkoutpg = ProdPOManager.getProductCheckoutPage();
        await checkoutpg.validateDeleveryAddress(dataset.firstname,dataset.lastname,dataset.company,dataset.address,dataset.city,dataset.state,dataset.country,dataset.phone);
       
        //Validating the items in checkout page.
        await checkoutpg.validateItemsInCheckout(productNames_1, productNames_2,prices_1, prices_2)


        //Validating the total price in checkout page
        await checkoutpg.validateTotalPriceInCheckout();

        //Placing order
        await checkoutpg.placeOrder();

        //Validating the order is placed after payment details are entered.
        await checkoutpg.payForOrder(dataset.cardName,dataset.cardNumber,dataset.cardCVC,dataset.cardExpMonth,dataset.cardExpYear);
        await checkoutpg.validateOrderPlaced();

        //Delete account and validate
        await homepg.deleteAccount_validateacountDeleted();





});