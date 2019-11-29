const handlers = require("./handlers.js");

const router = (request, response) => {
  const endpoint = request.url;

  if (endpoint === "/") {
    handlers.handleHome(request, response);

    // maybe need to handleInput????????
  } else if (endpoint.startsWith("/public")) {
    handlers.handlePublic(request, response, endpoint); // PASS THE URL
  } else if (endpoint.includes("?q=")) {
    handlers.handleInput(request, response, endpoint);
    console.log("hello this is at the endpoint search");
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end("unknown uri");
  }
};
module.exports = router;
