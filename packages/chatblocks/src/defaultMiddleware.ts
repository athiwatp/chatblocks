// this could be another package to remove most of all dependencies
import {createAPICall} from "./createAPICall";

export async function defaultMiddleware({messages, pageAccessToken, facebookAPIVersion, senderId}) {
    const funcs = messages.map((message) => {
        return createAPICall(message, pageAccessToken, facebookAPIVersion, senderId);
    });

    for (const func of funcs) {
        await func();
    }
}