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

    await test.step('Click on the "Specialties" menu item', async () => {
      await await pages.getMenuComponent().specialtiesTab().click();
      await page.waitForTimeout(2000);
    });
  });

  test('Create specialty', async () => {
    await test.step('Click on the "Add" button', async () => {
      await pages.getSpecialtyListPage().addButton().click();
      await page.waitForTimeout(2000);
    });

    const testValue = 'Test1';

    await test.step('Fill form', async () => {
      await pages.getSpecialtyListPage().nameInput().fill(testValue);
    });

    await test.step('Save values', async () => {
      await pages.getSpecialtyListPage().saveButton().click();
      await page.waitForTimeout(2000);
    })

    await test.step(`Verify that last specialty in the list is recently added '${testValue}'`, async () => {
      const item = await pages.getSpecialtyListPage().specialtyNames().last();
      expect(await item.inputValue()).toBe(testValue);
    });
  });

  test('Edit specialty', async () => {
    const updatedValue = 'Test2';
    await test.step('Select last item and click "Edit" button"', async () => {
      await pages.getSpecialtyListPage().editButtons().last().click();
      await page.waitForTimeout(2000);
    });

    await test.step(`Change the current name to '${updatedValue}'`, async () => {
      const nameField = await pages.getSpecialtyEditPage().nameInput();
      await pages.getSpecialtyEditPage().nameInput().fill(updatedValue);
    });

    await test.step('Click on "Update" button', async () => {
      await pages.getSpecialtyEditPage().updateButton().click();
      await page.waitForTimeout(2000);
    });

    await test.step('Verify that the data of specialty was changed', async () => {
      const specialtyNames = await pages.getSpecialtyListPage().specialtyNames();
      expect(await specialtyNames.last().inputValue()).toBe(updatedValue);
    });
  });

  test('Delete specialty', async () => {
    let specialtiesCount = 0;

    await test.step('Remember the number of specialties in the list', async () => {
      specialtiesCount = await pages.getSpecialtyListPage().specialtyNames().count();
    });

    await test.step('Select the last item in the list and press "Delete" button', async () => {
      await await pages.getSpecialtyListPage().deleteButtons().last().click();
      await page.waitForTimeout(2000);
    });

    await test.step('Verify that the count of items on the page decreased by 1', async () => {
      const changedCount = await pages.getSpecialtyListPage().specialtyNames().count();
      expect(await changedCount).toBe(specialtiesCount - 1);
    });
  });
});