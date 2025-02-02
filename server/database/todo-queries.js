const knex = require("./connection.js");

/**
 * Returns all TASKs for current authenticated user
 */
async function all(currentUser) {
  return knex("tasks")
    .leftJoin("user_tasks", "tasks.id", "user_tasks.task_id")
    .where({ user_id: currentUser });
}

async function get(projectId, currentUser, taskId) {
  // Authorisation Check, is user in project?
  const result = await knex("user_projects").where({
    user_id: currentUser,
    project_id: projectId,
  });

  if (result.length === 0) {
    throw new Error("User not in project");
  }

  const results = await knex("tasks").where({
    project_id: projectId,
    "tasks.id": taskId,
  });
  return results[0];
}

async function create(title, order) {
  const results = await knex("todos").insert({ title, order }).returning("*");
  return results[0];
}

async function update(id, properties) {
  const results = await knex("todos")
    .where({ id })
    .update({ ...properties })
    .returning("*");
  return results[0];
}

// delete is a reserved keyword
async function del(id) {
  const results = await knex("todos").where({ id }).del().returning("*");
  return results[0];
}

async function clear() {
  return knex("todos").del().returning("*");
}

module.exports = {
  all,
  get,
  create,
  update,
  delete: del,
  clear,
};
