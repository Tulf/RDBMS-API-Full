
exports.up = function(knex, Promise) {
  /*
        here we can implement the changes we want in our database:
        in general refer to the schema building section of the knex docs:
        notice this is the exports **UP** portion not **DOWN**
        https://knexjs.org/#Schema
  */
  return knex.schema.createTable('students', function(table) {
    //to generate a primary id key and auto increment per object passed into db
    //you can pass a string to rename it as anything other than id, id is default
    table.increments()
    // cohort id reference
    table
    .integer('cohort_id')
    .notNullable()
    .references('id')
    .inTable('cohorts');
    /*string value for name, making it required, not provided upon default and 128 character limit because
    whynot, and make it unique because again, whynot? */
    table
    .string('name', 128)
    .notNullable()
    .unique('student_name_index')
    .defaultTo('not provided');
  })
};

exports.down = function(knex, Promise) {
  //here we can undo the changes so we can clean up after ourselves according to Luis:
  return knex.schema.dropTableIfExists('students');
};
