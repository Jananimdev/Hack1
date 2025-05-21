const {test,expect}= require('@playwright/test');
test('birthday', async ({ page }) => {
    await page.goto("https://www.urbanladder.com/");
    await page.getByPlaceholder('Search').fill('birthday');
    await page.locator('[id="search_button"]').click();
    await page.waitForSelector('.withsubtext');
    const text = await page.locator('.withsubtext').allTextContents();
    console.log(text);
    await page.locator('//*[@id="search-results"]/div[3]/ul/li[1]').click();
    const page1Promise = page.waitForEvent('popup');
    const page1 = await page1Promise;
    await page1.locator('[id="add-to-cart-button"]').click();
    await page1.getByRole('button',{name:"checkout"}).nth(1).click();
    await page1.getByPlaceholder("Enter Email").fill("jan@12");
    await page1.locator('[id="order_ship_address_attributes_zipcode"]').click();
    await page1.waitForSelector('//*[@id="shipping"]/ul/li[1]/div/div/label');
    const error= await page1.locator('//*[@id="shipping"]/ul/li[1]/div/div/label').allTextContents();
    console.log(error);
});

