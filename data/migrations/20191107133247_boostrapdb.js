
exports.up = function(knex) {
    return knex.schema.createTable('species', table=>{
        // the type of the Primary Key is: integer without negative values, also called unsigned
      table.increments();
      table.string('name', 255).notNullable();
    })
    .createTable('animals', table=>{
      table.increments();
      table.string('name',255).notNullable();

        //define our Foreign Key
      table
      .integer('species_id')
      .unsigned()
      .references('id')
      .inTable('species')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    })
    .createTable('zoos', table => {
        table.increments();
        table.string('name',255).notNullable();
        table.string('address',512);
    })
    .createTable('animal_zoos', table => {
        table.increments();

        table
        .integer('zoo_id')
        .unsigned()
        .references('id')
        .inTable('zoos')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');

        table
        .integer('animal_id')
        .unsigned()
        .references('id')
        .inTable('animals')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');

        table.date('from');
        table.date('to');
    })
  };

  exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('animal_zoos')
    .dropTableIfExists('zoos')
    .dropTableIfExists('animals')
    .dropTableIfExists('species');
  };
  //knex .. command not found: knex -> npx knex