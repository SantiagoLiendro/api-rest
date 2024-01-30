import expressExpeditious from 'express-expeditious'

const defaulOption = {
    namespace: 'expresscache',
    defaultTtl: "1 minute",
    statusCodeExpires: {
        404: '5 minute',
        500: 0
    }
}

const cacheInit = expressExpeditious(defaulOption)

export default cacheInit;