

exports.up = function(knex, Promise) {
    return knex.schema.createTable('notas', table => {
        table.increments('id').primary()
        table.string('conteudo').notNull()
        table.integer('autor').references('id')
        .inTable('usuarios').notNull()
       

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('notas')
};
