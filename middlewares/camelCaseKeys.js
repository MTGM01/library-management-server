const camelCaseKeys = (...args) => import('camelcase-keys').then(({ default: camelCase }) => camelCase(args))

module.exports = async function camelCase(req, res, next) {
    req.body = (await camelCaseKeys(req.body, { deep: true }))[0]
    req.params = (await camelCaseKeys(req.params))[0]
    req.query = (await camelCaseKeys(req.query))[0]

    next()
}
