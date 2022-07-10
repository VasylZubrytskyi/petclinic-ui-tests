import { Page, test } from "@playwright/test";
import BasePage from "../BasePage";

export default class EditPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    nameInput(){
        let element;
        test.step(`Find locator by id: #name`, async () => {
            element = this.page.locator('#name');
        });
        return element;
    }

    updateButton() {
        let element;
        test.step(`Find locator by cssSelector: button[type="submit"]`, async () => {
            element = this.page.locator('button[type="submit"]');
        });
        return element;
    }
}
