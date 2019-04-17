import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { HomeStyles } from './Styles';

function RenderHome(props) {
  const { classes } = props;
  const prefix = '/surveyX/#/';
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Welcome to SurveyX!
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              Crowd opinion mining and rewarding DApp.
              For each survey, a randomly selected participant will be rewarded!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={16} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" href={prefix + "new"}>
                    Create my survey
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" href={prefix + "mysurveys"}>
                    Check my Survey State
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </main>
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          The code is available at Github: <a href="https://github.com/apper-tech/surveyX">SurveyX</a>
        </Typography>
      </footer>
    </React.Fragment>
  );
}

RenderHome.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(HomeStyles)(RenderHome);
