# My Express App

This is a simple Express application that demonstrates CRUD operations for managing websites and comments, along with statistics on CPU and RAM usage. The application also registers itself with a Consul service registry for service discovery.

## Features

- CRUD operations for websites
- CRUD operations for comments associated with websites
- Statistics endpoint to retrieve CPU and RAM usage
- Integration with Consul for service registration

## Project Structure

```
my-express-app
├── src
│   ├── app.ts                     # Entry point of the application
│   ├── controllers
│   │   ├── commentController.ts    # Controller for comment operations
│   │   ├── statsController.ts      # Controller for statistics operations
│   │   └── websiteController.ts     # Controller for website operations
│   ├── models
│   │   ├── Comment.ts              # Model for comment data
│   │   ├── Website.ts              # Model for website data
│   │   └── index.ts                # Exports models for easy access
│   ├── routes
│   │   ├── commentRoutes.ts        # Routes for comment-related operations
│   │   ├── statsRoutes.ts          # Routes for statistics-related operations
│   │   └── websiteRoutes.ts        # Routes for website-related operations
│   ├── services
│   │   └── consulService.ts        # Service for Consul registration
│   └── utils
│       └── statsUtil.ts            # Utility functions for statistics
├── package.json                    # npm configuration file
├── tsconfig.json                   # TypeScript configuration file
└── README.md                       # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-express-app
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the application:
   ```
   npm start
   ```

## Usage

- **Websites**
  - Create a new website: `POST /websites`
  - Get all websites: `GET /websites`
  - Update a website: `PUT /websites/:id`
  - Delete a website: `DELETE /websites/:id`

- **Comments**
  - Create a new comment: `POST /comments`
  - Get all comments: `GET /comments`
  - Update a comment: `PUT /comments/:id`
  - Delete a comment: `DELETE /comments/:id`

- **Statistics**
  - Get CPU and RAM usage statistics: `GET /stats`

## Consul Integration

The application automatically registers itself with a Consul service registry upon startup, allowing for easy service discovery in a microservices architecture.

## License

This project is licensed under the MIT License.