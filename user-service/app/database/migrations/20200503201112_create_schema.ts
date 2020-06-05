import * as knex from 'knex';

export function up(db: knex) {
    return db.schema
        .createTable('users', table => {
            table.uuid('id').primary();
            table.string('email', 64).unique();
            table.string('password', 256).notNullable();
            table.string('username', 64).notNullable();
            table.string('name', 64).notNullable();
            table.dateTime('created').notNullable();
            table.dateTime('updated').notNullable();
        })
        .then(() => {
            return db.schema.createTable('users_sessions', table => {
                table.uuid('id').primary();
                table
                    .uuid('uid')
                    .notNullable()
                    .references('id')
                    .inTable('users');
                table.string('token').notNullable();
                table.string('refresh_token').notNullable();
                table.dateTime('created').notNullable();
                table.dateTime('updated').notNullable();
            })

        })
}

export function down(db: knex) {
    return db.schema.dropTable('users_sessions').dropTable('user')
}
