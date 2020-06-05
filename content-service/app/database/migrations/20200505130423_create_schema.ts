import * as knex from 'knex';

export function up(db: knex) {
    return db.schema
        .createTable('content', table => {
            table.increments('id').primary();
            table.uuid('uid');
            table.string('content');            
        });        
}

export function down(db: knex) {
    return db.schema.dropTable('users_sessions').dropTable('content')
}
