const df = require("durable-functions");

module.exports = async function (context, req) {
  const client = df.getClient(context);

  // Accept from route, query, or body
  let payload;
  try {
    payload = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    payload = undefined;
  }
  const functionName =
    context.bindingData.functionName ||
    req.query?.functionName ||
    (payload && payload.functionName);

  if (!functionName) {
    return { status: 400, body: { error: "Missing orchestrator function name." } };
  }

  try {
    const instanceId = await client.startNew(functionName, undefined, payload);
    // IMPORTANT: pass req here (not context.bindingData.req)
    const statusUris = client.createHttpManagementPayload(req, instanceId);
    return {
      status: 202,
      headers: { "Content-Type": "application/json" },
      body: { instanceId, ...statusUris },
    };
  } catch (err) {
    context.log.error("Error starting orchestration", err);
    return { status: 500, body: { error: err.message } };
  }
};
