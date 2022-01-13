import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const regValidationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)]
};

const getCredentials = async(request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;

    return {
        email: params.get("email"),
        password: params.get("password")
    }
}

const registerUser = async ({ request, response, render }) => {
    const userData = await getCredentials(request);

    const [passes, errors] = await validasaur.validate(userData, regValidationRules);

    if (!passes) {
        console.log(errors)
        userData.validationErrors = errors;
        render("registration.eta", userData)
    } else {
        await userService.addUser(
            userData.email,
            await bcrypt.hash(userData.password),
        )
        response.redirect("/auth/login");
    }


}

const showRegistration = ({ render }) => {
    render("registration.eta");
}

export { registerUser, showRegistration }