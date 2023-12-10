const authRouter = require('./authRoute');

const adminRouter = require('./adminRoute');
const participantRouter = require('./participantRoute');
const registrationRouter = require('./registrationRoute');
const mentorRouter = require('./mentorRoute');
const taskRouter = require('./taskRoute');
const taskSubmissionRouter = require('./taskSubmissionRoute');

const cityRouter = require('./cityRoute');
const provinceRouter = require('./provinceRoute');  

const instanceRouter = require('./instanceRoute');

const dashboardSummaryRouter = require('./summaryRoute');
const informationBannerRouter = require('./informationBannerRoute');

module.exports = {
    authRouter,
    adminRouter,
    participantRouter,
    registrationRouter,
    mentorRouter,
    taskRouter,
    taskSubmissionRouter,
    instanceRouter,
    cityRouter,
    provinceRouter,
    dashboardSummaryRouter,
    informationBannerRouter
};