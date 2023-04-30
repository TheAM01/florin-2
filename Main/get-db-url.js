import fetch from "node-fetch";
import fs from "fs";
import config from '../config.js'


async function getReplitUrl() {

    let request, text;

    try {
        request = await fetch(
            'https://florin-db.theam01.repl.co/database_url',
            {
                headers: {
                    auth_key: config.dbAuth
                }
            }
        );
    } catch (err) {

        return fs.readFileSync('./Replit-db-url.txt')

    } finally {

        text = await request.text()
        await fs.writeFile('./Replit-db-url.txt', text, () => {})
        return text;

    }

}

export default getReplitUrl