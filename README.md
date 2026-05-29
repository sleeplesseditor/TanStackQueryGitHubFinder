# TanStack Query GitHub Finder

#### Table of Contents
- [Description](#description)
- [Running the App Locally](#running-the-app-locally)
- [Changes from Original Project](#changes-from-original-project)
- [Potential Areas for Expansion/Improvement](#potential-areas-for-expansionimprovement)
- [Additional Notes](#additional-notes)

## Description
A refresher app, as part of some coursework for the course [created by Brad Traversy](https://www.udemy.com/course/modern-react-from-the-beginning). The app focuses on the use of TanStack Query with the GitHub API.

## Running the App Locally
To use this app, you will need to create a local .env file with the GitHub API_URL value, and a GitHub API_TOKEN value (created using Personal Access Tokens from your Github profile). Once that has been established, follow these steps:
1. CD into the project folder
2. Run `npm install`
3. Run `npm run dev`

## Changes from Original Project
- Search provides a list of users matching search term, with results displayed in card format
    - Additional info can be displayed for each user by opening a dialog, by clicking the icon in the upper-right corner of each card
    - User information uses the same TanStack Query pattern to pull individual user info from the API
- Unit tests created for components, using Vitetest and React Testing Library

## Potential Areas for Expansion/Improvement
- Implementation of backend API to contain API credentials
    - Additional opportunity to setup authentication and allow individual users to log in and manage subscriptions

## Additional Notes
This app uses version 5.100.6 of @tanstack/react-query, which has been [confirmed to be safe](https://tanstack.com/blog/incident-followup) in the wake of the 11 May 2026 supply chain attack.