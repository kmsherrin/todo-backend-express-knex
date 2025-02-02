/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Clear all tables first
  await knex("user_tasks").del();
  await knex("user_projects").del();
  await knex("tasks").del();
  await knex("projects").del();
  await knex("users").del();

  // Insert users
  const users = await knex("users")
    .insert([
      { name: "Alice Johnson" },
      { name: "Bob Smith" },
      { name: "Carol Williams" },
    ])
    .returning("id");

  console.log(users);

  // Insert projects
  const projects = await knex("projects")
    .insert([
      { name: "Website Redesign" },
      { name: "Mobile App Development" },
      { name: "Database Migration" },
    ])
    .returning("id");

  // Insert tasks
  const tasks = await knex("tasks")
    .insert([
      {
        title: "Design Homepage",
        content: "Create wireframes and mockups for the new homepage",
        start_date: new Date("2025-02-10"),
        end_date: new Date("2025-02-20"),
        project_id: projects[0].id,
      },
      {
        title: "Implement User Authentication",
        content: "Set up secure login and registration system",
        start_date: new Date("2025-02-15"),
        end_date: new Date("2025-02-25"),
        project_id: projects[1].id,
      },
      {
        title: "Data Schema Design",
        content: "Design new database schema and migration plan",
        start_date: new Date("2025-02-20"),
        end_date: new Date("2025-03-05"),
        project_id: projects[2].id,
      },
    ])
    .returning("id");

  // Insert user_projects assignments
  await knex("user_projects").insert([
    { user_id: users[0].id, project_id: projects[0].id },
    { user_id: users[0].id, project_id: projects[1].id },
    { user_id: users[1].id, project_id: projects[1].id },
    { user_id: users[2].id, project_id: projects[2].id },
  ]);

  // Insert user_tasks assignments
  await knex("user_tasks").insert([
    { user_id: users[0].id, task_id: tasks[0].id },
    { user_id: users[1].id, task_id: tasks[1].id },
    { user_id: users[2].id, task_id: tasks[2].id },
    { user_id: users[0].id, task_id: tasks[1].id }, // Alice is also assigned to the authentication task
  ]);
};
