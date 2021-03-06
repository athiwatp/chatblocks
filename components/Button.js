const createAPIElement = require("../createAPIElement");
const pick = require("object.pick");

const types = {
    URL: "web_url",
    POSTBACK: "postback",
    SHARE: "element_share",
    PAYMENT: "payment",
    PHONENUMBER: "phone_number",
    GAMEPLAY: "game_play",
    ACCOUNTLINK: "account_link",
    ACCOUNTUNLINK: "account_unlink",
};

const props = [
    {
        chatblocksName: "title",
        messengerName: "title",
        types: [types.POSTBACK, types.PAYMENT, types.GAMEPLAY, types.PHONENUMBER, types.URL]
    },
    {
        chatblocksName: "payload",
        messengerName: "payload",
        types: [types.POSTBACK, types.PAYMENT, types.GAMEPLAY, types.PHONENUMBER]
    },
    {
        chatblocksName: "url",
        messengerName: "url",
        types: [types.URL, types.ACCOUNTLINK]
    },
    {
        chatblocksName: "shareContents",
        messengerName: "share_contents",
        types: [types.SHARE]
    },
    {
        chatblocksName: "paymentSummary",
        messengerName: "payment_summary",
        types: [types.PAYMENT]
    },
    {
        chatblocksName: "priceList",
        messengerName: "price_list",
        types: [types.PAYMENT]
    },
    {
        chatblocksName: "gameMetadata",
        messengerName: "game_metadata",
        types: [types.GAMEPLAY]
    },
    {
        chatblocksName: "messengerExtensions",
        messengerName: "messenger_extensions",
        types: [types.URL]
    },
    {
        chatblocksName: "webviewHeightRatio",
        messengerName: "webview_height_ratio",
        types: [types.URL]
    },
    {
        chatblocksName: "fallbackURL",
        messengerName: "fallback_url",
        types: [types.URL]
    },
];

function Button(props, ...children) {
    const type = props.type ? props.type : guessType(props);
    props.title = children.length > 0 ? children[0] : "";
    return {
        type: type,
        ...getParams(type, props)
    };
}

function guessType(props) {
    if (props.type) {
        return props.type;
    }
    return props.url ? types.URL : types.POSTBACK;
}

function getMessengerParamByProp(prop) {
    return props.find(el => el.chatblocksName === prop).messengerName;
}

function getParams(type, passedProps) {
    const allowedPropsByType = props.filter(prop => {
        return prop.types.includes(type)
    }).map(prop => prop.chatblocksName);

    const allowedProps = pick(passedProps, allowedPropsByType);
    const allowedPropsToMessengerParams =  Object.keys(allowedProps).reduce((previousValue, currentValue) => {
        return {
            ...previousValue,
            [getMessengerParamByProp(currentValue)]: allowedProps[currentValue]
        }
    }, {});
    return allowedPropsToMessengerParams;
}

module.exports = Button;