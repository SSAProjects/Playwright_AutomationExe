import HomePage from "./HomePage";
import Login_SignUpPage from "./Login_SignUpPage";
import ProductPage from "./ProductPage";
import ProductCartPage from "./ProductCartPage";
import ProductCheckoutPage from "./ProductCheckoutPage";
import RegisterPage from "./RegisterPage";
import TestcasePage from "./TestcasePage";
import ViewDetailsPage from "./ViewDetailsPage";
import ContactPage from "./ContactPage";



class ProductPageObjectManager
{
    constructor(page)
    {
        this.page = page;
        this.homepage = new HomePage(page);
        this.login_signuppage = new Login_SignUpPage(page);
        this.productpage = new ProductPage(page);
        this.productcartpage = new ProductCartPage(page);
        this.productcheckoutpage = new ProductCheckoutPage(page);
        this.registerpage = new RegisterPage(page);
        this.testcasepage = new TestcasePage(page);
        this.viewdetailspage = new ViewDetailsPage(page);
        this.contactpage = new ContactPage(page);
    }

    getHomePage()
    {
        return this.homepage;
    }

    getLogin_SignUpPage()
    {
        return this.login_signuppage;
    }

    getProductPage()
    {
        return this.productpage;
    }

    getProductCartPage()
    {
        return this.productcartpage;
    }

    getProductCheckoutPage()
    {
        return this.productcheckoutpage;
    }

    getRegisterPage()
    {
        return this.registerpage;
    }

    getTestcasePage()
    {
        return this.testcasepage;
    }

    getViewDetailsPage()
    {
        return this.viewdetailspage;
    }

    getContactPage()
    {
        return this.contactpage;
    }
}

export default ProductPageObjectManager;