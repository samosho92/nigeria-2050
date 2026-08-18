import { test, expect } from "@playwright/test";

test.describe("critical paths", () => {
  test("home page loads", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /25 years/i })).toBeVisible();
  });

  test("timeline page loads", async ({ page }) => {
    await page.goto("/timeline");
    await expect(page.getByRole("heading", { name: "The Nigeria Story" })).toBeVisible();
  });

  test("sectors index lists healthcare", async ({ page }) => {
    await page.goto("/sectors");
    await expect(page.getByText("Healthcare & Public Health")).toBeVisible();
  });

  test("transportation sector page loads", async ({ page }) => {
    await page.goto("/sectors/transportation");
    await expect(page.getByRole("heading", { name: /Transportation/i })).toBeVisible();
  });

  test("your 2050 page loads", async ({ page }) => {
    await page.goto("/your-2050");
    await expect(page.getByRole("heading", { name: "Your Nigeria 2050" })).toBeVisible();
  });

  test("correction API accepts valid payload", async ({ request }) => {
    const response = await request.post("/api/corrections", {
      data: {
        pageUrl: "https://naija2050.org/sectors/economy",
        claim: "Test claim for smoke test",
        counterSource: "Smoke test source",
      },
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.ok).toBe(true);
  });
});
