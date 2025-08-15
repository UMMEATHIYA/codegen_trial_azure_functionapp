module.exports = async function (context, req) {
    try {
      const name = req.query.name || (req.body && req.body.name);
  
      if (!name) {
        return {
          status: 400,
          body: { error: "Please provide a name in the query string or request body." }
        };
      }
  
      return {
        status: 200,
        body: { message: `Hello, ${name}!` }
      };
  
    } catch (err) {
      context.log.error("Unexpected error in HelloHttp:", err);
      return {
        status: 500,
        body: { error: "An unexpected error occurred.", details: err.message }
      };
    }
  };
  