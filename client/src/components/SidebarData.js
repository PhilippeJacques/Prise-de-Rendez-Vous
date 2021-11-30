import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import  {FaPager }from 'react-icons/fa';



export const SidebarData  = [

  {
    title: 'Associations',
    path: '/associations',
    icon: <FaPager />,
    cName: 'nav-text'
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  }

];
