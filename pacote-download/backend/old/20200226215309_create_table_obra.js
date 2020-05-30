
exports.up = function(knex, Promise) {
    return knex.schema.createTable('obras', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.integer('autor').references('id')
        .inTable('usuarios').notNull()
        table.boolean('publica').notNull().defaultTo(true)
        table.integer('categoriaId').references('id')
        .inTable('categorias').notNull()
        table.integer('fanfomId').references('id')
        .inTable('fandom').Null()
        table.integer('shippId').references('id')
        .inTable('shipp').Null()
        table.string('classificacao',10).notNull()
        table.boolean('terminada').notNull().defaultTo(false)

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('obras')
};
