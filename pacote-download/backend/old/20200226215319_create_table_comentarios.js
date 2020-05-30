


exports.up = function(knex, Promise) {
    return knex.schema.createTable('comentarios', table => {
        table.increments('id').primary()
        table.integer('obraId').references('id')
        .inTable('obras').notNull()
        table.integer('capituloId').references('id')
        .inTable('capitulos').notNull()
        table.binary('conteudo').notNull()
        table.integer('comentarioId ').references('id')
        .inTable('comentarios').Null()
        

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('comentarios')
};


