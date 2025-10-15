import { test, expect } from '@playwright/test'



class ProductPage {

    constructor(page) {
        this.page = page;
        this.productTableTitle = page.locator(".features_items .title");
        this.AllProducts = page.locator(".productinfo");
        this.continue = page.locator(".btn-block");
        this.viewCart = page.locator("p [href*='view_cart']");
        this.searchField = page.locator("[placeholder='Search Product']");
        this.searchButton = page.locator("#submit_search");
        this.searchedProducts = page.locator(".product-image-wrapper");
        this.brandSection = page.getByText("BRAND");
        this.brandHM = page.locator("a:has-text('H&M')");
        this.brandHMTitle = page.getByText("Brand - H&M Products");
        this.brandKKids = page.locator("a:has-text('KOOKIE KIDS')");
        this.brandKKidsTitle = page.getByText("Brand - Kookie Kids Products");
        this.allProductsSection = page.locator(".product-image-wrapper");
        this.cartLink = page.getByRole('link', { name: "Cart" });




    }

    async validateproductTableTitle() {
        await expect(this.productTableTitle).toContainText("All Products");
    }

    async getProductNamesFromProductPage() {
        await this.AllProducts.first().waitFor();
        const productNames_1 = await this.AllProducts.locator("p").first().textContent();
        const productNames_2 = await this.AllProducts.locator("p").nth(1).textContent();
        return [productNames_1, productNames_2];
    }

    async getProductPricesFromProductPage() {
        await this.AllProducts.first().waitFor();
        const prices_1 = await this.AllProducts.locator("h2").first().textContent();
        const prices_2 = await this.AllProducts.locator("h2").nth(1).textContent();
        return [prices_1, prices_2];
    }

    async addProducts_navigateToCartPageFromProductPage() {
        const AllProducts_count = this.AllProducts.count();
        const NoOfProdToBeadded = 2;
        for (let i = 0; i < NoOfProdToBeadded; ++i) {
            await this.AllProducts.nth(i).hover();
            await this.AllProducts.nth(i).locator("a").click();
            if (i < NoOfProdToBeadded - 1) {
                await this.continue.click();
            }
            else {
                await this.viewCart.click();
            }
        }
    }

    async searchProduct(searchString) {
        await this.searchField.fill(searchString);
        await this.searchButton.click();
    }

    async viewSearchedProduct() {
        await this.searchedProducts.first().waitFor();
        await this.searchedProducts.first().locator("div [href*='product_details']").click();
    }

    async validateResultsForBrandsSelected() {
        await this.AllProducts.first().waitFor();
        await expect(this.brandSection).toBeVisible();
        await this.brandHM.click();
        await expect(this.brandHMTitle).toBeVisible();
        await this.brandKKids.click();
        await expect(this.brandKKidsTitle).toBeVisible();
    }

    async navigateToViewDetailsOfSelectProduct() {
        await this.allProductsSection.first().locator("div [href*='product_details']").click();

    }

    async validateSearchResultsForSearchString(searchString) {
        await this.allProductsSection.first().waitFor();
        const searchresults_productNames = await this.AllProducts.locator("p").allTextContents();
        const searchresults_count = await this.AllProducts.locator("p").count();
        for (let i = 0; i < searchresults_count; ++i) {
            await expect(this.AllProducts.locator("p").nth(i)).toHaveText(new RegExp(searchString, 'i'));
        }
    }

    async validateSearchResultsForSearchString_AddToCart(searchString) {
        await this.allProductsSection.first().waitFor();
        
        const searchresults_count = await this.AllProducts.locator("p").count();
        for (let i = 0; i < searchresults_count; ++i) {
            await expect(this.AllProducts.locator("p").nth(i)).toHaveText(new RegExp(searchString, 'i'));
            await this.AllProducts.nth(i).locator("a").click();
            await this.continue.click();

        }
    }

    async getProductNamesOfSearchResults()
    {
        return await this.AllProducts.locator("p").allTextContents();
    }

    async navigateToCartPageFromProductPage()
    {
        await this.cartLink.click();
    }

}

export default ProductPage;