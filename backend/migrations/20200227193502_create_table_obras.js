
exports.up = function(knex, Promise) {
    return knex.schema.createTable('obras', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.integer('autor').unsigned().notNull()
        table.foreign('autor').references('id').inTable('usuarios')
        table.boolean('publica').notNull().defaultTo(true)
        table.integer('categoriaId').unsigned().notNull()
        table.foreign('categoriaId').references('id').inTable('categorias')
        table.integer('fanfonsId').unsigned().notNull()
        table.foreign('fanfonsId').references('id').inTable('fandons')
        table.integer('shippId').unsigned().notNull()
        table.foreign('shippId').references('id').inTable('fandons')
        table.string('classificacao',10).notNull()
        table.boolean('terminada').notNull().defaultTo(false)
        table.foreign('prateleiraId').references('id').inTable('prateleiras')

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('obras')
};
