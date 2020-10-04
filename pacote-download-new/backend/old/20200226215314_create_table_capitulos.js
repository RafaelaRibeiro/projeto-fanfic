

exports.up = function(knex, Promise) {
    return knex.schema.createTable('capitulos', table => {
        table.increments('id').primary()
        table.integer('numero').notNull()
        table.string('nome').notNull()
        table.integer('obraId').references('id')
        .inTable('obras').notNull()
        table.boolean('publica').notNull().defaultTo(true)
        table.binary('conteudo').notNull()
        table.string('notasIniciais').Null()
        table.string('notasFinais').Null()
        

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('capitulos')
};

