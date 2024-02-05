import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
import './styles/drawer.scss'
const DrawerComponent = (props) => {
  const {
    open = false,
    toggleDrawer = () => { },
    position = 'right',
    body = '',
    className = '',
    id = '',
    enabledCloseIcon = false,
    enabledCloseIconText = 'Close'
  } = props;

  return (
    <Drawer anchor={position} open={open} onClose={toggleDrawer}>
      <div className={`drawer-component-container ${className}`} id={id}>
        <div className='drawer-close-container' onClick={toggleDrawer}>
          {enabledCloseIcon ? <CloseIcon className='drawer-close-icon' /> : <text className='drawer-close-text'>{enabledCloseIconText}</text>}
        </div>
        {body}
      </div>
    </Drawer>
  )
}

export default DrawerComponent