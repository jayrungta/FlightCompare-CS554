const dbConnection = require("./worker/dbconfig/MongoConnection");
const users = require("./data/users");

async function test() {
    (await dbConnection()).dropDatabase();

    let userId = await users.addUser({
        username: "default",
        password: "123"
    });
    console.log(userId);

    let user = await users.getUserById(userId);
    console.log(user);

    let allUsers = await users.getAllUsers();
    console.log(allUsers);

    let notUnique = await users.isUsernameUnique("default");
    let unique = await users.isUsernameUnique("notDefault");
    console.log(notUnique);
    console.log(unique);

    let authUser = await users.getUserByAuth("default", "123");
    console.log(authUser);
    let notAuthUser = users.getUserByAuth("default", "321").catch((err) => {
        console.log(err);
    });
}

test();