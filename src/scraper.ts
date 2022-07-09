import {load} from 'cheerio';
import axios from 'axios';
import {GetHouse, House} from "./types";

const getHouse: GetHouse = async (url) => {
    const result: House[] = []

    const {data} = await axios.get(url);
    const $ = load(data);
    console.info(`site scrapped!`)

    $(".search-result-main").each((index, element) => {
        const item = $(element).find('.search-result-content-inner')
        const image = $(element).find('.search-result-image > img').attr('src')

        const trigger = url,
            regexp = new RegExp('^((https?|ftp):\\/)?\\/?([^:\\/\\s]+)((\\/\\w+)*\\/)([\\w\\-\\.]+[^#?\\s]+)(.*)?(#[\\w\\-]+)?$'),
            host = regexp.exec(trigger)?.[3];

        const link = host.concat(item.find('div > div > a').attr('href'))
        const street = item.find('div > div > a > h2').text().trim()
        const postcode = item.find('div > div > a > h4').text().trim()
        const price = item.find('.search-result-price').text()
        const info = item.find('.search-result-info > ul > li')
            .toArray()
            .map(element => $(element).text().trim())
            .join(' - ')

        result.push({
            image,
            address: `${street} - ${postcode}`,
            price,
            info,
            link
        })
    })
    console.info(`found ${result.length} house available`)
    return result
};

export default getHouse;
