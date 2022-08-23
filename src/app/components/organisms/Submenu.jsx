import React from 'react';

function SubmenuItem() {
  return (
    <li>
      <button>
        {props.text}
        <i className={props.icon}></i>
      </button>
    </li>
  )
}

function Submenu() {

  return (
    <ul className='submenu'>
      <SubmenuItem text="Disconnect" icon="fa-solid fa-link-slash" />
    </ul>
  );
}
export default Submenu;
