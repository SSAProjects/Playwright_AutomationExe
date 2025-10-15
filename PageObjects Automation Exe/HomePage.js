import { test, expect } from '@playwright/test';

class HomePage
{

    constructor(page) {
        this.page = page;
        this.login_signuplink = page.locator("[href*='login']");
        this.loggedInUser = page.locator("li:nth-child(10) a:nth-child(1)");
        this.deletelink = page.locator("[href*='delete']");
        this.deleteAccTitle = page.locator("[data-qa='account-deleted']");
        this.logoutButton = page.locator("[href*='logout']");
        this.productLink = page.locator(".navbar-nav li:nth-child(2) [href*='products']");
        this.recommendedSection = page.getByText("recommended items");
        this.viewCart = page.locator("p [href*='view_cart']");
        this.recommendedSectionTable = page.locator(".recommended_items");
        this.AllProducts = page.locator(".productinfo");
        this.continue = page.locator(".btn-block");
        this.categorySection = page.getByText("CATEGORY");
        this.categoryWomen = page.locator("[href*='Women']");
        this.categorySaree = page.locator("a:has-text('Saree')");
        this.categoryWomenSareeTitle = page.getByText("Women - Saree Products");
        this.categoryMen = page.locator("[href*='Men']");
        this.categoryJeans = page.locator("a:has-text('Jeans')");
        this.categoryMenJeansTitle = page.getByText("Men - Jeans Products");
        this.contactLink = page.locator("[href*='contact']");
        this.testcasesLink = page.locator("li [href*='test']");
        this.subscriptionSection = page.getByText("Subscription");
        this.scrollUpButton = page.locator("#scrollUp");
        this.pageUpText = page.getByRole('heading', { name: "Full-Fledged practice website for Automation Engineers" });
        this.productTableTitle= page.locator(".features_items .title");
        this.continueToHomePage = page.locator("[data-qa='continue-button']");
        this.cartLink = page.locator(".navbar-nav li:nth-child(3) [href*='view_cart']");
        this.subscriptionEmail = page.locator("#susbscribe_email");
        this.subscribeButton = page.locator("#subscribe");
        this.subscriptionStatusText = page.locator(".form-group div");
        
    }

    async LandingPage()
    {
        await this.page.goto("http://automationexercise.com");
    }

    async validateHomePageTitle()
    {
        const title = await this.page.title();
        await expect(this.page).toHaveTitle(title);
    }

    async navigateToLogin_signuplink()
    {
        await this.login_signuplink.click();
    }

    async validateLoggedInuser(username)
    {
        await expect(this.loggedInUser).toContainText(` Logged in as ${username}`);
    }

    async deleteAccount_validateacountDeleted()
    {
        await this.deletelink.click();
        await expect(this.deleteAccTitle).toContainText("Account Deleted!");
        await this.continueToHomePage.click();

    }

    async logout_validateSignupText()
    {
        await this.logoutButton.click();
  await expect(this.login_signuplink).toContainText("Signup / Login");
    }

    async navigateToProductPage()
    {
        await this.productLink.click();
    
    }

    async scrollToPageBottom()    
    {
        await this.page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
    
    }

    async validateRecommendedItemsSection()
    {
        await expect(this.recommendedSection).toBeVisible();
    }

    async addRecommendeItemToCart(RecommendedItemName)
    {
         const recommendeItemToAdd = this.recommendedSectionTable.getByText(RecommendedItemName);
    await recommendeItemToAdd.scrollIntoViewIfNeeded();
    await recommendeItemToAdd.locator('xpath=following-sibling::*').click();
    await this.viewCart.click();
    }

    async getProductNamesFromHomePage()
    {
        await this.AllProducts.first().waitFor();
        const productNames_1 = await this.AllProducts.locator("p").first().textContent();
        const productNames_2 = await this.AllProducts.locator("p").nth(1).textContent();
        return [productNames_1, productNames_2];
    }

    async getProductPricesFromHomePage()
    {
        await this.AllProducts.first().waitFor();
        const prices_1 = await this.AllProducts.locator("h2").first().textContent();
        const prices_2 = await this.AllProducts.locator("h2").nth(1).textContent();
        return [prices_1, prices_2];
    }

    async addProducts_navigateToCartPageFromHomePage()
    {
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

    async validatecategory()
    {
        await this.AllProducts.first().waitFor();
        await expect(this.categorySection).toBeVisible();
    }

    async validateResultsForCategorySelected()
    {
        await this.categoryWomen.click();
        await this.categorySaree.click();
        await expect(this.categoryWomenSareeTitle).toBeVisible();
        await this.categoryMen.click();
        await this.categoryJeans.click();
        await expect(this.categoryMenJeansTitle).toBeVisible();
    }

    async navigateToContactPage()
    {
        await this.contactLink.click();
    }

    async navigateToTestCasesPage()
    {
        await this.testcasesLink.click();
    }

    async validateSubscriptionSection()
    {
        await expect(this.subscriptionSection).toBeVisible();
    }

    async scrollToPageupWithButton()
    {
        await this.scrollUpButton.click();
    }

    async validateTextonPageUp()
    {
        await expect(this.pageUpText).toBeVisible();
    }

    async scrollToPageUP()
    {
        await this.page.evaluate(() => {
        window.scrollTo(0, 0);
    });
    }

    async validateProductTableTitle()
    {
        await expect(this.productTableTitle).toContainText("Features Items");
    }

    async navigateToCartPage()
    {
        await this.cartLink.click();
    }

    async submitSubscription_validate(validemail)
    {
     
   await this.subscriptionEmail.fill(validemail);
   await this.subscribeButton.click();
   await expect(this.subscriptionStatusText).toContainText("You have been successfully subscribed!");
    }
}

export default HomePage;