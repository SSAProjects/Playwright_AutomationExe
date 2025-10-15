import {test,expect} from '@playwright/test'

class ProductCheckoutPage
{

    constructor(page) {
        this.page = page;
        this.deliveryAddrTitle = page.locator(".address_title h3");
        this.firstLastname_addr = page.locator(".address li:nth-child(2)");
        this.company_addr = page.locator(".address li:nth-child(3)");
        this.address_addr = page.locator(".address li:nth-child(4)");
        this.cityState_addr = page.locator(".address li:nth-child(6)");
        this.country_addr = page.locator(".address li:nth-child(7)");
        this.phone_addr = page.locator(".address li:nth-child(8)");
        this.productsInCart = page.locator("tbody tr");
        this.priceElements = page.locator("tbody tr td:nth-child(5) p");
        this.orderMessage = page.locator("[name='message']");
        this.placeOrderButton = page.locator(".check_out");
        this.cardName = page.locator("[name='name_on_card']");
        this.cardNumber = page.locator("[data-qa='card-number']");
        this.cardCVC = page.locator("[data-qa='cvc']");
        this.cardExpMonth = page.locator("[data-qa='expiry-month']");
        this.cardExpYear = page.locator("[data-qa='expiry-year']");
        this.payButton = page.locator("[data-qa='pay-button']");
        this.orderPlacedText = page.locator("b:has-text('Order Placed!')");
        this.billingAddrTitle = page.locator(".address_title h3");
        this.downloadButton = page.getByRole('link', { name: 'Download Invoice' });

        
        
    }

    async validateDeleveryAddress(firstname,lastname,company,address,city,state,country,phone)
    {
        await expect(this.deliveryAddrTitle.nth(0)).toContainText("Your delivery address");
       await expect(this.firstLastname_addr.nth(0)).toHaveText(new RegExp(`${firstname}.*${lastname}`));
       await expect(this.company_addr.nth(0)).toHaveText(new RegExp(company));
       await expect(this.address_addr.nth(0)).toHaveText(new RegExp(address));
       await expect(this.cityState_addr.nth(0)).toHaveText(new RegExp(`${city}.*${state}`));
        await expect(this.country_addr.nth(0)).toHaveText(new RegExp(country));
        await expect(this.phone_addr.nth(0)).toHaveText(new RegExp(phone));
    }

    async validateBillingAddress(firstname,lastname,company,address,city,state,country,phone)
    {
        await expect(this.billingAddrTitle.nth(1)).toContainText("Your billing address");
    await expect(this.firstLastname_addr.nth(1)).toHaveText(new RegExp(`${firstname}.*${lastname}`));
    await expect(this.company_addr.nth(1)).toHaveText(new RegExp(company));
    await expect(this.address_addr.nth(1)).toHaveText(new RegExp(address));
    await expect(this.cityState_addr.nth(1)).toHaveText(new RegExp(`${city}.*${state}`));
    await expect(this.country_addr.nth(1)).toHaveText(new RegExp(country));
    await expect(this.phone_addr.nth(1)).toHaveText(new RegExp(phone));

    }

    async validateItemsInCheckout(productNames_1,productNames_2,prices_1,prices_2) 
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


    async validateTotalPriceInCheckout()
    {
        const prices = await this.priceElements.allTextContents();
        const prices_cnt = prices.length;
        const prices_value = [];
        for(let i=0;i<prices_cnt;++i)
        {
            const value = prices[i].split(" ")[1];
            prices_value.push(parseInt(value));
        }
        
        const expectedtotalamt = prices_value.reduce((sum,total)=>sum+total,0);
        const textonpg = this.page.getByText("Total Amount"); 
        const rowOfsearchtxt = this.productsInCart.filter({has: textonpg});
        const actualamt = await rowOfsearchtxt.locator(".cart_total_price").textContent();
        //const actualamt = await page.locator("tbody tr:nth-child(3) td:nth-child(4)").textContent();
        expect(actualamt.trim()).toContain(expectedtotalamt.toString());
    }

    async placeOrder()
    {
        await this.orderMessage.fill("No comments");
        await this.placeOrderButton.click();
    }

    async payForOrder(cardName,cardNumber,cardCVC,cardExpMonth,cardExpYear)
    {
        await this.cardName.fill("Test Practice")
        await this.cardNumber.fill("1234025680457701245")
        await this.cardCVC.fill("311");
        await this.cardExpMonth.fill("08");
        await this.cardExpYear.fill("2028");
        await this.payButton.click();
    }


    async validateOrderPlaced()
    {
        await expect(this.orderPlacedText).toBeVisible();
    }

    async downloadInvoice_validate()
    {
        const [download] = await Promise.all([
        this.page.waitForEvent('download'), // Wait for the download event
        await this.downloadButton.click(),
    ]);

    const filePath = await download.path();
    await expect(filePath).not.toBeNull();
    }
}
export default ProductCheckoutPage;