const authRouter = require('./authRoute');

const adminRouter = require('./adminRoute');
const participantRouter = require('./participantRoute');
const registrationRouter = require('./registrationRoute');
const mentorRouter = require('./mentorRoute');

const cityRouter = require('./cityRoute');
const provinceRouter = require('./provinceRoute');  

const instanceRouter = require('./instanceRoute');

const dashboardSummaryRouter = require('./summaryRoute');

module.exports = {
    authRouter,
    adminRouter,
    participantRouter,
    registrationRouter,
    mentorRouter,
    instanceRouter,
    cityRouter,
    provinceRouter,
    dashboardSummaryRouter
};