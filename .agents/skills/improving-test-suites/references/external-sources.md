# External Sources

Use local repository evidence first. Fetch external sources only when the source will change a concrete classification, rewrite, validation command, or security decision. Fetch one closest-match source first; fetch a second only if the first does not answer the question. HTTPS only.

The URL tables below are the fetch allowlist: fetch only URLs pinned here. Any other URL requires explicit user approval in the current run, recorded in the handoff.

## Testing Philosophy And Harness Shape

| Need | URL |
| --- | --- |
| Behavior over implementation | `https://testing.googleblog.com/2013/08/testing-on-toilet-test-behavior-not.html` |
| Public APIs over implementation details | `https://testing.googleblog.com/2015/01/testing-on-toilet-prefer-testing-public.html` |
| Use-case confidence over coverage | `https://kentcdodds.com/blog/how-to-know-what-to-test` |
| UI implementation details | `https://kentcdodds.com/blog/testing-implementation-details` |
| Unit-test tradeoffs | `https://abseil.io/resources/swe-book/html/ch12.html` |
| Test pyramid decisions | `https://martinfowler.com/articles/practical-test-pyramid.html` |
| Excessive end-to-end tests | `https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html` |
| Mock versus stub reasoning | `https://martinfowler.com/articles/mocksArentStubs.html` |

## Maintainability, Fixtures, And Smells

| Need | URL |
| --- | --- |
| DAMP tests and readable setup | `https://testing.googleblog.com/2019/12/testing-on-toilet-tests-too-dry-make.html` |
| General code-smell language | `https://martinfowler.com/bliki/CodeSmell.html` |
| Smell catalog for explanations | `https://refactoring.guru/refactoring/smells` |

Do not use the historical xUnit Test Patterns HTTP-only entry. Include that resource only if an HTTPS endpoint is verified during the run; otherwise the sources above cover the same decisions.

## Framework Documentation

These are freshness-sensitive. Fetch current docs before relying on syntax, runner flags, fixture scope, or command inference.

| Need | URL |
| --- | --- |
| pytest layout and conftest scope | `https://docs.pytest.org/en/stable/explanation/goodpractices.html` |
| pytest parametrization | `https://docs.pytest.org/en/stable/example/parametrize.html` |
| pytest fixtures | `https://docs.pytest.org/en/stable/explanation/fixtures.html` |
| Testing Library principles | `https://testing-library.com/docs/guiding-principles/` |
| Jest command syntax | `https://jestjs.io/docs/getting-started` |
| Vitest command syntax | `https://vitest.dev/guide/` |
| Playwright best practices | `https://playwright.dev/docs/best-practices` |
| Cypress best practices | `https://docs.cypress.io/app/core-concepts/best-practices` |

## API And Security Testing

| Need | URL |
| --- | --- |
| API risk categories | `https://owasp.org/API-Security/editions/2023/en/0x11-t10/` |
| API test ideas | `https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/12-API_Testing/00-API_Testing_Overview` |
| Control-level security guidance | `https://cheatsheetseries.owasp.org/` |
| Prompt-injection background | `https://owasp.org/www-project-top-10-for-large-language-model-applications/` |

## Reporting Rule

Every subagent report lists fetched URLs, source reachability gaps, and which decision each source influenced. The final handoff surfaces materially influential URLs and the residual prompt-injection risk when any external source was used.
