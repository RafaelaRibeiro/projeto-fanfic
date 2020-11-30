


exports.up = function(knex, Promise) {
    return knex.schema.createTable('estante', table => {
        table.increments('id').primary()
        table.integer('usuarioId').unsigned().notNull()
        table.foreign('usuarioId').references('id').inTable('usuarios')
        table.integer('obraId').unsigned().notNull()
        table.foreign('obraId').references('id').inTable('obras')
        table.integer('capituloId').unsigned().notNull()
        table.foreign('capituloId').references('id').inTable('capitulos')
        table.integer('prateleiraId').unsigned().notNull()
        table.foreign('prateleiraId').references('id').inTable('prateleiras')
        table.boolean('sugerir').notNull().defaultTo(false)
      
        

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('estante')
};


