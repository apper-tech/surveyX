import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import PeopleIcon from '@material-ui/icons/People';
import DoneAllIcon from '@material-ui/icons/DoneAll'
import { Link } from '@material-ui/core';
import '../App.css';
const prefix = '/survey-proof-auth/#/';
export const mainListItems = (
  <div>
    <ListSubheader inset>Start Here</ListSubheader>
    <Link href={prefix + "new"} className="Link">
      <ListItem button>
        <ListItemIcon>
          <PlusOneIcon />
        </ListItemIcon>
        <ListItemText primary="New Survey" />
      </ListItem>
    </Link>
    <Link href={prefix + "mysurveys"} className="Link">
      <ListItem button>
        <ListItemIcon>
          <DoneAllIcon />
        </ListItemIcon>
        <ListItemText primary="Check my Survey" />
      </ListItem>
    </Link>
    <Link href={prefix + "participate"} className="Link">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Survey Participation" />
      </ListItem>
    </Link>

  </div>
);
