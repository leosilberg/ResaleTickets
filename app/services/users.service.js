//! npx json-server --watch "../data/test-data.json"
export const usersService = {
  getUsers,
  getUser,
  getCurrentUser,
  validateUserName,
  validateEmail,
  logInUser,
  createUser,
};

const CURRENT_USER_KEY = "currentUserID";

async function getUsers() {
  try {
    const result = await axios.get(
      "http://localhost:8001/users?_embed=tickets&_embed=purchasedTickets"
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
      `http://localhost:8001/users/${userId}?_embed=tickets&_embed=purchasedTickets`
    );
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

async function getCurrentUser() {
  if (localStorage.getItem(CURRENT_USER_KEY)) {
    return await getUser(localStorage.getItem(CURRENT_USER_KEY));
  } else {
    throw new Error("No user is currently logged in");
  }
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
  try {
    const result = await axios.get(
      `http://localhost:8001/users?username=${userName}&_embed=tickets&_embed=purchasedTickets`
    );
    if (result.data.length == 1) {
      if (result.data[0].password === userPassword) {
        localStorage.setItem(CURRENT_USER_KEY, result.data[0].id);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
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
    localStorage.setItem(CURRENT_USER_KEY, result.data.id);
  } catch (error) {
    console.log(error);
  }
}
