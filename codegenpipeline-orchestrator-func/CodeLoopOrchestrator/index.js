const df = require("durable-functions");

/**
 * CodeLoopOrchestrator orchestrates the code generation pipeline:
 *   1. GenerateCodeActivity
 *   2. ExecuteCodeActivity
 *   3. AnalyzeResultsActivity
 * It loops until tests pass or the maximum number of retries is reached.
 */
module.exports = df.orchestrator(function* (context) {
  const input = context.df.getInput() || {};
  let prompt = input.prompt || "default spec";
  const maxRetries = Number.isInteger(input.maxRetries) ? input.maxRetries : 3;

  let iteration = 0;
  let lastTestResults = null;

  while (iteration < maxRetries) {
    // 1) Generate code
    const { code } = yield context.df.callActivity("GenerateCodeActivity", { prompt, iteration });

    // 2) Execute tests
    const { testResults } = yield context.df.callActivity("ExecuteCodeActivity", { code, iteration });
    lastTestResults = testResults;

    // 3) Analyze results
    const { failures, feedback } = yield context.df.callActivity("AnalyzeResultsActivity", { testResults, iteration });

    if (failures === 0) {
      return {
        status: "succeeded",
        iterations: iteration + 1,
        results: testResults,
      };
    }

    iteration += 1;
    prompt = `refine-code: ${feedback}`;
  }

  return {
    status: "failed",
    iterations: iteration,
    results: lastTestResults,
  };
});
