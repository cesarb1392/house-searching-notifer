import 'dotenv/config';
import {Void} from "./types";
import scheduleCron from "./cron";
import {isValidEnv} from "./env";

const main: Void = async () => {
    try {
        isValidEnv()
        await scheduleCron()
    } catch (ex) {
        console.error(JSON.stringify(ex))
    }
};

main()
    .then()
    .catch(ex => console.error('Process Exit ==> ', {ex}));
