const { dbConnection } = require("../configs/DB/db.js");
const { ObjectId } = require("mongodb");

const getAll = async () => {
  const db = await dbConnection();
  const usersCollection = db.collection("users");
  const users = await usersCollection.find({}).toArray();
  return users;
};

const checkUserLogin = async (userName, password) => {
  const db = await dbConnection();
  const usersCollection = db.collection("users");
  const loggedinUser = await usersCollection.findOne({
    userName: { $eq: userName },
    password: { $eq: password },
  });
  return loggedinUser;
};

const add = async (user) => {
  const db = await dbConnection();
  const usersCollection = db.collection("users");
  const existedUser = await usersCollection.findOne({
    userName: { $eq: user.userName },
  });

  if (existedUser) {
    return {
      statusCode: 409,
      data: { message: "The user data is existed before !" },
    };
  } else if (!user.userName || !user.password || !user.mobile) {
    return {
      statusCode: 422,
      data: { message: "The user data is not valid !" },
    };
  } else {
    const newUser = {
      ...user,
      crime: 0,
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await usersCollection.insertOne(newUser);
    return {
      statusCode: 201,
      data: { user: newUser, message: "The user added Successfully" },
    };
  }
};

const editCrime = async (user) => {
  const db = await dbConnection();
  const usersCollection = db.collection("users");
  const desiredUser = await usersCollection.findOneAndUpdate(
    { _id: { $eq: new ObjectId(user.id) } },
    {
      $set: {
        crime: user.crime,
      },
    }
  );
  if (desiredUser) {
    return {
      statusCode: 200,
      data: {
        user: desiredUser,
        message: "The user crime setted Successfully",
      },
    };
  } else {
    return {
      statusCode: 422,
      data: { message: "The user is not existed !" },
    };
  }
};

const editRole = async (user) => {
  const db = await dbConnection();
  const usersCollection = db.collection("users");
  const desiredUser = await usersCollection.findOneAndUpdate(
    { _id: { $eq: new ObjectId(user.id) } },
    {
      $set: {
        role: user.role,
      },
    }
  );
  if (desiredUser) {
    return {
      statusCode: 200,
      data: {
        user: desiredUser,
        message: "The user role updated Successfully",
      },
    };
  } else {
    return {
      statusCode: 422,
      data: { message: "The user is not existed !" },
    };
  }
};

module.exports = {
  getAll,
  checkUserLogin,
  add,
  editRole,
  editCrime,
};
