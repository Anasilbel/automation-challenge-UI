# automation-challenge-UI
automation to make sure requirements described inside test challenge works as expecting

### Prerequisites

1. POSIX shell (Windows users should use a Bash terminal).
2. Node version > v12  (check using `node -v`).
3. Yarn (install using `npm i -g yarn`).
4. make sure you are using the latest version, (`nvm use Version`)
5. Install Prettier extension for your IDE.
### Setup
Kind reminder ( is import before to setup, review the preconditios)

1. Clone this repository.
2. Install dependencies using `yarn install`.
3. Run all tests using `npx playwright test`.
4. run an specific test `npx playwright test yourtest.spec.ts`.
5. Run a subset of tests via a tag using `npx playwright test --grep @standarduser`.
6. Open test report using ` npx playwright show-report`.
7. run headed on ` npx playwright test yourtest.spec.ts --headed`.
8. run in debug `npx playwright test yourtest.spec.ts  --debug`

## What is this about?

In contrast to coding assertions manually to verify individual/specific expections like label text and availability of certain elements or sections, snapshots/screenshots allow us to validate those same expectations with pixel-to-pixel comparison. This technique has certain advantages to it.
1. No need to assert individual aspects like text and values using code since snapshots capture them in the form of pixels.

   ```js
   // traditional assertion
   expect(labelElement.innerText).toEqual("My friends");
   ```

2. Snapshots capture more detail than just text and values. They capture visual aspects such as font (ex: family, size, color), text alignment and positioning.

In essence, visual regression takes us closer to the goal of quality assurance where we can truly test "what the users see".

### User focused selectors

Traditionally, we are forced to use selectors that are:

1. Based on CSS classes and ID/data/role attribute values. These selectors are tightly coupled to the implementation like the CSS framework or the UI library. They are brittle and break the tests easily.
   ```js
   page.findElementBySelector("#first-name");
   page.findElementBySelector(".bootstrap-input:nth-child(3)");
   page.findElementBySelector("[role='fullname']");
   ```
2. Based on structural layout via XPath. This also leads to brittle tests since any amount of UI refactoring would render the XPath selectors obsolete.
   ```js
   page.findElementBySelector("button >> nth=-1");
   ```
   
   ## Why Playwright?

[Playwright](https://playwright.dev/) is yet another browser automation tool that brings a few unique features to help with the tasks of automation and regression.

### User focused selectors

Traditionally, we are forced to use selectors that are:

1. Based on CSS classes and ID/data/role attribute values. These selectors are tightly coupled to the implementation like the CSS framework or the UI library. They are brittle and break the tests easily.
   ```js
   page.findElementBySelector("#first-name");
   page.findElementBySelector(".bootstrap-input:nth-child(3)");
   page.findElementBySelector("[role='fullname']");
   ```
2. Based on structural layout via XPath. This also leads to brittle tests since any amount of UI refactoring would render the XPath selectors obsolete.
   ```js
   page.findElementBySelector("button >> nth=-1");
   ```

Besides supporting these traditional selector types, Playwright introduces an efficient class of selectors based on [text](https://playwright.dev/docs/selectors#text-selector) and [layout](https://playwright.dev/docs/selectors#selecting-elements-based-on-layout) that are more focused on user's perspective and hence improve the robustness and longevity of the tests.

// fill the input below the text "First name" with "John"
await page.fill('input:below(:text("First name"))', "John");
```

As seen in the example above, it translates very close to "what the user sees" on the browser and does not tie in to any implementation details, choices or changes.

### Playwright Inspector

The [Inspector](https://playwright.dev/docs/inspector) tool has the ability to generate the code while we define a user flow using a browser. This eliminates the overhead on an engineer's end to write code and figure out the appropriate selectors. Moreover, Playwright Inspector tries its best to use "user focused selectors" (see section titled "User focused selectors") as much as possible.

### Improvement opportinities
- I see the page dont have a search filter, it could added to find an specific item.
- we have to use a system to delete the cache cuz the items are saving in the cart and when the test is going to start, the cart show some items inside.
