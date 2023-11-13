export const UID_PROP = Symbol('uidProp');
export const TEST_TEMPLATE_LINK = 'https://api.json-generator.com/templates/bfNvq9hlK34J/data';
export const TEST_ACCESS_TOKEN = 'l5e83nar9o715r0bda7rvreygtshhm4cvprrbavp';

export const EMAIL_RX = /^[A-Za-z0-9-_.]*?@[A-Za-z0-9-_.]*?\.[a-z]+$/igm;
export const DATE_EXCLUDE_RX = /[^A-Za-z0-9_\\.\-+:]+/;

export enum GEN_TYPE {
    random,
    genApi,
    upload,
}

export enum VALUE_TYPES {
    string,
    number,
    bool,
}
