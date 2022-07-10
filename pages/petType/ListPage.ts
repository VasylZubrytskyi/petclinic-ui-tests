import { Page, test } from "@playwright/test";
import BasePage from "../BasePage";

export default class ListPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    addButton() {
        let element;
        test.step(`Find locator by cssSelector: .addPet:not([type="submit"])`, async () => {
            element = this.page.locator('.addPet:not([type="submit"])');
        });
        return element;
    }

    nameInput(){
        let element;
        test.step(`Find locator by id: #name`, async () => {
            element = this.page.locator('#name');
        });
        return element;
    }

    saveButton() {
        let element;
        test.step(`Find locator by cssSelector: button[type="submit"]`, async () => {
            element = this.page.locator('button[type="submit"]');
        });
        return element;
    }

    petTypeNames() {
        let element;
        test.step(`Find locator by cssSelector: [name="pettype_name"]`, async () => {
            element = this.page.locator('[name="pettype_name"]');
        });
        return element;
    }
    
    editButtons() {
        let element;
        test.step(`Find locator by cssSelector: button.btn.btn-default.editPet`, async () => {
            element = this.page.locator('button.btn.btn-default.editPet');
        });
        return element;
    }

    deleteButtons() {
        let element;
        test.step(`Find locator by cssSelector: .deletePet`, async () => {
            element = this.page.locator('.deletePet');
        });
        return element;
    }
}
