import { test, expect } from '@playwright/test';
import {userName, password} from '../configuration/helper';
import {getValueRandomFromList, getValueRandomFromListTodelete} from '../utils/files';

test.beforeEach(async ({ page }) => {
    //navigate to url
    await page.goto('https://www.saucedemo.com/');
    //fill username and password textbox
    await page.fill("input[placeholder='Username']",userName );
    await page.fill("input[placeholder='Password']",password);
    // click on button login
    await page.click("input[type='submit']");
});

test.describe('this test is to make sure functionalities like add item, remove item, verify total @testchallenge, @standarduser', () => {
    test('should add first item and calculate the final total', async ({ page }) => {
        //get first item name to add to the cart
        let firstItem = await getValueRandomFromList(page);
        //click in button to add item to the cart
        await page.click(firstItem);
        await page.waitForLoadState('load');
        //assertion to make sure the item was added in to the cart
        await expect (page.locator('span.shopping_cart_badge')).toContainText('1');
        //add second item to add in to the cart
        let secondItem = await getValueRandomFromList(page);
        //click in button to add item to the cart
        await page.click(secondItem);
        await page.waitForLoadState('load');
        //assertion to make sure the item was added in to the cart
        await page.waitForSelector('span.shopping_cart_badge',{state:'visible'});
        await expect (page.locator('span.shopping_cart_badge')).toContainText('2');
        //go to the cart
        await page.click("a.shopping_cart_link")
        await page.waitForLoadState('load');
        await expect(page.locator('span.title')).toContainText('Your Cart');
        //delete item from the list
        let itemToDelete = await getValueRandomFromListTodelete(page);
        await page.click(itemToDelete);
        //assertion to make sure the item was removed
        await expect (page.locator('span.shopping_cart_badge')).toContainText('1');
        //do checkout
        await page.click('button.btn.btn_action');
        await page.waitForLoadState('load');
        await expect(page.locator('span.title')).toContainText('Checkout');
        //fill form and submit
        await page.fill("input[placeholder='First Name']","Test");
        await page.fill("input[placeholder='Last Name']","Test");
        await page.fill("input[placeholder='Zip/Postal Code']","110111");
        //click in submit
        await page.click("input[type='submit']");
        //validate overview
        await page.waitForLoadState('load');
        //get value of item in string
        var getValItem=  (await page.locator('//div[@class="cart_item_label"]/div[@class="item_pricebar"]/div').innerText());
        //convert it to number
        var valItem:number =+getValItem.substring(1);
        //get value Tax
        var getTaxlVal = (await page.locator('div.summary_tax_label').innerText());
        //convert it to number
        var valTax:number =+getTaxlVal.substring(6);
        var totalDec= (valItem + valTax).toFixed(2);
        var totalToCompare= String(totalDec);
        //assertion to calculate the total is right
        await expect(page.locator('div.summary_total_label')).toContainText(totalToCompare);
        //finish the purchase
        await page.click("button.btn.btn_action");
        //confirm successfull purchased
        await page.waitForLoadState('load');
        await expect(page.locator('span.title')).toContainText('Checkout: Complete!');
        //including visual comparison
        expect(await page.screenshot()).toMatchSnapshot('succesfull-purchased.png');
    });
    test('sort by name and validate is rigth', async ({ page }) => {
        //order by naame (z to a)
        await page.locator('[data-test="product_sort_container"]').selectOption('za');
        //visual comparison assertion
        expect(await page.screenshot()).toMatchSnapshot('sorted-by-name-a-z.png');
        await expect(page.locator("(//div[@class='inventory_item'])[1]")).toContainText('Test.allTheThings() T-Shirt (Red)');
        //order by naame (z to a)
        await page.locator('[data-test="product_sort_container"]').selectOption('az');
        //visual comparison assertion
        expect(await page.screenshot()).toMatchSnapshot('sorted-by-name-z-a.png');
        await expect(page.locator("(//div[@class='inventory_item'])[6]")).toContainText('Test.allTheThings() T-Shirt (Red)');
    });
    test('sort by price and validate is rigth', async ({ page }) => {
        //order by price low to high
        await page.locator('[data-test="product_sort_container"]').selectOption('lohi');
        expect(await page.screenshot()).toMatchSnapshot('sorted-by-price-low-high.png');
        await expect(page.locator("(//div[@class='inventory_item_price'])[1]")).toContainText('7.99');
        //order by naame (z to a)
        await page.locator('[data-test="product_sort_container"]').selectOption('hilo');
        expect(await page.screenshot()).toMatchSnapshot('sorted-by-price-high-low.png');
        await expect(page.locator("(//div[@class='inventory_item_price'])[6]")).toContainText('7.99');
        });
})