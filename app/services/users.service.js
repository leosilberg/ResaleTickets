//! npx json-server --watch "../data/test-data.json"
export const usersService = {
  getUsers,
  getUser,
  getCurrentUser,
  validateUserName,
  validateEmail,
  logInUser,
};
("../../data/test-data.json");
let _currentUser;

async function getUsers() {
  try {
    const result = await axios.get(
      "http://localhost:8001/users?_embed=tickets"
    );
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}
async function getUser(userId) {
  try {
    const result = await axios.get(
      `http://localhost:8001/users/${userId}?_embed=tickets`
    );
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

function getCurrentUser() {
  return _currentUser;
}

async function validateUserName(userName) {
  try {
    const result = await axios.get(
      `http://localhost:8001/users?username=${userName}`
    );
    console.log(result.data.length == 0);
    return result.data.length == 0;
  } catch (error) {
    console.log(error);
  }
}
async function validateEmail(email) {
  try {
    const result = await axios.get(
      `http://localhost:8001/users?userInfo.email=${email}`
    );
    console.log(result.data.length == 0);
    return result.data.length == 0;
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function logInUser(userName, userPassword) {
  console.log(userName, userPassword);
  try {
    const result = await axios.get(
      `http://localhost:8001/users?username=${userName}&_embed=tickets`
    );
    if (result.data.length == 1) {
      if (result.data[0].password === userPassword) {
        _currentUser = result.data;
        return true;
      }
    }
    return false;
  } catch (error) {
    console.log(error);
  }
}
