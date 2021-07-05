exports.up = function(knex, Promise) {
    return knex.schema.createTable('fandons', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.integer('categoriaId').unsigned().notNull()
        table.foreign('categoriaId').references('id').inTable('categorias')
       

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('fandons')
};
