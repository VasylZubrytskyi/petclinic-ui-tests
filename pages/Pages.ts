import { Page } from "@playwright/test";
import { MenuComponent } from "../components/MenuComponent";
import { PetTypeEditPage, PetTypeListPage } from "./petType";
import { SpecialtiesEditPage, SpecialtiesListPage } from "./specialties";

export default class Pages {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getMenuComponent() {
        return new MenuComponent(this.page);
    }

    getSpecialtyListPage() {
        return new SpecialtiesListPage(this.page);
    }

    getSpecialtyEditPage(){
        return new SpecialtiesEditPage(this.page);
    }

    getPetListTypePage() {
        return new PetTypeListPage(this.page);
    }

    getPetTypeEditPage(){
        return new PetTypeEditPage(this.page);
    }
}