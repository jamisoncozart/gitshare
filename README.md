# _Git Share_

#### _8 May 2020 | Jamison Cozart_

## Description

_A social platform for software developers to connect and collaborate. Built using React with Redux for the Frontend and Firebase as the Backend._

_View the live site at:_ https://jamisoncozart.github.io/gitshare
<div >
<img src='https://i.imgur.com/axCigm9.png' alt='landing page screenshot' width='45%' />
<img src='https://i.imgur.com/n2z3T6a.png' alt='post feed' width='45%' />
<p>Landing page features link to github and particle system background. Feed page shows posts by all users</p>

<img src='https://i.imgur.com/fq79PaR.png' alt='sign in' width='45%' />
<img src='https://i.imgur.com/kvMRvMw.png' alt='profile page' width='45%' />
<p>Users need to sign up and sign in to use the site. Users can connect their github profiles to their gitshare profiles to display data about the languages they've recently used as well as their github activity.</p>

<img src='https://i.imgur.com/auNT7gG.png' alt='details page' width='45%' />
<img src='https://i.imgur.com/DwosnMY.png' alt='sidebar menu' width='45%' />
<p>Users can click on posts to see post description, comment thread, delete buttons if the user is the author of the post, or a save button if the user is not the author, and an upvote button. Users can open the sidebar which allows users to filter their post feed by most upvoted, newest, or posts by users they are following. Also allows for toggling dark mode.</p>

<img src='https://i.imgur.com/KLQqhnd.png' alt='Follow list' width='45%' />
<img src='https://i.imgur.com/RNyW5h4.png' alt='dark mode' width='45%' />
<p>Users need to sign up and sign in to use the site. Users can connect their github profiles to their gitshare profiles to display data about the languages they've recently used as well as their github activity.</p>

## Setup/Installation Requirements

#### Node install

##### For macOS:
_If Homebrew is not installed on your computer already, then install Homebrew by entering the following two commands in Terminal:_
```
curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install
echo 'export PATH=/usr/local/bin:$PATH' >> ~/.bash_profile
```

_Install Git with the following command:_
```
brew install git
```

_Next, install Node.js by entering the following command in Terminal:_
```
brew install node
```

##### For Windows:
_Please visit the [Node.js website](https://nodejs.org/en/download/) for installation instructions._

#### Install this application

_Clone this repository via Terminal using the following commands:_
```
cd desktop
git clone https://github.com/jamisoncozart/git-share
cd git-share
```

_Set up a firebase account, and register an app by following this documentation_
https://firebase.google.com/docs/web/setup

_Create a .env file in the root directory and add the firebase configurations:_
```
touch .env
```
_Add this to the .env file and include your own firebase keys between the quotations:_
```
REACT_APP_FIREBASE_API_KEY = ""
REACT_APP_FIREBASE_AUTH_DOMAIN = ""
REACT_APP_FIREBASE_DATABASE_URL = ""
REACT_APP_FIREBASE_PROJECT_ID = ""
REACT_APP_FIREBASE_STORAGE_BUCKET = ""
REACT_APP_FIREBASE_MESSAGING_SENDER_ID = ""
REACT_APP_FIREBASE_APP_ID = ""
```

_Next, install npm at the project's root directory, and start the server:_
```
npm install
npm start
```

_If everything is correct, the localhost site should open automatically_

_View the contents of this project by opening in VSCode:_
```
code .
```

## Development Process

<img src='https://i.imgur.com/dAkbIb1.png' width='49%'>
<img src='https://i.imgur.com/Pm5ZplU.png' width='41%'>

<img src='https://i.imgur.com/gGmEQQH.png' width='46%'>
<img src='https://i.imgur.com/b311OFn.png' width='44%'>

<img src='https://i.imgur.com/lT2iukx.png' width='44%'>
<img src='https://i.imgur.com/2xzXwBu.png' width='46%'>

_Application wireframing features pages for Sign Up/Sign In, posts, saved posts, creating new posts, viewing accounts you've followed, and your profile._

![Application Component Tree](https://i.imgur.com/9DSqJWy.png)

_Application Component tree depicting the Component heirarchy for state management and planning._

## Technologies Used

* _React_
* _Redux_
* _React Router_
* _Firebase_
* _Node.js_
* _WebPack_
* _CSS_
* _Git_

&copy; 2020 **_Jamison Cozart_**

