import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from './listItems';
import { DashboardStyles } from './Styles'
import { Link } from 'react-router-dom';
import logo from '../logo.png';

const headerStyle = {
  backgroundImage: `url(${logo})`,
  backgroundColor: '#3f51b5'
};
const drawerStyle = {
  color: '#fff',
}

class Dashboard extends React.Component {
  state = {
    open: false,
  };
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
      
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >

          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>

            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" className="LogoLink">
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Survey Rewards
            </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}

        >
          <div className={classes.toolbarIcon} style={headerStyle}>
            <IconButton onClick={this.handleDrawerClose} style={drawerStyle}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
        </Drawer>
        
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(DashboardStyles)(Dashboard);
