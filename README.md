# Event manager Platform - Node.js Exam project

## Project Idea: Online Event Management Platform
### Overview: 
Create an online event management platform that allows users to create, manage, and join events. The platform will have features like event creation, event search, user authentication, and authorization.
## Main Features:
### User Authentication & Authorization: 
Use Passport.js for authentication and authorization with the platform.
Allow users to sign up and log in using their email and password or with social media accounts (e.g., Google, Facebook).
Implement role-based access control for different user types (e.g., event organizers, attendees).
### Event Creation:
Allow event organizers to create and manage events.
Provide a form to input event details, such as name, date, time, location, description, and cover image.
Use Svelte to create a responsive and dynamic user interface.
### Event Search:
Create a search functionality that allows users to search for events based on keywords, location, date, and category.
Implement filters and sorting options to refine the search results.
Display search results in a visually appealing, responsive layout using Svelte.
### Event Registration & Attendance:
Allow users to join events as attendees.
Ticket sale
Implement a feature to track attendance and display the list of attendees on the event page.
Send email notifications to attendees about upcoming events and updates.
### Database: 
Use a database like MongoDB or PostgreSQL to store user and event data.
Create database schemas for users, events, and attendance.
Implement CRUD operations for managing data.
### API:
Develop a RESTful API using Node.js and Express.js to handle all backend operations.



## TODO:

Admin CRUD: Daniel
Admin Authorization/Roles: Fernanda

## Important
Style: darkmode, maybe switchable? <br> 
Mainpage/eventpage
<br> 
Navbar: Home/logo <br>  Search bar? <br> 
Login, sign up (Logged in : Account img?, name) <br> 
Account dropdown - settings(change password, put image, delete account), history (what events were booked)<br> 
Admin sidebar: Manage events, Manage accounts, event/user statistics<br>
Footer

## Features for later
Chat - related to events <br> 
Send mail, send sms<br> 
Payment API - payment history
