export const usersService = {
  getUsers,
  getUser,
  getCurrentUser,
  validateUserName,
  validateEmail,
  logInUser,
  createUser,
};

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
  }
}
async function logInUser(userName, userPassword) {
  try {
    const result = await axios.get(
      `http://localhost:8001/users?username=${userName}&password=${userPassword}&_embed=tickets`
    );
    console.log(result.data.length == 1);
    if (result.data.length == 1) {
      _currentUser = result.data[0];
      console.log(_currentUser);
    }
    return result.data.length == 1;
  } catch (error) {
    console.log(error);
  }
}

async function createUser(formData) {
  try {
    const result = await axios.post(
      "http://localhost:8001/users",
      {
        username: formData.get("username"),
        password: formData.get("password"),
        userInfo: {
          fname: formData.get("fname"),
          lname: formData.get("lname"),
          email: formData.get("email"),
        },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(result.data);
    if (result.data.length == 1) {
      _currentUser = result.data[0];
      console.log(_currentUser);
    }
    return result.data.length == 1;
  } catch (error) {
    console.log(error);
  }
} 