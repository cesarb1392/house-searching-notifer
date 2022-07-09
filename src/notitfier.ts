import {House, Notify} from "./types";
import {google} from 'googleapis';
import {getEnvVar} from "./env";
import {Transporter} from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const createTransporter: () => Promise<Transporter<SMTPTransport.SentMessageInfo>> = async () => {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
        getEnvVar('CLIENT_ID'),
        getEnvVar('CLIENT_SECRET'),
        "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
        refresh_token: getEnvVar('REFRESH_TOKEN'),
    });

    const accessToken = await new Promise((resolve, reject) => {
        //getAccessToken  which will check the access_token, and use it, unless it has expired, in which case it will use the refresh_token to generate a new access_token
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });

    return require('nodemailer').createTransport({
        port: 465,
        host: "smtp.gmail.com",
        secure: true,
        auth: {
            type: "OAuth2",
            accessToken,
            user: getEnvVar('EMAIL_FROM'),
            clientId: getEnvVar('CLIENT_ID'),
            clientSecret: getEnvVar('CLIENT_SECRET'),
        }
    });
};

const getMessageTemplate: (houseList: House[]) => string = (houseList) => {
    let message = `<html><body>`;
    for (const house of houseList) {
        message += `   
<table>
    <tr>
            <td>    
                <a href="${house.link}">     
                    <img width="150" height="150" src="${house.image}">
                </a>
            </a>
            </td>
            <td>            
                <ul>
                    <li>
                        <span>Address:</span> ${house.address} 
                    </li>
                    <li>
                        <span>Price:</span> ${house.price}
                    </li>
                    <li>
                        <span>Info:</span> ${house.info}
                    </li>
                <li>
                    <a href="${house.link}">Link here!</a>
                </li>
                </ul>
            </td>
    </tr>
</table>
`;
    }
    message += `</body></html>`;
    return message;
};

const sendNotifications: Notify = async (houseList, operation) => {
    try {
        const transporter = await createTransporter();
        await transporter.sendMail({
            from: getEnvVar('EMAIL_FROM'),
            to: getEnvVar('EMAIL_TO'),
            subject: `To ${operation.to}: New house available!`,
            html: getMessageTemplate(houseList)
        });
        console.info(`notified about ${houseList.length} new properties to ${operation.to}`);
    } catch (ex) {
        throw new Error(ex);
    }
};
export default sendNotifications;


