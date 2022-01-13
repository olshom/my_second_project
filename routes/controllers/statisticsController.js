import * as statisticsService from "../../services/statisticsService.js";

const showStats = async ({ render, user }) => {
    render("statistics.eta", {
        myTotalAnswers: await statisticsService.totalAnswers(user.id),
        myCorrectAnswers: await statisticsService.quantityCorrectAnswers(user.id),
        answersOnMyOwnQuestions: await statisticsService.answersOnOwnQuestions(user.id),
        topFiveUsers: await statisticsService.topFive(),
        user
    });
};
export { showStats}