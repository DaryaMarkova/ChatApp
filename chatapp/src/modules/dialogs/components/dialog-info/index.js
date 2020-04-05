import React from 'react';

const DialogInfo = ({activeDialog, user}) => {
  if (!user || !activeDialog) {
    return null;
  } else {
    const companion = activeDialog.author._id === user._id ? activeDialog.partner : activeDialog.author;

    return  (
      <>
        <span className='header__title'>{companion.firstname} {companion.lastname}</span>
        <span className='header__status'>online</span>
      </>
    )
  }
}

export default DialogInfo;