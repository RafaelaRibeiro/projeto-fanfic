exports.up = function (knex, Promise) {
  return knex.schema.createTable("imagemObras", (table) => {
    table.increments("id").primary();
    table.string("name").notNull();
    table.integer("size").unsigned();
    table.string("path").notNull();
    table.string("key").notNull();
    table.integer("obraId").unsigned().notNull();
    table.foreign("obraId").references("id").inTable("obras");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("imagemObras");
};
