import { test, expect } from '@playwright/test';
import {userNameLocked, password} from '../configuration/helper';



test.describe('locked user @testchallenge, @lockeduser', () => {
    test('should not to allow login to the user locked ', async ({ page }) => {

        //get name of value to add
        await page.goto('https://www.saucedemo.com/');
        await page.fill("input[placeholder='Username']",userNameLocked );
        await page.fill("input[placeholder='Password']",password);
        // click on button login
        await page.click("input[type='submit']");
        //assertion error message
        const errorMessage = await page.locator('[data-test="error"]');
        await expect(errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
        expect(await page.screenshot()).toMatchSnapshot('locked-user.png');
    });
})