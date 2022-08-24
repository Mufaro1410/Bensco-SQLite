/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('fleet', table => {
    table.increments();
    table.date('date');
    table.time('time');
    table.string('location');
    table.string('zones')//.references('zones').inTable('zones').onDelete('CASCADE').onUpdate('CASCADE').notNullable();
    table.string('assetID');
    table.string('assetName');
  })
  .createTable('zones', table => {
    table.increments();
    table.string('location').unique();
    table.integer('group_id').references('id').inTable('group').onDelete('CASCADE').onUpdate('CASCADE').notNullable();
  })
  .createTable('group', table => {
    table.increments();
    table.string('name').unique().notNullable();
  })
  .createTable('trips', table => {
    table.increments();
    table.date('date');
    table.time('time');
    table.string('location');
    table.string('zones')//.references('zones').inTable('zones').onDelete('CASCADE').onUpdate('CASCADE').notNullable();
    table.string('assetID');
    table.string('assetName');
    table.string('groupName');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('fleet').dropTableIfExists('zones').dropTableIfExists('group')
};
