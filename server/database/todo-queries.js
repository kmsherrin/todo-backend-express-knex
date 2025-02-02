const knex = require("./connection.js");

/**
 * Returns all TASKs for current authenticated user
 */
async function all(currentUser) {
  return knex("tasks")
    .leftJoin("users_tasks", "tasks.id", "users_tasks.task_id")
    .where({ user_id: currentUser });
}

async function get(id) {
  const results = await knex("tasks").where({ id: id });
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
