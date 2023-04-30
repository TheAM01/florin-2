import Database from '@replit/database';
import getReplitUrl from "./get-db-url.js";

const dbUrl = await getReplitUrl();

export default new Database(dbUrl)