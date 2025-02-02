/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id");
      table.string("name");
      table.timestamps(true, true);
    })
    .createTable("projects", (table) => {
      table.uuid("id").defaultTo(knex.fn.uuid());
      table.string("name");
      table.timestamps(true, true);
    })
    .createTable("tasks", (table) => {
      table.increments("id");
      table.string("title");
      table.text("content");
      table.timestamps(true, true);
      table.timestamp("start_date", { useTz: true });
      table.timestamp("end_date", { useTz: true });
      table.uuid("project_id");

      table.foreign("project_id").references("projects.id").onDelete("CASCADE");
    })
    .createTable("user_tasks", (table) => {
      // Create the join table columns
      table.integer("user_id").unsigned();
      table.integer("task_id").unsigned();

      // Add foreign key constraints
      table.foreign("user_id").references("users.id").onDelete("CASCADE");

      table.foreign("task_id").references("tasks.id").onDelete("CASCADE");

      // Create a composite primary key
      table.primary(["user_id", "task_id"]);

      // Optionally add timestamps
      table.timestamps(true, true);
    })
    .createTable("user_projects", (table) => {
      // Create the join table columns
      table.integer("user_id").unsigned();
      table.uuid("project_id");

      // Add foreign key constraints
      table.foreign("user_id").references("users.id").onDelete("CASCADE");

      table.foreign("project_id").references("projects.id").onDelete("CASCADE");

      // Create a composite primary key
      table.primary(["user_id", "project_id"]);

      // Optionally add timestamps
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("users")
    .dropTable("tasks")
    .dropTable("projects")
    .dropTable("user_tasks")
    .dropTable("user_projects");
};
