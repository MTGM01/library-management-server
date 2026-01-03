const { usersCollection } = require("../schema/user")

module.exports = async function validateDeletion(req, res, next) {
    const { userName } = req.body
    const user = await usersCollection.findOne({ userName })
    if (!user) return res.status(404).json({ data: { message: 'The User Name not Found !' } })
    req.body = { id: user._id }
    next()
}
