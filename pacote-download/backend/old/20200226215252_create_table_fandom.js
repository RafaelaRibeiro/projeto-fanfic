exports.up = function(knex, Promise) {
    return knex.schema.createTable('fandom', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.integer('categoriaId').references('id')
        .inTable('categorias').notNull()

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('fandom')
};
