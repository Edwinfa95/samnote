import { a } from '@aws-amplify/backend';

export const BasicDataModel = {
    BasicData: a.model({
        phoneNumber: a.string(),
        cellphoneNumber: a.string(),
        name: a.string(),
        lastName: a.string(),
        documentType: a.string(),
        documentNumber: a.string(),
        user: a.belongsTo('User','UserId'),
    }).authorization((allow) => [allow.publicApiKey()])
}