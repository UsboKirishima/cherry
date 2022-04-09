import colors from "colors";
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { ascii, ascii_info } from "../config/ascii"
import { isNumberObject } from "node:util/types";
import axios from 'axios';

colors.enable();

let webhooks: number,
    urls: string[],
    avatarURL: string,
    username: string,
    content: string;

const cherry = async (): Promise<void | any> => {
    console.clear();

    await print_ascii();

    webhooks = await req_threads();

    console.clear();

    await print_ascii();

    urls = await wh_url(webhooks);

    console.clear();

    await print_ascii();

    avatarURL = await getAvatar();

    console.clear();

    await print_ascii();

    username = await getUsername();

    console.clear();

    await print_ascii();

    content = await getContent();

    await spamMessages();
}

const print_ascii = async (): Promise<void> => {
    await console.log(ascii.grey);
    await console.log(ascii_info);
}

const req_threads = async (): Promise<number> => {
    let rl = readline.createInterface({ input, output });
    let answer: string | number = await rl.question('[?] Insert the number of webhook: '.blue);
    if (typeof answer !== 'string') {
        cherry();
    }
    rl.close()

    switch (answer) {
        case '1':
            {
                answer = 1;
            }
            break;
        case '2':
            {
                answer = 2;
            }
            break;
        case '3':
            {
                answer = 3;
            }
            break;
        case '4':
            {
                answer = 4;
            }
            break;
        case '5':
            {
                answer = 5;
            }
            break;
        case '6':
            {
                answer = 6;
            }
            break;
        default:
            {
                answer = 1;
            }
            break;
    }

    return answer;
}

const wh_url = async (wh: number): Promise<string[]> => {
    let url: string[] = [];
    for (let i = 1; i < wh + 1; i++) {
        let rl = readline.createInterface({ input, output });
        let answer: string = await rl.question(`[?] Insert the webhook url(${i}): `.blue);
        if (typeof answer !== 'string') {
            cherry();
        }
        rl.close()
        url.push(answer);
    }
    return url;
}

const getAvatar = async (): Promise<string> => {
    let rl = readline.createInterface({ input, output });
    let answer: string = await rl.question(`[?] Insert the webhook avatar url (default): `.blue);
    if (typeof answer !== 'string') {
        cherry();
    }
    if (answer.toLowerCase() == 'default')
        return 'https://pbs.twimg.com/profile_images/1303109604688224257/3zsnQHJq_400x400.jpg';
    rl.close()
    return answer;
}

const getUsername = async (): Promise<string> => {
    let rl = readline.createInterface({ input, output });
    let answer: string = await rl.question(`[?] Insert the webhook username: `.blue);
    if (typeof answer !== 'string') {
        cherry();
    }
    if (answer == '') await cherry();
    rl.close()
    return answer;
}

const randomText = async (length: number): Promise<string> => {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * length));
    }
    return result;
}

const getContent = async (): Promise<string> => {
    let rl = readline.createInterface({ input, output });
    let answer: string = await rl.question(`[?] Insert the webhook message content\n[trandom] [urandom] [everyone] [here]: `.blue);
    if (typeof answer !== 'string') {
        cherry();
    }
    if (!answer) await cherry();

    answer.replace('[trandom]', await randomText(10)),
        answer.replace('[urandom]', 'https://picsum.photos/200/300?random=1'),
        answer.replace('[everyone]', '@everyone'),
        answer.replace('[here]', '@here');

    rl.close()
    return answer;
}

const sendMessages = async (): Promise<void> => {
    urls.forEach(async (w): Promise<void | any> => {
        await axios.post(w, {
            username: username,
            content: content,
            avatar_url: avatarURL,
        })
            .then(async (response) => {
                console.log("[+] webhook sent!".green)
            })
            .catch(async (error) => {
                console.log("[-] an error occurred.".red);
            });
    })
}

const spamMessages = async (): Promise<void> => {
    try {
        while(true) {
            await sendMessages().then(async () => {
                console.log('[+] message successfully sent!'.green);
            })
        }
    } catch(error) {
        await console.error(error);
    }
}

(async (): Promise<void | any> => {
    await cherry();
})();