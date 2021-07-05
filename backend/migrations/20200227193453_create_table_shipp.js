exports.up = function(knex, Promise) {
    return knex.schema.createTable('shipp', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.integer('categoriaId').unsigned().notNull()
        table.foreign('categoriaId').references('id').inTable('categorias')
        table.integer('fanfonsId').unsigned().notNull()
        table.foreign('fanfonsId').references('id').inTable('fandons')

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('shipp')
};
