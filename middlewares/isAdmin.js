const { isValidObjectId } = require("mongoose");
const UsersModel = require("../models/Users")


module.exports = async function validateAdmin(req, res, next) {
    const { id } = req.params
    const validUserID = isValidObjectId(id)
    if (!validUserID) return res.status(422).json({ data: { message: 'The UserID is Invalid !' } })
    const user = await UsersModel.getOne(id)
    if (!user) return res.status(404).json({ data: { message: "The User not Found" } })
    if (user.data.result.role !== 'ADMIN') return res.status(401).json({ data: { message: "The User Role has no Access to This Route" } })
    next()
}
