/**
 * ExecuteCodeActivity simulates compiling and running the generated code. It
 * returns test results where the failure count decreases on each iteration. In
 * a real implementation, this would run your unit tests or other validation.
 */
module.exports = async function (context) {
  const { code, iteration = 0 } = context.bindings.input || {};
  const totalTests = 3;
  const failures = Math.max(totalTests - (iteration + 1), 0);
  const passed = totalTests - failures;
  const testResults = { total: totalTests, passed, failed: failures };
  return { testResults };
};
