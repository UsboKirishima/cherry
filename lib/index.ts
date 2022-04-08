import colors from "colors"
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { ascii, ascii_info } from "../config/ascii"
import { isNumberObject } from "node:util/types";

colors.enable();

const cherry = async (): Promise<void | any> => {
    console.clear();

    await print_ascii();

    let webhooks = await req_threads();

    console.clear();

    await print_ascii();

    let urls = await wh_url(webhooks);

    //console.log(urls);
}

const print_ascii = async (): Promise<void> => {
    await console.log(ascii.grey);
    await console.log(ascii_info);
}

const req_threads = async (): Promise<number> => {
    let rl = readline.createInterface({ input, output });
    let answer: string | number = await rl.question('[+] Insert the number of webhook: '.blue);
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

const wh_url = async (wh: number) => {
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

(async (): Promise<void | any> => {
    await cherry();
})();