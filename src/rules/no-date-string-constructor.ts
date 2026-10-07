import { AST_NODE_TYPES, ESLintUtils, type TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/hariDev1049/eslint-plugin-safe-dates/blob/main/docs/rules/${name}.md`,
);

const ISO_WITH_OFFSET =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[+-]\d{2}:\d{2})$/;
const TIME_WITH_OFFSET_SUFFIX =
  /T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[+-]\d{2}:\d{2})$/;

function isAmbiguousDateString(arg: TSESTree.CallExpressionArgument | undefined): boolean {
  if (!arg) return false;

  if (arg.type === AST_NODE_TYPES.Literal) {
    return typeof arg.value === "string" && !ISO_WITH_OFFSET.test(arg.value);
  }

  if (arg.type === AST_NODE_TYPES.TemplateLiteral) {
    const tail = arg.quasis.at(-1)?.value.cooked ?? "";
    const pattern = arg.expressions.length === 0 ? ISO_WITH_OFFSET : TIME_WITH_OFFSET_SUFFIX;
    return !pattern.test(tail);
  }

  return false;
}

export const noDateStringConstructor = createRule({
  name: "no-date-string-constructor",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow parsing ambiguous date strings with `new Date()` and `Date.parse()`",
    },
    messages: {
      noDateString:
        "Ambiguous `new Date(string)`: strings without an explicit UTC offset are parsed as UTC or local time depending on their format. Use an ISO 8601 string with an offset (e.g. `2026-10-07T10:00:00Z` or `+05:30`), or numeric arguments.",
      noDateParse:
        "Ambiguous `Date.parse(string)`: strings without an explicit UTC offset are parsed as UTC or local time depending on their format. Use an ISO 8601 string with an offset (e.g. `2026-10-07T10:00:00Z` or `+05:30`).",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      NewExpression(node) {
        if (
          node.callee.type === AST_NODE_TYPES.Identifier &&
          node.callee.name === "Date" &&
          isAmbiguousDateString(node.arguments[0])
        ) {
          context.report({ node, messageId: "noDateString" });
        }
      },
      CallExpression(node) {
        const { callee } = node;
        if (
          callee.type === AST_NODE_TYPES.MemberExpression &&
          !callee.computed &&
          callee.object.type === AST_NODE_TYPES.Identifier &&
          callee.object.name === "Date" &&
          callee.property.type === AST_NODE_TYPES.Identifier &&
          callee.property.name === "parse" &&
          isAmbiguousDateString(node.arguments[0])
        ) {
          context.report({ node, messageId: "noDateParse" });
        }
      },
    };
  },
});