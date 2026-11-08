import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { requestLogger } from './middleware/request-logger.js';
import { noCache } from './middleware/no-cache.js';
import { authMiddleware } from './middleware/auth.middleware.js';
import { errorHandler } from './middleware/error-handler.js';
import { usersRouter } from './modules/users/users.routes.js';

const app = express();

// ───────────────────────────────────────────────────────────────
// The request walks this list from top to bottom. ORDER IS EVERYTHING.
// ───────────────────────────────────────────────────────────────

// 1. Core middleware (Fastify: register(cors), register(helmet), onSend hook)
app.use(requestLogger);
app.use(cors({ origin: process.env.CORS_ORIGINS?.split(',') ?? [] }));
app.use(helmet());
app.use(noCache);

// 2. Body parser. Fastify parses JSON automatically; in Express, req.body is
//    undefined until this runs.
app.use(express.json());

// 3. PUBLIC routes: mounted ABOVE auth, so requests to them never reach it.
//    This replaces `if (request.url.startsWith('/health')) return;` in auth.plugin.ts.
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// 4. The auth gate. Everything registered below this line requires req.user.
app.use(authMiddleware);

// 5. Routes (Fastify: app.register(usersRoutes, { prefix: '/v1' }))
app.use('/v1', usersRouter);

// Demo: an async handler that throws. Express 5 sends it to errorHandler for you.
app.get('/v1/boom', async () => {
  throw new Error('Something broke');
});

// 6. Error handler: LAST. (Fastify: app.setErrorHandler)
app.use(errorHandler);

// Fastify's onReady hook has no equivalent: run startup work before listen().

const port = Number(process.env.PORT) || 3333;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
