import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('is visible & hidden when clicking on input', async ({ page }) => {
  // input is set as refElement for the datetime-web-component
  await page.locator('#input').click();
  await expect(page.locator('datetime-web-component')).toBeVisible();
  await page.locator('#input').click();
  await expect(page.locator('datetime-web-component')).toBeHidden();
});

test('is visible & hidden when clicking on input and on document', async ({ page }) => {
  await page.locator('#input').click();
  await expect(page.locator('datetime-web-component')).toBeVisible();
  await page.locator('#input').click();
  await expect(page.locator('datetime-web-component')).toBeHidden();
});

test('value is reflected correctly in datepicker', async ({ page }) => {
  await page.locator('#input').click();
  await expect(page.getByTestId('month')).toHaveText('December');
  await expect(page.getByTestId('year')).toHaveText('2022');
  await expect(page.getByTestId('day')).toHaveText('7');
  await expect(page.getByTestId('hours')).toHaveValue('13');
  await expect(page.getByTestId('minutes')).toHaveValue('12');
  await expect(page.getByTestId('seconds')).toHaveValue('03');
});

test('weekdays are correct', async ({ page }) => {
  await expect(page.getByTestId('header-cell').nth(0)).toHaveText('Mo');
  await expect(page.getByTestId('header-cell').nth(1)).toHaveText('Tu');
  await expect(page.getByTestId('header-cell').nth(2)).toHaveText('We');
  await expect(page.getByTestId('header-cell').nth(3)).toHaveText('Th');
  await expect(page.getByTestId('header-cell').nth(4)).toHaveText('Fr');
  await expect(page.getByTestId('header-cell').nth(5)).toHaveText('Sa');
  await expect(page.getByTestId('header-cell').nth(6)).toHaveText('Su');
})
