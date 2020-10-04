exports.up = function(knex, Promise) {
    return knex.schema.createTable('shipp', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.integer('categoriaId').references('id')
        .inTable('categorias').notNull()
        table.integer('fanfomId').references('id')
        .inTable('fandom').notNull()

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('shipp')
};
