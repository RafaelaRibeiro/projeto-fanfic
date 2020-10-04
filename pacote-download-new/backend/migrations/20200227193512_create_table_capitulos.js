

exports.up = function(knex, Promise) {
    return knex.schema.createTable('capitulos', table => {
        table.increments('id').primary()
        table.integer('numero').notNull()
        table.string('nome').notNull()
        table.integer('obraId').unsigned().notNull()
        table.foreign('obraId').references('id').inTable('obras')
        table.boolean('publica').notNull().defaultTo(true)
        table.binary('conteudo').notNull()
        table.string('notasIniciais').nullable()
        table.string('notasFinais').nullable()
        
        
        

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('capitulos')
};

