const knex = require("./connection.js");

/**
 * Using a project ID get all the tasks associated
 *
 * @param {} projectId
 * @param {*} currentUser
 * @returns
 */
async function get(currentUser, projectId) {
  // Authorisation Check, is user in project?
  const result = await knex("user_projects").where({
    user_id: currentUser,
    project_id: projectId,
  });

  if (result.length === 0) {
    throw new Error("User not in project");
  }

  const results = await knex("projects")
    .leftJoin("tasks", "projects.id", "tasks.project_id")
    .where({ project_id: projectId });
  return results[0];
}

module.exports = {
  get,
};
