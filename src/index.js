import express from "express";
import "dotenv/config";
import * as Sentry from "@sentry/node";

import log from "./middleware/log.js";
import { ProfilingIntegration } from "@sentry/profiling-node";

import loginRouter from "../src/routes/login.js";
import usersRouter from "../src/routes/users.js";
import hostsRouter from "../src/routes/hosts.js";

import propertiesRouter from "../src/routes/properties.js";
import amenitiesRouter from "../src/routes/amenities.js";
import bookingsRouter from "../src/routes/bookings.js";
import reviewsRouter from "../src/routes/reviews.js";
import errorHandler from "./utils/errorHandler.js";

const app = express();

// TODO: Add Sentry.io integration

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use(log);

// TODO: Add routes for authentication

app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/amenities", amenitiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/reviews", reviewsRouter);

app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
