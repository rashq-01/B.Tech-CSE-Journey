


/*

# Project Structure

```
backend/
├── src
│   ├── config
│   │   ├── rabbitmq
│   │   │   ├── consumers
│   │   │   │   └── notificationConsumer.js
│   │   │   ├── notification
│   │   │   │   ├── consumer.js
│   │   │   │   ├── producer.js
│   │   │   │   └── topology.js
│   │   │   ├── producers
│   │   │   │   └── notificationProducer.js
│   │   │   └── config.js
│   │   ├── redis
│   │   │   ├── client.js
│   │   │   ├── fallback.js
│   │   │   ├── pubsubHandler.js
│   │   │   └── socketManager.js
│   │   ├── db.js
│   │   ├── jwt.js
│   │   └── mail.js
│   ├── controllers
│   │   ├── authController.js
│   │   └── chatController.js
│   ├── middlewares
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── rateLimiter.js
│   ├── models
│   │   ├── chat.js
│   │   ├── message.js
│   │   └── user.js
│   ├── routes
│   │   ├── authRoute.js
│   │   ├── chatRoute.js
│   │   └── testRoutes.js
│   ├── sockets
│   │   ├── authSocket.js
│   │   ├── index.js
│   │   ├── messageSocket.js
│   │   ├── presenceSocket.js
│   │   ├── readSocket.js
│   │   ├── typingSocket.js
│   │   └── user-socketMap.js
│   ├── utils
│   │   ├── AppError.js
│   │   ├── asyncHandler.js
│   │   ├── email.js
│   │   ├── generateToken.js
│   │   ├── htmlEmails.js
│   │   └── verifyToken.js
│   ├── app.js
│   └── server.js
├── package-lock.json
├── package.json
├── README.md
├── seedData.js
└── seedUsers.js
```




*/