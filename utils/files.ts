import { Page } from "@playwright/test";

export async function getValueRandomFromList(page: Page) {
    const ItemsCart = await page.locator("//div[@class='inventory_item_name']").allInnerTexts();
    let valRandom = ItemsCart[Math.floor(Math.random() * ItemsCart.length)];
    let locButAdd:string = "//div[contains(text(),'"+valRandom+"')]/ancestor::div[@class='inventory_item_label']/following-sibling::div/button";
    let handleButton = await (await page.$(locButAdd)).getAttribute('name');
    if(await handleButton.startsWith('r'))
    {
        let valRandom = ItemsCart[Math.floor(Math.random() * ItemsCart.length)];
        locButAdd = "//div[contains(text(),'"+valRandom+"')]/ancestor::div[@class='inventory_item_label']/following-sibling::div/button";
    }
    return locButAdd;
};

export async function getValueRandomFromListTodelete(page: Page) {
    const ItemsCart = await page.locator("//div[@class='inventory_item_name']").allInnerTexts();
    let valRandom = ItemsCart[Math.floor(Math.random() * ItemsCart.length)];
    let locButRemove:string = "//div[contains(text(),'"+valRandom+"')]/ancestor::div[@class='cart_item_label']/div[@class='item_pricebar']/button";
    return locButRemove;
}