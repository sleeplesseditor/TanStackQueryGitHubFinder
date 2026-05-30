# TanStack Query GitHub Finder

#### Table of Contents
- [Description](#description)
- [Example Screenshots](#example-screenshots)
- [Running the App Locally](#running-the-app-locally)
- [Changes from Original Project](#changes-from-original-project)
- [Potential Areas for Expansion/Improvement](#potential-areas-for-expansionimprovement)
- [Additional Notes](#additional-notes)

## Description
A refresher app, as part of some coursework for the course [created by Brad Traversy](https://www.udemy.com/course/modern-react-from-the-beginning). The app focuses on the use of TanStack Query with the GitHub API.

## Example Screenshots
<img width="1082" height="670" alt="Screenshot 2026-05-29 at 18 10 21" src="https://github.com/user-attachments/assets/1dbd7b58-de2a-4825-ab15-0a0dbc403124" />
Example of search results displayed

<img width="1083" height="672" alt="Screenshot 2026-05-29 at 18 10 31" src="https://github.com/user-attachments/assets/0e85ce8e-208d-47b9-b789-ffa0b857ada3" />
Example of suggested user list from search input field

<img width="1087" height="671" alt="Screenshot 2026-05-29 at 18 10 14" src="https://github.com/user-attachments/assets/2f6e404b-37aa-4942-a96b-8024a872459c" />
Example of failed search

<img width="1069" height="645" alt="Screenshot 2026-05-29 at 18 14 02" src="https://github.com/user-attachments/assets/465cb082-b700-474d-bd57-e9f189c61a27" />
Example of expanded user info in custom dialog component

## Running the App Locally
To use this app, you will need to create a local .env file with the GitHub API_URL value, and a GitHub API_TOKEN value (created using Personal Access Tokens from your Github profile). Once that has been established, follow these steps:
1. CD into the project folder
2. Run `npm install`
3. Run `npm run dev`

## Changes from Original Project
- Search provides a list of users matching search term, with results displayed in card format
    - Additional info can be displayed for each user by opening a dialog, by clicking the icon in the upper-right corner of each card
    - User information uses the same TanStack Query pattern to pull individual user info from the API
- Added 'click away to close' functionality to suggestions list in search input field
- Unit tests created for components, using Vitetest and React Testing Library

## Potential Areas for Expansion/Improvement
- Implementation of backend API to contain API credentials
    - Additional opportunity to setup authentication and allow individual users to log in and manage subscriptions
- Revision of results display to use pagination
- Expand unit test coverage and implement Playwright tests for E2E testing

## Additional Notes
This app uses version 5.100.6 of @tanstack/react-query, which has been [confirmed to be safe](https://tanstack.com/blog/incident-followup) in the wake of the 11 May 2026 supply chain attack.
