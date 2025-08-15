/**
 * AnalyzeResultsActivity inspects the test results to determine if the candidate
 * code is acceptable. It returns the number of failures and some feedback
 * text. Replace with your own analysis logic.
 */
module.exports = async function (context) {
  const { testResults, iteration = 0 } = context.bindings.input || {};
  const failures = testResults?.failed || 0;
  let feedback;
  if (failures > 0) {
    feedback = `${failures} tests failed on iteration ${iteration}. Please refine your solution.`;
  } else {
    feedback = 'All tests passed!';
  }
  return { failures, feedback };
};
