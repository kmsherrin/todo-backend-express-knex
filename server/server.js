const app = require("./server-config.js");
const routes = require("./server-routes.js");

const port = process.env.PORT || 5000;

app.get("/", routes.getAllTasks);

app.get("/project/:projectId", routes.getProjectTasks);

app.get("/project/:projectId/task/:id", routes.getTask);

app.post("/", routes.postTodo);
app.patch("/:id", routes.patchTodo);

app.delete("/", routes.deleteAllTodos);
app.delete("/:id", routes.deleteTodo);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
