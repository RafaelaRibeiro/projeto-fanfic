exports.up = function (knex, Promise) {
  return knex.schema.createTable("usuarios", (table) => {
    table.increments("id").primary();
    table.string("email").notNull().unique();
    table.string("nome").notNull();
    table.string("password").notNull();
    table.string("perfil", 1).notNull().defaultTo("L");
    table.string("autor").notNull().defaultTo("N");
    table.string("sobreMim").nullable();
    table.string("facebook").nullable();
    table.string("twitter").nullable();
    table.string("instagram").nullable();
    table.string("pinterest").nullable();
    table.string("tumblr").nullable();
    table.binary("imagemPerfil").nullable();
    table.binary("imagemCapa").nullable();
    table.timestamp("dataRegistro");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("usuarios");
};
