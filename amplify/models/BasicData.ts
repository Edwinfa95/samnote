import { a } from '@aws-amplify/backend';

export const BasicDataModel = {
    BasicData: a.model({
        phoneNumber: a.string(),
        cellphoneNumber: a.string(),
        name: a.string(),
        lastName: a.string(),
        documentType: a.string(),
        documentNumber: a.string(),
        user_id: a.string()
    }).authorization((allow) => [allow.publicApiKey()])
}