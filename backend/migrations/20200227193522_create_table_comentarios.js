


exports.up = function(knex, Promise) {
    return knex.schema.createTable('comentarios', table => {
        table.increments('id').primary()
        table.integer('obraId').unsigned().notNull()
        table.foreign('obraId').references('id').inTable('obras')
        table.integer('capituloId').unsigned().notNull()
        table.foreign('capituloId').references('id').inTable('capitulos')
        table.binary('conteudo').notNull()
        table.integer('comentarioId').unsigned().notNull()
        table.foreign('comentarioId').references('id').inTable('comentarios')
        

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('comentarios')
};


