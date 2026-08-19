# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> critical paths >> street pulse page loads the wheel
- Location: e2e/smoke.spec.ts:95:7

# Error details

```
Error: browserType.launch: Executable doesn't exist at /var/folders/2j/tvb4ph254q5fmnv6l02trk_00000gn/T/cursor-sandbox-cache/e64624ff4ac2be468a6764adb9e38586/playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell
╔════════════════════════════════════════════════════════════╗
║ Looks like Playwright was just installed or updated.       ║
║ Please run the following command to download new browsers: ║
║                                                            ║
║     npx playwright install                                 ║
║                                                            ║
║ <3 Playwright Team                                         ║
╚════════════════════════════════════════════════════════════╝
```