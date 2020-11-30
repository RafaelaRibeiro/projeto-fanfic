

exports.up = function(knex, Promise) {
    return knex.schema.createTable('notas', table => {
        table.increments('id').primary()
        table.string('conteudo').notNull()
        table.integer('usuarioId').unsigned().notNull()
        table.foreign('usuarioId').references('id').inTable('usuarios')
       

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('notas')
};
