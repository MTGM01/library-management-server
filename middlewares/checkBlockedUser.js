const { isValidObjectId } = require("mongoose");
const UsersModel = require("../models/Users");

function extractUserId(req) {
  if (!req) return null;
  const body = req.body || {};
  const query = req.query || {};
  const params = req.params || {};
  return (
    body.id ||
    body.userID ||
    body.userId ||
    body.user_id ||
    query.userID ||
    query.userId ||
    query.user_id ||
    query.id ||
    params.id ||
    params.userID ||
    params.userId ||
    null
  );
}

/**
 * Middleware: blocks requests coming from users whose status is BLOCK.
 * - Tries to find the acting user id in body / query / params.
 * - Public requests without any user id (e.g. browsing book list) pass through;
 *   the client router guard still re-validates the session on route change/reload.
 * - If the user is BLOCKed, responds with 403 so the client can
 *   force-logout and redirect to the login page.
 */
module.exports = async function checkBlockedUser(req, res, next) {
  try {
    const userId = extractUserId(req);
    if (!userId || !isValidObjectId(userId)) return next();

    const user = await UsersModel.getOne(userId);
    const found = user && user.data && user.data.result;
    if (!found) return next();

    if (found.status === "BLOCK") {
      return res.status(403).json({
        message: "User account is blocked. Please visit the library in person.",
      });
    }
    return next();
  } catch (err) {
    return next();
  }
};
