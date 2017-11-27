# Testing

* [Getting Started](#getting-started)
* [Testing Tasks](#testing-tasks)
  * linting
  * Unit tests
  * end-to-end Tests
  * Regression Tests
* [Cross Browser](#cross-browser)
* [Integrated Testing](#integrated-testing)

## Getting Started

 * **First:** Please go through and install *all* [Prerequisites](PREREQUISITES.md)
 * `npm test` : the Storybook app will be on http://localhost:9001

## Testing Tasks

### Linting

 * `npm run lint`   

Linting will run on a _precommit_ Git hook and will run `npm run lint:js` and `npm run lint:css`.  

To fix many linting errors automatically use:
 * `npm run lint:js -- --fix`
 * `npm run lint:css -- --fix`

_for more info on linting, checkout [eslint](https://github.com/eslint/eslint), [AirBnB config](https://www.npmjs.com/package/eslint-config-airbnb) and [StyleLint](https://github.com/stylelint/stylelint)_

### Unit Tests
 > Jest will use the compiled dependencies, which mean you must have run `npm run webpack`

 * `npm test`

Unit tests will run on a _precommit_ Git hook. This will run against all `*.spec.js` files within all packages.

To have tests run automatically as you code, run:
 * `npm run test -- --watch`

_for more info on testing, checkout [jest](https://github.com/facebook/jest)_

#### Snapshot tests

Once you're happy with an update to a snapshot test run the following to update the snapshot file (Note: `jest --updateSnapshot` is picking out syntax errors in .spec files`):
* `npm run test -- -u`

## end-to-end Tests
> Run `npm run build` first (e2e tests use the compiled code).

 * `npm run e2e -- --group component-name` : Single component (local Chrome)
 * `npm run e2e` : All tests (local Chrome)

e2e tests will run on a _prepush_ Git hook.

_for more info on e2e tests, checkout [NightWatch](https://github.com/nightwatchjs/nightwatch)_

## Regression Tests
> Run `npm run build` first (regression tests use the compiled code).

 * `npm run regression -- --group component-name` : Single component (Chrome Windows via BrowserStack)
 * `npm run regression` : All tests (Chrome Windows via BrowserStack)
 * `npm run regression:xb` : All tests (all browsers via BrowserStack)

Once regression tests have run they'll either pass (all new screenshots match the base screenshots) or they'll fail.  If they fail, you will have to let the system know if the fails are expected and should become the new base screenshots or not.  You can do this easily using :
 * `npm run regression:review`

After `base` screenshots have been updated, these should be committed into Git.

_for more info on regression tests, checkout [NightWatch](https://github.com/nightwatchjs/nightwatch) and have a look at `tests/nightwatch/commands/compareScreenshots.js`_

## Cross Browser
> Check your component works in all supported browsers

 * Latest 2 Chrome on latest Windows + macOS + Android
 * Latest 2 Firefox on latest Windows + macOS
 * Latest Safari on latest macOS and iOS
 * Latest Edge on Latest Windows
 * Samsung Browser 5 on Android
 * IE11 on Windows 7
