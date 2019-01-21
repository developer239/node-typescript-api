import Knex from 'knex'

exports.up = (knex: Knex) =>
  knex.schema
    .createTable('users', table => {
      table.increments('id').primary()
      table.string('email').unique()
      table.string('password')
      table.string('reset_password_token').nullable()
      table.dateTime('reset_password_token_expires').nullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .createTable('refresh_tokens', table => {
      table.increments('id').primary()
      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()
      table.string('token').unique()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })

exports.down = (knex: Knex) =>
  knex.schema
    .dropTable('refresh_tokens')
    .dropTable('users')
