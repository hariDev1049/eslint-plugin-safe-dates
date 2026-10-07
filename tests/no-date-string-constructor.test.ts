import { RuleTester } from "@typescript-eslint/rule-tester";
import { noDateStringConstructor } from "../src/rules/no-date-string-constructor";

const ruleTester = new RuleTester();

ruleTester.run("no-date-string-constructor", noDateStringConstructor, {
  valid: [
    "new Date()",
    "new Date(2026, 9, 7)",
    "new Date(1759795200000)",
    "new Date(timestamp)",
    "Date.now()",
    'new Foo("2026-10-07")',
  ],
  invalid: [
    {
      code: 'new Date("2026-10-07")',
      errors: [{ messageId: "noDateString" }],
    },
    {
      code: 'new Date("2026-10-07T00:00")',
      errors: [{ messageId: "noDateString" }],
    },
    {
      code: "new Date(`${year}-${month}-${day}`)",
      errors: [{ messageId: "noDateString" }],
    },
    {
      code: 'Date.parse("2026-10-07")',
      errors: [{ messageId: "noDateParse" }],
    },
  ],
});