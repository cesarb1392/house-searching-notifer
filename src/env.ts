import assert from "assert";
import {GetEnvVar} from "./types";

const isValidEnv: () => void = () => {
    assert(process.env.SCRAPE_URL_RENT, 'SCRAPE_URL_RENT is null');
    assert(process.env.SCRAPE_URL_BUY, 'SCRAPE_URL_BUY is null');
    assert(process.env.REFRESH_TOKEN, 'REFRESH_TOKEN is null');
    assert(process.env.CLIENT_SECRET, 'CLIENT_SECRET is null');
    assert(process.env.CLIENT_ID, 'CLIENT_ID is null');
    assert(process.env.EMAIL_FROM, 'EMAIL_FROM is null');
    assert(process.env.EMAIL_TO, 'EMAIL_TO is null');
    console.info(`Env vars loaded...`);
}

const getEnvVar: GetEnvVar = (envVar) => {
    const env = process.env
    if (!env[envVar]) {
        throw new Error(`Key ${envVar} not found in procces.env`)
    }
    return env[envVar]
}

export {isValidEnv, getEnvVar}
