
import {test,expect} from '@playwright/test'



class ViewDetailsPage
{
    constructor(page) {
        this.page = page;
        this.viewedProduct = page.locator(".product-information h2");
        this.viewedProductPrice = page.locator(".product-information span span");
        this.quantityField = page.locator("#quantity");
        this.addToCart = page.locator(".cart");
        this.viewCart = page.locator("p [href*='view_cart']");
        this.productsInCart = page.locator("tbody tr");
        this.viewedProductCategoty = page.locator("p:has-text('Category')");
        this.viewedProductAvailability = page.locator("p:has-text('Availability')");
        this.viewedProductCondition =  page.locator("p:has-text('Condition')");
        this.viewedProductBrand = page.locator("p:has-text('Brand')");
        this.reviewTitle = page.getByText("Write Your Review");
        this.username = page.getByPlaceholder("Your Name");
        this.email = page.locator("#email");
        this.reviewMsg = page.getByPlaceholder("Add Review Here!");
        this.reviewSubmitButton = page.getByRole('button', { name: "Submit" });
        this.reviewSubmitMsg = page.locator(".alert span");
    }

    async getViewedProductName()
    {
        
    return await this.viewedProduct.textContent();
    
    }

    
    async increaseViewedProductQuantity(increasedQuantity)
    {
        const currentQuantity = await this.quantityField.textContent();
        await this.quantityField.fill("");
    await this.quantityField.fill(increasedQuantity);
       }

    async addViewedProductToCart()
    {
        await this.addToCart.click();
    await this.viewCart.click();
    }

    async validateIncreasedQuantityInCart(productNameofViwedProduct,increasedQuantity)
    {
        
    const productNamesInCart = await this.productsInCart.locator("td:nth-child(2) a").allTextContents();
        if (productNamesInCart.includes(productNameofViwedProduct)) {

        await expect(this.productsInCart.locator("td:nth-child(4) button")).toContainText(increasedQuantity);
    }
    }

    async validateProductViewed(productNames_1,prices_1)
    {
        await expect(this.viewedProduct).toContainText(productNames_1);
    await expect(this.viewedProductPrice).toContainText(prices_1);
    await expect(this.viewedProductCategoty).toBeVisible();
    await expect(this.viewedProductAvailability).toBeVisible();
    await expect(this.viewedProductCondition).toBeVisible();
    await expect(this.viewedProductBrand).toBeVisible();
    }

    async submitReviewDetails(username,email)
    {
        await expect(this.reviewTitle).toBeVisible();
    await this.username.fill(username);
    await this.email.fill(email);
    await this.reviewMsg.fill("good");
    await this.reviewSubmitButton.click();
    
    }
    
    async validateReviewSubmitted()
    {
        await expect(this.reviewSubmitMsg).toContainText("Thank you for your review.");
    }



}

export default ViewDetailsPage;