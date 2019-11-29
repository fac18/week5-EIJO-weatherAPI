const handlers = require("./handlers.js");

const router = (request, response) => {
  const endpoint = request.url;

  if (endpoint === "/") {
    handlers.handleHome(request, response);

  } else if (endpoint.startsWith("/public")) {
    handlers.handlePublic(request, response, endpoint);
  } else if (endpoint.includes("?q=")) {
    handlers.handleInput(request, response, endpoint);
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end("unknown uri");
  }
};
module.exports = router;
