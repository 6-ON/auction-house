# Auction House

## Description

Auction-House is a free platform where users can freely buy and sell a diverse range of items through online auctions with no limitations.

## Features

-   **User Authentication**: Users can create an account and log in
-   **Item Management**: Users can create,list items for sale
-   **Real-time Auctions**: Users can participate in real-time auctions
-   **Bidding**: Users can place bids on items
-   **Reporting**: Users can report other users
-   **Search**: Users can search for items
-   **User Management**: Admins can manage users and reports

## Technologies

-   **Next.js**: React framework for server-side rendering
-   **MongoDB**: NoSQL database for storing data
-   **Socket.io**: Node.js library for real-time web applications
-   **Flask**: Python web framework for building APIs

## Installation

### Prerequisites

-   **[Node.js](https://nodejs.org/en/)**
-   **[MongoDB](https://www.mongodb.com/)**
-   **[Python](https://www.python.org/)**

### Steps

-   Ensure you have Node.js installed
-   Clone the repository
-   Run the next.js app
    -   Step into the `auction-app` directory
    -   Run `npm install` to install dependencies
    -   Run `npm run dev` to start the next.js app
-   Run the cdn server
    -   Move into the `cdn` directory
    -   Run `pip install -r requirements.txt` to install dependencies
    -   Run `python3 server.py` to start the cdn server

### Dockerization

-   Ensure you have **[Docker](https://www.docker.com/)** installed
-   run `docker compose up -d` to start the app

## Testing

run `npm test` to run tests

## Use Cases
![Use Case Diagram](./diagrams/usecase_diagram.svg)
