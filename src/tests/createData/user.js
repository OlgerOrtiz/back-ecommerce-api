const User = require("../../models/User")

const user = async() => {

    const userCreate = {
        firstName: "Olger",
        lastName: "Ortiz",
        email: "olgerortiz24@gmail.com",
        password: "12345",
        phone: "+584242934812"
    }

    await User.create(userCreate)
}

module.exports = user