import React from 'react';

const SideBar = props => {
  const iconPath = process.env.PUBLIC_URL + '/assets/';

  const handleTogglingTheme = () => {
    if(props.darkMode) {
      document.body.style.backgroundColor = '#eee'
    } else {
      document.body.style.backgroundColor = '#000'
    }
    const action = {
      type: 'TOGGLE_THEME'
    }
    props.dispatch(action);
  }

  return (
    <div className={props.darkMode ? props.navOpen ? 'darkSideNav openNav' : 'darkSideNav' : props.navOpen ? 'sideNav openNav' : 'sideNav'}>
      <button 
        onClick={() => props.setNavOpen(false)} 
        className={props.darkMode ? 'darkClosebtn' : "closebtn"}>
          <img src={props.darkMode ? 'https://viceversaartbooks.com/static/new_frontend/local/icons/Chevron-right-white.b1357a39300c.svg' : 'https://cdn.iconscout.com/icon/free/png-256/chevron-27-433515.png'}/>
      </button>
      <button 
        onClick={() => props.handleTogglingSideButton('top')}
        className={props.topActiveTheme ? props.darkMode ? 'darkActiveSideButton' : 'activeSideNavButton' : props.darkMode ? 'darkSideNavButton' : 'sideNavButton'}>
          <img src='https://icons.iconarchive.com/icons/google/noto-emoji-travel-places/256/42697-fire-icon.png'/>
          Top
      </button>
      <button 
        onClick={() => props.handleTogglingSideButton('new')}
        className={props.newActiveTheme ? props.darkMode ? 'darkActiveSideButton' : 'activeSideNavButton' : props.darkMode ? 'darkSideNavButton' : 'sideNavButton'}>
          <img src='https://icons.iconarchive.com/icons/google/noto-emoji-activities/256/52705-sparkles-icon.png'/>
          New
      </button>
      <button 
        onClick={() => props.handleTogglingSideButton('follow')}
        className={props.followActiveTheme ? props.darkMode ? 'darkActiveSideButton' : 'activeSideNavButton' : props.darkMode ? 'darkSideNavButton' : 'sideNavButton'}>
          <img src={props.darkMode ? `${iconPath}Following_white.png` : `${iconPath}Following_black.png`}/>
          Follows
      </button>
      <button 
        onClick={handleTogglingTheme}
        className={props.darkMode ? 'darkActiveSideButton' : 'sideNavButton'}>
          <img src={props.darkMode ? 'https://i2.wp.com/hostasonthebluff.com/wp-content/uploads/2017/10/Sun-Icon.png?fit=256%2C256&ssl=1' : 'https://cdn.iconscout.com/icon/free/png-256/half-moon-1767806-1502386.png'}/>
          Theme
      </button>
      <button 
        className={props.darkMode ? 'darkSideNavButton' : 'sideNavButton'} 
        onClick={props.doSignOut}>
          <img src={props.darkMode ? 'https://www.saraghinaeyewear.it/skin/frontend/evolve/evolve/images/logout.png' : 'https://image.flaticon.com/icons/png/128/545/545702.png'}/>
          Logout
      </button>
    </div>
  )
}

export default SideBar;