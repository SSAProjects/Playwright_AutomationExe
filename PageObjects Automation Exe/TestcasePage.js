import {test,expect} from '@playwright/test'

class TestcasePage
{

    constructor(page)
    {
        this.page = page;
        this.testcaseTitle = page.locator(".text-center");
    }

    async validateTestcasePageTitle()
    {
        await expect(this.testcaseTitle).toContainText("Test Cases");
    }

}

export default TestcasePage;