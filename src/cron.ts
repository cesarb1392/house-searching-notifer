import cron from 'node-cron';
import getHouse from "./scraper";
import sendNotifications from "./notitfier";
import {Operation, Void} from "./types";
import filterOutHouse from "./proccesor";
import {getEnvVar} from "./env";

const TO_SCRAPE: Operation[] = [
    {
        to: 'rent',
        url: getEnvVar('SCRAPE_URL_RENT')
    },
    {
        to: 'buy',
        url: getEnvVar('SCRAPE_URL_BUY')
    }
];

const scheduleCron: Void = async () => {
    for (const scrape of TO_SCRAPE) {
        console.info(`Starting cron ${scrape.to}...`);
        // await cron.schedule('* * * * *', async () => {
            try {
                const houseList = filterOutHouse(await getHouse(scrape.url));
                if (houseList.length > 0) {
                    await sendNotifications(houseList, scrape);
                }else{
                    console.info(`But there is not new ones ...`);
                }
            } catch (ex) {
                throw new Error(ex);
            }
        // });
    }
};

export default scheduleCron;
