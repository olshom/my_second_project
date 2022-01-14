import * as userService from "../../services/userService.js";
import {bcrypt} from "../../deps.js";

const showLoginForm = ({ render }) => {
    render("login.eta");
  };

const processLogin = async({ request, response, state, render }) => {
    const body = request.body({ type: "form" });
    const params = await body.value;

    const userFromDatabase = await userService.findUserByEmail(params.get("email"),);
    if (userFromDatabase.length != 1) {
        render("login.eta", { message: "incorrect username or password" });
        return;
    }
    const user = userFromDatabase[0];
    const passwordMatches = await bcrypt.compare(params.get("password"), user.password,);

    console.log(user)
    
    if (!passwordMatches) {
        render("login.eta", { message: "incorrect username or password" });
        return;
    }
    await state.session.set("user", user);
    response.redirect("/questions")
}

export { showLoginForm, processLogin }