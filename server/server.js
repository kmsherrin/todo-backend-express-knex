const app = require("./server-config.js");
const routes = require("./server-routes.js");

const port = process.env.PORT || 5000;

// Base route for fetching all tasks user is assigned to
app.get("/", routes.getAllTasks);

// Route for fetching all of a projects tasks
app.get("/project/:projectId", routes.getProjectTasks);

// Route for fetching a specific task, with it's content
app.get("/project/:projectId/task/:id", routes.getTask);

app.post("/", routes.postTodo);
app.patch("/:id", routes.patchTodo);

app.delete("/", routes.deleteAllTodos);
app.delete("/:id", routes.deleteTodo);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
