#### Jamison Cozart

#### git share

##### Description
A social media platform for software developers and tech enthusiasts to talk about technology, share personal projects, and find open-source projects to contribute to.

##### Use Case
**Main Users**: Software Developers with GitHub profiles
**Problem**: GitHub does not provide an intuitive social media platform that promotes communication + collaboration.
**Goal**: Provide a simple, and intuitive platform for sharing GitHub projects, showcasing your work, finding Open-Source projects, help people with bugs, and express your technical opinions.

##### Minimum Viable Product
**Users Can**:
 * Signup/login/logout
 * CRUD for Posts and Comments
**General**:
 * Minimalist Modern Styling
 * Fully hosted for anyone to use

##### Tools for MVP
 * React
 * Redux
 * Firebase
 * HTML
 * CSS

##### Additional Features
 * Integrating GitHub API for easily posting new repos, grabbing code snippets, linking to your profile, pulling your profile data (number of repos, languages used, stars, forks, etc…)
 * Admin + User Authorizations
 * Emailing service for account verification and password resets
 * Support for Markdown in Posts and comments
 * Instant messaging between users
 * Notifications! (for direct messages, stars, comments, etc…)
 * Console application for sharing your git repository directly from the command line
Download the package globally (npm)
Use the command `git share origin`
Grabs the ‘origin’ URL and pulls the data from the GitHub repository, generating a post based on the repo data.
Optional: Include .gitshare file with markdown language for creating a post body
 * User uploaded photos (not image URLs)
 * INFINITE SCROLLING - Lazy loading/efficient loading
 * Bots for admining, auto-posting, etc...

##### Tools for Additional Features
 * GitHub API
 * https://github.com/markdown-it/markdown-it
 * Lazy-loading with Firebase pagination queries

##### Additional Information
It looks like most of what I’m trying to do is possible with only using React, Redux, and Firebase. If I wanted to expand to use bots or an npm package to automate posting, I would probably need a Node API to handle outside requests. First and foremost I want to focus on building a basic social media platform with a clean and simple UI/UX. Keeping everything as organized and clean as possible with help with scaling and refactoring for new technologies to be incorporated. I hope to continue work on this after class is complete to meet all the stretch goals and more that I think of along the way.
