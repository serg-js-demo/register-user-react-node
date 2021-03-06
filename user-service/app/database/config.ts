export interface Configuration {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    debug: boolean;
}

export default <Configuration>{
    database: process.env.MYSQL_DATABASE || 'user_db',
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT) || 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_ROOT_PASSWORD || 'secret',
    debug: true
};