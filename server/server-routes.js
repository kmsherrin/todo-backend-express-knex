const _ = require("lodash");
const todos = require("./database/todo-queries.js");
const projects = require("./database/project-queries.js");

function createToDo(req, data) {
  const protocol = req.protocol,
    host = req.get("host"),
    id = data.id;

  return {
    title: data.title,
    order: data.order,
    completed: data.completed || false,
    url: `${protocol}://${host}/${id}`,
  };
}

async function getAllTasks(req, res) {
  const currentUser = 1;
  const allEntries = await todos.all(currentUser);
  return res.send(allEntries.map(_.curry(createToDo)(req)));
}

async function getTask(req, res) {
  const currentUser = 1;
  const task = await todos.get(
    req.params.projectId,
    currentUser,
    req.params.id
  );
  return res.send(task);
}

async function getProjectTasks(req, res) {
  const currentUser = 1;

  const projectTasks = await projects.get(currentUser, req.params.projectId);

  return res.send(projectTasks);
}

async function postTodo(req, res) {
  const created = await todos.create(req.body.title, req.body.order);
  return res.send(createToDo(req, created));
}

async function patchTodo(req, res) {
  const patched = await todos.update(req.params.id, req.body);
  return res.send(createToDo(req, patched));
}

async function deleteAllTodos(req, res) {
  const deletedEntries = await todos.clear();
  return res.send(deletedEntries.map(_.curry(createToDo)(req)));
}

async function deleteTodo(req, res) {
  const deleted = await todos.delete(req.params.id);
  return res.send(createToDo(req, deleted));
}

function addErrorReporting(func, message) {
  return async function (req, res) {
    try {
      return await func(req, res);
    } catch (err) {
      console.log(`${message} caused by: ${err}`);

      // Not always 500, but for simplicity's sake.
      res.status(500).send(`Opps! ${message}.`);
    }
  };
}

const toExport = {
  getAllTasks: {
    method: getAllTasks,
    errorMessage: "Could not fetch all todos",
  },
  getTask: { method: getTask, errorMessage: "Could not fetch todo" },
  getProjectTasks: {
    method: getProjectTasks,
    errorMessage: "Could not fetch project tasks",
  },
  postTodo: { method: postTodo, errorMessage: "Could not post todo" },
  patchTodo: { method: patchTodo, errorMessage: "Could not patch todo" },
  deleteAllTodos: {
    method: deleteAllTodos,
    errorMessage: "Could not delete all todos",
  },
  deleteTodo: { method: deleteTodo, errorMessage: "Could not delete todo" },
};

for (let route in toExport) {
  toExport[route] = addErrorReporting(
    toExport[route].method,
    toExport[route].errorMessage
  );
}

module.exports = toExport;
