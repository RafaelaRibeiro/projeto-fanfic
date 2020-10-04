exports.up = function (knex, Promise) {
  return knex.schema.createTable("usuarios", (table) => {
    table.increments("id").primary();
    table.string("email").notNull().unique();
    table.string("nome").notNull();
    table.string("password").notNull();
    table.string("perfil", 1).notNull().defaultTo("L");
    table.boolean("autor").notNull().defaultTo(false);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("usuarios");
};
