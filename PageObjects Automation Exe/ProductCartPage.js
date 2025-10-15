import { test, expect } from '@playwright/test'





class ProductCartPage {

    constructor(page,prodpg) {
        this.page = page;
        this.productsInCart = page.locator("tbody tr");
       this.cartTitle = page.locator(".active");
       this.checkoutButton = page.locator(".check_out");
       this.loginSignupButton = page.locator("p [href*='login']");
        this.loginSignUpLink = page.getByRole('link', { name: " Signup / Login" });
        this.subscriptionSection = page.locator(".single-widget h2");
        this.subscriptionEmail = page.locator("#susbscribe_email");
        this.subscribeButton = page.locator("#subscribe");
        this.subscriptionStatusText = page.locator(".form-group div");
    }



    async validateCartforProductsPriceQuantity(productNames_1,productNames_2,prices_1,prices_2) 
    {
        
       
        
        await this.productsInCart.first().waitFor();
        const productsInCart_count = this.productsInCart.count();
        const productNamesInCart = await this.productsInCart.locator("td:nth-child(2) a").allTextContents();
        for (let i = 0; i < productsInCart_count; ++i) {
            //const productNamesInCart = await productsInCart.nth(i).locator("td:nth-child(2) a").textContent();
            if (productNamesInCart.includes(productNames_1)) {
                await expect(this.productsInCart.nth(i).locator("td:nth-child(3) p")).toContainText(prices_1);
                await expect(this.productsInCart.nth(i).locator("td:nth-child(4) button")).toContainText("1");
                await expect(this.productsInCart.nth(i).locator("td:nth-child(5) p")).toContainText(prices_1);
            }
            else if (productNamesInCart.includes(productNames_2)) {
                await expect(this.productsInCart.nth(i).locator("td:nth-child(3) p")).toContainText(prices_2);
                await expect(this.productsInCart.nth(i).locator("td:nth-child(4) button")).toContainText("1");
                await expect(this.productsInCart.nth(i).locator("td:nth-child(5) p")).toContainText(prices_2);

            }
        }
    }

    async validateRecommendedItemInCart(RecommendedItemName)
    {
        await this.productsInCart.first().waitFor();
       await expect(this.page.getByText(RecommendedItemName)).toBeVisible();
    }

    async validateCartTitle()
    {
        await expect(this.cartTitle).toContainText("Shopping Cart");
    
    }

    async checkoutFromCartPage()
    {
        await this.checkoutButton.click();
    }

    async navigateToLoginSignup()
    {
        await this.loginSignupButton.click();
    }

    async deleteProduct_validate(productNames_1)
    {
        await this.page.locator(`tr:has-text("${productNames_1}")`).locator('.cart_quantity_delete').click();
    await expect(this.page.locator(`tr:has-text("${productNames_1}")`)).not.toBeVisible();
    }

    async validateSearchProductsInCart(searchresults_productNames)
    {
        const productNamesInCart = await this.productsInCart.locator("td:nth-child(2) a").allTextContents();
    for (const name of searchresults_productNames) {
        expect(productNamesInCart).toContain(name);
    }
    }

    async navigateToLoginPageFromCartPage()
    {
        await this.loginSignUpLink.click();
    }

    async scrollToSubscription()
    {
        
   await this.subscriptionSection.scrollIntoViewIfNeeded();
      await expect(this.subscriptionSection).toContainText("Subscription");
    }

    async submitSubscription_validateFromCartPage(validemail)
    {
        await this.subscriptionEmail.fill(validemail);
   await this.subscribeButton.click();
   await expect(this.subscriptionStatusText).toContainText("You have been successfully subscribed!");

    }
}

export default ProductCartPage;