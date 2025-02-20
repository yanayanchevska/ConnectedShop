import { test, expect } from '@playwright/test';

test.describe('check search func', () => {

test.beforeEach(async ({ page }) => {

await page.goto('https://theconnectedshop.com');
await expect(page).toHaveTitle(
  "The Connected Shop - Smart Locks, Smart Sensors, Smart Home & Office"
);
await expect(page).toHaveURL('https://theconnectedshop.com/');
const searchLink = page.locator('a[data-action="toggle-search"]').first();
// const searchLink = await page.locator('a[data-action="toggle-search"]').nth(0);
await expect (searchLink).toBeVisible();
await expect (searchLink).toHaveAttribute('href','/search');
await expect(searchLink).toHaveText('Search');
await searchLink.click();
const searchInput = page.locator('input[name="q"]');
await expect(searchInput).toHaveAttribute('placeholder','Search...');
await expect (searchInput).toBeVisible();
await expect (searchInput).toBeEnabled();

})

test('search existing product', async ({ page }) => {
const searchInput = page.locator('input[name="q"]'); 
await searchInput.fill('Smart Door Lock');
await expect(searchInput).toHaveValue('Smart Door Lock');
const searchResult = page.locator('[class="Heading Text--subdued u-h7"]').nth(0);
// await expect(searchResult).toHaveText('results');
const searchFirstResult = page.locator('[class="ProductItem__Title Heading"]').nth(0); 
await expect(searchFirstResult).toBeVisible(); // check that we have at least one item search reault
const firstItemReview = page.locator('[class="jdgm-prev-badge__text"]').nth(0);
await expect(firstItemReview).toHaveText('26 reviews'); // check that first item has 26 reviews
const searchImage = page.locator('[class="ProductItem__Image Image--fadeIn lazyautosizes Image--lazyLoaded"]').nth(0); 
await expect(searchImage).toBeVisible(); 
await expect(searchImage).toHaveAttribute("data-widths", "[200,400,600,700,800,900,1000]");
});

test('search non-existing product', async ({ page }) => {
  const searchInput = page.locator('input[name="q"]');
  await searchInput.fill('QWERTY');
  await expect(searchInput).toHaveValue('QWERTY');
});

test("header elements check", async ({ page }) => {
  const shopLogo = page.locator('[class="Header__LogoImage Header__LogoImage--transparent"]');
  await expect(shopLogo).toBeVisible();
  await expect(shopLogo).toHaveAttribute("width", "250");
  await expect(shopLogo).toHaveAttribute("height", "75px"); 
  await expect(shopLogo).toHaveAttribute("src", "//theconnectedshop.com/cdn/shop/files/The_Connected_Shop_logo_250x.png?v=1705959163"); 

  const shopCart = page.locator('[class="Heading u-h6"]').nth(10);
  await expect(shopCart).toHaveAttribute("data-drawer-id", "sidebar-cart"); 
  await expect(shopCart).toHaveAttribute("href", "/cart");
  //await expect(shopCart).toHaveText("Cart (");
  const shopCartText = await page.locator("Cart (");
});

})

