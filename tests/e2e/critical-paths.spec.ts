import { expect, test } from "@playwright/test";

async function authenticateWithNoAttempts(
  page: import("@playwright/test").Page,
) {
  await page.route("**/api/v1/auth/me", (route) =>
    route.fulfill({
      json: {
        fullName: "Test Learner",
        email: "learner@example.com",
        experiencePoints: 0,
        referralCode: "TEST",
        referralLink: "https://preppal.app/invite/TEST",
        wallet: null,
        progress: {
          current: { number: 1, name: "Starter", minXp: 0, description: "" },
          experiencePoints: 0,
          lifetimeExperiencePoints: 0,
          nextLevelXp: 5000,
          xpToNext: 5000,
          progressPercent: 0,
          maxLevel: 5,
          xpPerLevel: 5000,
        },
      },
    }),
  );
  await page.route("**/api/v1/payments/membership", (route) =>
    route.fulfill({
      status: 500,
      json: { message: "Not needed in this test" },
    }),
  );
  await page.route("**/api/v1/learning/quiz-sessions", (route) =>
    route.fulfill({ json: [] }),
  );
  await page.addInitScript(() => {
    window.localStorage.setItem("preppal_token", "e2e-token");
    window.localStorage.setItem(
      "preppal-auth",
      JSON.stringify({
        version: 5,
        state: {
          isAuthenticated: true,
          sessionChecked: true,
          quizAttempts: [],
          userName: "Test Learner",
          userEmail: "learner@example.com",
          userPlan: "Starter",
        },
      }),
    );
  });
}

test("homepage renders a live public AI question and checks its answer", async ({
  page,
}) => {
  await page.route("**/api/v1/ai/public/question", (route) =>
    route.fulfill({
      json: {
        question: "Which planet is closest to the Sun?",
        options: [
          { id: "A", label: "Venus" },
          { id: "B", label: "Mercury" },
          { id: "C", label: "Earth" },
          { id: "D", label: "Mars" },
        ],
        correctOptionId: "B",
        explanation: "Mercury has the smallest orbit around the Sun.",
        hint: "Think of the smallest planetary orbit.",
        generatedAt: new Date().toISOString(),
      },
    }),
  );
  await page.goto("/");
  await expect(
    page.getByText("Which planet is closest to the Sun?"),
  ).toBeVisible();
  await page.getByRole("button", { name: /Mercury/ }).click();
  await expect(
    page.getByText("Correct — well done", { exact: true }),
  ).toBeVisible();
});

test("results never invent a quiz attempt", async ({ page }) => {
  await authenticateWithNoAttempts(page);
  await page.goto("/quiz/results");
  await expect(page.getByText("No quiz result available")).toBeVisible();
  await expect(page.getByText("80%", { exact: true })).toHaveCount(0);
});

test("review never invents questions", async ({ page }) => {
  await authenticateWithNoAttempts(page);
  await page.goto("/quiz/review");
  await expect(page.getByText("No question review available")).toBeVisible();
  await expect(page.getByText("Angles in a straight line")).toHaveCount(0);
});

test("a completed quiz cannot be reopened from browser history", async ({
  page,
}) => {
  await authenticateWithNoAttempts(page);
  await page.addInitScript(() => {
    window.sessionStorage.setItem("preppal.quiz.completed", "true");
  });

  await page.goto(
    "/quiz/active?path=subject&subject=mathematics&subjectName=Mathematics",
  );

  await expect(page).toHaveURL(/\/quiz\/results$/);
});
