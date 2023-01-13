import { test, expect } from '@playwright/test'
import type DatetimeWebComponent from '../src/components/DatetimeWebComponent'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  // input is set as refElement for the datetime-web-component
  await page.getByTestId('input').click()
})

test('is visible & hidden when clicking on input', async ({ page }) => {
  await expect(page.getByTestId('dropdown')).toBeVisible()
  await page.getByTestId('input').click()
  await expect(page.getByTestId('dropdown')).toBeHidden()
})

test('is visible & hidden when clicking on input and on document', async ({
  page,
}) => {
  await expect(page.getByTestId('dropdown')).toBeVisible()
  await page.locator('body').click()
  await expect(page.getByTestId('dropdown')).toBeHidden()
})

test('value is reflected correctly in datepicker', async ({ page }) => {
  await expect(page.getByTestId('month')).toHaveText('December')
  await expect(page.getByTestId('year')).toHaveText('2022')
  await expect(page.getByTestId('selected-cell')).toHaveText('7')
  await expect(page.getByTestId('hours')).toHaveValue('13')
  await expect(page.getByTestId('minutes')).toHaveValue('12')
  await expect(page.getByTestId('seconds')).toHaveValue('03')
})

test('weekdays are correct', async ({ page }) => {
  await expect(page.getByTestId('header-cell').nth(0)).toHaveText('Mo')
  await expect(page.getByTestId('header-cell').nth(1)).toHaveText('Tu')
  await expect(page.getByTestId('header-cell').nth(2)).toHaveText('We')
  await expect(page.getByTestId('header-cell').nth(3)).toHaveText('Th')
  await expect(page.getByTestId('header-cell').nth(4)).toHaveText('Fr')
  await expect(page.getByTestId('header-cell').nth(5)).toHaveText('Sa')
  await expect(page.getByTestId('header-cell').nth(6)).toHaveText('Su')
})

test('correct amount of inactive cells', async ({ page }) => {
  await expect(page.getByTestId('inactive-cell')).toHaveCount(3)
  page.getByTestId('next-month').click()
  await expect(page.getByTestId('inactive-cell')).toHaveCount(6)
})

test('can toggle through months', async ({ page }) => {
  page.getByTestId('previous-month').click()
  await expect(page.getByTestId('month')).toHaveText('November')
  page.getByTestId('next-month').click()
  page.getByTestId('next-month').click()
  await expect(page.getByTestId('month')).toHaveText('January')
  await expect(page.getByTestId('year')).toHaveText('2023')
})

test('blocks the correct days', async ({ page }) => {
  const blockedDays = [2, 6, 9, 13, 16, 20, 23, 27, 30]
  await expect(page.getByTestId('blocked-cell').nth(0)).toHaveText(
    blockedDays[0].toString()
  )
  await expect(page.getByTestId('blocked-cell').nth(1)).toHaveText(
    blockedDays[1].toString()
  )
  await expect(page.getByTestId('blocked-cell').nth(2)).toHaveText(
    blockedDays[2].toString()
  )
  await expect(page.getByTestId('blocked-cell').nth(3)).toHaveText(
    blockedDays[3].toString()
  )
  await expect(page.getByTestId('blocked-cell').nth(4)).toHaveText(
    blockedDays[4].toString()
  )
  await expect(page.getByTestId('blocked-cell').nth(5)).toHaveText(
    blockedDays[5].toString()
  )
  await expect(page.getByTestId('blocked-cell').nth(6)).toHaveText(
    blockedDays[6].toString()
  )
  await expect(page.getByTestId('blocked-cell').nth(7)).toHaveText(
    blockedDays[7].toString()
  )
  await expect(page.getByTestId('blocked-cell').nth(8)).toHaveText(
    blockedDays[8].toString()
  )

  const handle = await page.$('datetime-web-component')
  if (handle) {
    await handle.evaluate((handle) => {
      ;(handle as DatetimeWebComponent).isDayBlocked = (value: Date) => {
        return value.getMonth() === 0
      }
    })
  }

  await expect(page.getByTestId('blocked-cell')).toHaveCount(0)
  page.getByTestId('next-month').click()
  await expect(page.getByTestId('blocked-cell')).toHaveCount(31)
})

test('hides seconds if showSeconds is false', async ({ page }) => {
  const handle = await page.$('datetime-web-component')
  if (handle) {
    await handle.evaluate((handle) => {
      ;(handle as DatetimeWebComponent).showSeconds = false
    })
  }
  await expect(page.getByTestId('seconds')).toHaveCount(0)
})

test('hides time input if onlyDate is true', async ({ page }) => {
  const handle = await page.$('datetime-web-component')
  if (handle) {
    await handle.evaluate((handle) => {
      ;(handle as DatetimeWebComponent).onlyDate = true
    })
  }
  await expect(page.getByTestId('time-container')).toHaveCount(0)
})

test('can switch to any month', async ({ page }) => {
  await page.getByTestId('month').click()
  await expect(page.getByTestId('month-cell')).toHaveCount(12)
  const november = page.getByTestId('month-cell').nth(10)
  await expect(november).toHaveText('November')
  await november.click()
  await expect(page.getByTestId('month')).toHaveText('November')
})

test('can switch to any year', async ({ page }) => {
  await page.getByTestId('year').click()
  await page.getByTestId('year-input').fill('2023')
  await page.getByTestId('confirm-year').click()
  await expect(page.getByTestId('year')).toHaveText('2023')
  await expect(page.getByTestId('inactive-cell')).toHaveCount(4)
})

test('increasing hour from 23 to 24 increments the day', async ({ page }) => {
  await page.getByTestId('hours').fill('24')
  await expect(page.getByTestId('selected-cell')).toHaveText('8')
})

test('increasing minutes to above 60 increments the hours', async ({
  page,
}) => {
  await page.getByTestId('minutes').fill('60')
  await expect(page.getByTestId('hours')).toHaveValue('14')
})

test('increasing seconds to above 60 increments the minutes', async ({
  page,
}) => {
  await page.getByTestId('seconds').fill('60')
  await expect(page.getByTestId('minutes')).toHaveValue('13')
})

test('selecting date updates the input value', async ({ page }) => {
  await page.getByTestId('next-month').click()
  await page.getByTestId('default-cell').nth(11).click()
  await page.getByTestId('hours').fill('5')
  await page.getByTestId('minutes').fill('45')
  await page.getByTestId('seconds').fill('23')
  await expect(page.getByTestId('input')).toHaveValue(
    '2023-01-16T04:45:23.000Z'
  )
})
