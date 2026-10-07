import { AST_NODE_TYPES, ESLintUtils, type TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/hariDev1049/eslint-plugin-safe-dates/blob/main/docs/rules/${name}.md`,
);

function isStringArgument(arg: TSESTree.CallExpressionArgument | undefined): boolean {
  if (!arg) return false;
  if (arg.type === AST_NODE_TYPES.TemplateLiteral) return true;
  return arg.type === AST_NODE_TYPES.Literal && typeof arg.value === "string";
}

export const noDateStringConstructor = createRule({
  name: "no-date-string-constructor",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow parsing date strings with `new Date()` and `Date.parse()`",
    },
    messages: {
      noDateString:
        "Avoid `new Date(string)`: date-only strings are parsed as UTC, but date-time strings without an offset are parsed as local time. Parse with an explicit timezone instead.",
      noDateParse:
        "Avoid `Date.parse(string)`: it has the same timezone-dependent parsing as `new Date(string)`. Parse with an explicit timezone instead.",
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
          isStringArgument(node.arguments[0])
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
          isStringArgument(node.arguments[0])
        ) {
          context.report({ node, messageId: "noDateParse" });
        }
      },
    };
  },
});