# Lolo-v5-Front

This is the front-end application for the Lolo-v5 project. It is built using React and communicates with the Lolo-v5 backend server to fetch and display articles from various RSS feeds.

## Features

- Fetches and displays articles from custom RSS feeds.
- Users can add and remove custom RSS feeds.
- Articles are displayed in a grid layout.
- Clicking on an article image or title shows the content in a modal.
- Uses the Mercury API to display content in a clean and readable format.

## Requirements

- Node.js (>=14.x)
- npm or yarn

## Installation

To install the dependencies, clone the repository and run `npm install` or `yarn install` in the project directory:

```bash
git clone https://github.com/TaaviToomsalu/Lolo-v5-front.git
cd Lolo-v5-front
npm install
# or
yarn install
```


Development
To start the development server, run:

```bash
npm start
# or
yarn start
```


The application will be available at http://localhost:3000.

Build
To build the project for production, run:

```bash
npm run build
# or
yarn build
```

This will create a build directory with the compiled files.

Deployment
To deploy the application to a platform like Render, make sure you have the following build and start commands configured:

Build Command: npm install && npm run build
Start Command: npx serve -s build
Proxy Configuration
If you need to configure a proxy to communicate with the backend server, update the package.json file with the backend server URL:

```markdown
{
  "proxy": "http://taavitoomsalu.com:5001"
}
```