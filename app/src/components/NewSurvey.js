import React from 'react';
import { Redirect } from 'react-router'
import Countdown from 'react-countdown-now';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Code from '@material-ui/icons/Code';
import Filter1 from '@material-ui/icons/Filter1';
import Filter2 from '@material-ui/icons/Filter2';
import Filter3 from '@material-ui/icons/Filter3';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import helpers from '../_helpers/helpers'
import handler from '../_contractHandlers/SurveryHandler';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Done from '@material-ui/icons/Done';
import CardActions from '@material-ui/core/CardActions';
import GenerateRandomCode from 'react-random-code-generator';

const styles = theme => ({});

class NewSurvey extends React.Component {

  state = {
    loading: true, drizzleState: null,
    title: '',
    address: '',
    description: '',
    option1: '',
    option2: '',
    option3: '',
    surveyDate: '',
    surveyCode: '',
    surveyAdded: false,
    receipt: '',
    timeToRedirect: 5000,
    unsubscribe: ''
  };

  componentDidMount() {
    const { drizzle } = this.props;
    helpers.initDrizzle(drizzle).then((state) => {
      state.address = state.drizzleState.accounts[0];
      state.surveyCode = GenerateRandomCode.TextNumCode(5, 3);
      this.setState(state);
    }).then(() => {
      this.forceUpdate();
    });
  }
  componentWillUnmount() {
  }
  handleChange = event => {
    const control = event.target;
    switch (control.id) {
      case 'survey-title':
        this.setState({ title: control.value });
        break;
      case 'survey-desc':
        this.setState({ description: control.value });
        break;
      case 'survey-opt1':
        this.setState({ option1: control.value });
        break;
      case 'survey-opt2':
        this.setState({ option2: control.value });
        break;
      case 'survey-opt3':
        this.setState({ option3: control.value });
        break;
      default:
        break;
    }

  };
  handleClick = event => {
    handler.AddSurvey(this.props.drizzle, this.state).then((receipt) => {
      this.setState({
        surveyAdded: receipt.status,
        receipt:
        {
          gasUsed: receipt.gasUsed,
          TransHash: receipt.transactionHash
        }
      });
    });

  };
  navigateHome(classes) {
    const renderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        return <Redirect to="/" />
      } else {
        return (
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <div style={{ width: '50px' }}>
                  <CircularProgressbar
                    percentage={seconds * 20}
                    text={`${seconds}s`}
                    styles={{
                      path: { stroke: `rgb(63, 81, 181, ${seconds * 20 / 100})` },
                      text: { fill: '#f88', fontSize: '30px' },
                    }}
                  />
                </div>
              }
              action={
                <IconButton>
                  <Done />
                </IconButton>
              }
              title="Survey Created!"
              subheader={new Date(Date.now()).toLocaleString()}
            />
            <CardContent>
              <Typography component="p">
                <b>Gas Used: </b> {this.state.receipt.gasUsed}
              </Typography>
              <Typography component="p">
                <b>Transaction Hash: </b> {this.state.receipt.TransHash}
              </Typography>
              <CardActions className={classes.actions} disableActionSpacing>
                <Typography component="i" color="textSecondary" >
                  Redirecting to Home Page click to procced
                </Typography>
              </CardActions>
            </CardContent>
          </Card>
        )
      }
    };
    return (
      <Countdown date={Date.now() + this.state.timeToRedirect} renderer={renderer} />
    );
  }
  render() {
    const { classes } = this.props;
    if (this.state.loading) return "Loading...";
    if (this.state.surveyAdded)
      return (this.navigateHome(classes));
    return (
      <div className={classes.margin}>
        <Grid container
          direction='column'
          alignItems='stretch'
          spacing={8}>
          <Grid item>
            <Code />
            <TextField
              id="user-address"
              label="Address"
              className={classes.textField}
              fullWidth
              value={this.state.address}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item>
            <Filter1 />
            <TextField
              id="survey-title"
              label="Survey Title"
              className={classes.textField}
              helperText="Enter a Title for the survey!"
              margin="normal"
              fullWidth
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item>
            <Filter2 />
            <TextField
              id="survey-desc"
              label="Survey Description"
              className={classes.textField}
              fullWidth
              multiline
              helperText="Enter a Description for the survey!"
              margin="normal"
              onChange={this.handleChange}
            />
          </Grid>
          <Filter3 />
          <Grid item>
            <TextField
              id="survey-opt1"
              label="First Answer Option"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="survey-opt2"
              label="Second Answer Option"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="survey-opt3"
              label="Third Answer Option"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item>
            <Fab variant="extended" onClick={this.handleClick}
              style={{ marginTop: 30, padding: 10 }}
              aria-label="Delete" className={classes.fab}>
              <NavigationIcon className={classes.extendedIcon} />
              Add Survey
             </Fab>
          </Grid>
        </Grid>
      </div>
    );
  }
}

NewSurvey.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(NewSurvey);;