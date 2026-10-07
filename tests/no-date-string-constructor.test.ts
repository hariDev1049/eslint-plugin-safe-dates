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
    'new Date("2026-10-07T00:00:00Z")',
    'new Date("2026-10-07T10:00:00.000Z")',
    'new Date("2026-10-07T10:00:00+05:30")',
    'Date.parse("2026-10-07T10:00:00+03:00")',
    "new Date(`${date}T00:00:00Z`)",
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
    {
      code: 'new Date("2026-10-07T10:00:00+0530")',
      errors: [{ messageId: "noDateString" }],
    },
    {
      code: 'new Date("Oct 7, 2026 10:00")',
      errors: [{ messageId: "noDateString" }],
    },
    {
      code: "new Date(`${date}T00:00`)",
      errors: [{ messageId: "noDateString" }],
    },
  ],
});