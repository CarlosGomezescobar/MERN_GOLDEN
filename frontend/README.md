# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Ejecutar Certbot para certificados SSL
``docker run -d \
  -v nginx:/etc/nginx \
  -v certbot:/etc/letsencrypt \
  -p 443:443 \
  certbot/certbot renew
``