import { getConnection, migrateDb } from './database';
import app from './app';

const PORT = process.env.CONTENT_SERVICE_PORT || '3012';

export async function init22() {
    await getConnection();
    await migrateDb();

    app.listen(PORT, function () {
        console.log(`Content service app listening on port ${PORT}!`);
    });

    return app;
}

init22();
