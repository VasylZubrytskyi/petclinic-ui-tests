import { test, chromium, Page, expect } from '@playwright/test';
import Pages from '../pages';

test.describe.serial('Check specialty functionality', () => {
  let page: Page;
  let pages: Pages;

  test.beforeAll(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext(/*{ recordVideo: { dir: 'videos/' } }*/);
    page = await context.newPage();
    pages = new Pages(page);
  });

  test.beforeEach(async () => {
    await test.step('Open "Home" page: https://client.sana-commerce.dev/', async () => {
      await page.goto('https://client.sana-commerce.dev/');
    });

    await test.step('Click on the "PetType" menu item', async () => {
      await await pages.getMenuComponent().petTypeTab().click();
      await page.waitForTimeout(2000);
    });
  });

  test('Create pet type', async () => {
    await test.step('Click on the "Add" button', async () => {
      await pages.getPetListTypePage().addButton().click();
      await page.waitForTimeout(2000);
    });

    const testValue = 'Test1';

    await test.step('Fill form', async () => {
      await pages.getPetListTypePage().nameInput().fill(testValue);
    });

    await test.step('Save values', async () => {
      await pages.getPetListTypePage().saveButton().click();
      await page.waitForTimeout(2000);
    })

    await test.step(`Verify that last specialty in the list is recently added '${testValue}'`, async () => {
      const item = await pages.getPetListTypePage().petTypeNames().last();
      expect(await item.inputValue()).toBe(testValue);
    });
  });

  test('Edit pet type', async () => {
    const updatedValue = 'Test2';
    await test.step('Select last item and click "Edit" button"', async () => {
      await pages.getPetListTypePage().editButtons().last().click();
      await page.waitForTimeout(2000);
    });

    await test.step(`Change the current name to '${updatedValue}'`, async () => {
      await pages.getPetListTypePage().nameInput().fill(updatedValue);
    });

    await test.step('Click on "Update" button', async () => {
      await pages.getPetTypeEditPage().updateButton().click();
      await page.waitForTimeout(2000);
    });

    await test.step('Verify that the data of pet type was changed', async () => {
      const specialtyNames = await pages.getPetListTypePage().petTypeNames();
      expect(await specialtyNames.last().inputValue()).toBe(updatedValue);
    });
  });

  test('Delete pet type', async () => {
    let petTypesCount = 0;

    await test.step('Remember the number of pet type in the list', async () => {
      petTypesCount = await pages.getPetListTypePage().petTypeNames().count();
    });

    await test.step('Select the last item in the list and press "Delete" button', async () => {
      await await pages.getPetListTypePage().deleteButtons().last().click();
      await page.waitForTimeout(2000);
    });

    await test.step('Verify that the count of items on the page decreased by 1', async () => {
      const changedCount = await pages.getPetListTypePage().petTypeNames().count();
      expect(await changedCount).toBe(petTypesCount - 1);
    });
  });
});