import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import PeopleIcon from '@material-ui/icons/People';
import DoneAllIcon from '@material-ui/icons/DoneAll'
import Button from '@material-ui/core/Button';
import '../App.css';
const prefix = '/surveyX/#/';
export const mainListItems = (
  <div>
    <ListSubheader inset>Start Here</ListSubheader>
    <div>
      <Button variant="text" color="primary" href={prefix + "new"}>
        <ListItem button>
          <ListItemIcon>
            <PlusOneIcon />
          </ListItemIcon>
          <ListItemText primary="New Survey" />
        </ListItem>
      </Button>
    </div>
    <div>
      <Button variant="text" color="primary" href={prefix + "mysurveys"}>
        <ListItem button>
          <ListItemIcon>
            <DoneAllIcon />
          </ListItemIcon>
          <ListItemText primary="Check my Survey" />
        </ListItem>
      </Button>
    </div>
    <div>
      <Button variant="text" color="primary" href={prefix + "participate"}>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Participation" />
        </ListItem>
      </Button>
    </div>
  </div>
);
