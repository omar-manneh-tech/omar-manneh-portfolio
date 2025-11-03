# Contributing Guidelines

## Development Workflow

1. Create a feature branch from `main`
2. Make your changes following the coding standards
3. Write tests for new features
4. Ensure all tests pass and linting is clean
5. Commit using conventional commits format
6. Push and create a pull request

## Coding Standards

- TypeScript strict mode enabled
- Follow SOLID, KISS, DRY principles
- Use ESLint and Prettier (auto-format on save)
- Write self-documenting code with clear variable names
- Add JSDoc comments for public APIs

## Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(auth): add MFA support for admin users

- Implement TOTP token generation
- Add QR code display for enrollment
- Add verification endpoint

Closes #123
```

## Testing Requirements

- Unit tests for business logic (>=70% coverage on critical modules)
- Integration tests for API endpoints
- E2E tests for main user flows

## Pull Request Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] Documentation updated
- [ ] No console.logs or debug code
- [ ] Security considerations addressed

