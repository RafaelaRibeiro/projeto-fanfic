

exports.up = function(knex, Promise) {
    return knex.schema.createTable('prateleiras', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        
       

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('prateleiras')
};