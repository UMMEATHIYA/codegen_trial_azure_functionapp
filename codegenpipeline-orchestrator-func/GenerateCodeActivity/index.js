/**
 * GenerateCodeActivity creates sample code based on the prompt and iteration.
 * This placeholder simply returns a string of code; replace with your own code
 * generation logic.
 */
module.exports = async function (context) {
  const { prompt, iteration = 0 } = context.bindings.input || {};
  const code = `// Generated code for iteration ${iteration}\n// prompt: ${prompt}\nfunction main() {\n  return ${iteration};\n}`;
  return { code };
};
