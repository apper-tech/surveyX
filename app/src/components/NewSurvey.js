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
import InputAdornment from '@material-ui/core/InputAdornment';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import helpers from '../_helpers/helpers'
import handler from '../_contractHandlers/SurveryHandler';
import SurveryHandler from '../_contractHandlers/SurveryHandler';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import CardActions from '@material-ui/core/CardActions';
import GenerateRandomCode from 'react-random-code-generator';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ReactComponent as Logo } from '../ETH-512.svg';

import ListItemText from '@material-ui/core/ListItemText';
const styles = theme => ({
  listItemError: {
    display: 'inline',
    color: 'red'
  },
  logo: {
    width: '45px',
    height: '50px'
  }
});
class NewSurvey extends React.Component {

  state = {
    loading: true, drizzleState: null,
    survey: null,
    title: '',
    address: '',
    description: '',
    option1: '',
    option2: '',
    option3: '',
    prizeEth: 0,
    surveyDate: '',
    surveyCode: '',
    hasSurvey: false,
    surveyAdded: false,
    progressVisible: false,
    receipt: '',
    timeToRedirect: 115000,
    unsubscribe: '',
    formErrors: []
  };

  componentDidMount() {
    const { drizzle } = this.props;

    helpers.initDrizzle(drizzle).then((state) => {
      SurveryHandler.CheckSurveyExsist(this.props.drizzle,
        state.drizzleState.accounts[0])
        .then((hasSurvey) => {
          if (hasSurvey)
            this.setState({ loading: false, hasSurvey: false });
          else {
            state.address = state.drizzleState.accounts[0];
            state.surveyCode = GenerateRandomCode.TextNumCode(5, 3);
            this.setState(state);
          }
        }).then(() => {
          this.forceUpdate();
        })
    });
  }
  componentWillUnmount() {
  }
  checkForm() {
    const errors = [];
    if (!(this.state.title && this.state.title.length > 0)) {
      errors.push("Title Can't be Empty");
    }
    if (!(this.state.description && this.state.description.length > 0)) {
      errors.push("Description Can't be Empty");
    }
    if (!(this.state.option1 && this.state.option1.length > 0)) {
      errors.push("First Option Can't be Empty");
    }
    if (!(this.state.option2 && this.state.option2.length > 0)) {
      errors.push("Second Option Can't be Empty");
    }
    if (!(this.state.option3 && this.state.option3.length > 0)) {
      errors.push("Third Option Can't be Empty");
    }
    if (!(this.state.prizeEth && this.state.prizeEth > 0)) {
      errors.push("Prize Value Can't be Empty");
    }
    if (errors.length > 0) {
      this.setState({ formErrors: errors });
      return false;
    }
    else {
      return true;
    }
  }
  handleClick = event => {
    if (this.checkForm()) {
      this.setState({ progressVisible: false, formErrors: [] });
      handler.AddSurvey(this.props.drizzle, this.state).then((data) => {
        const { receipt, survey } = data;
        this.setState({
          surveyAdded: receipt.status,
          receipt:
          {
            gasUsed: receipt.gasUsed,
            TransHash: receipt.transactionHash
          },
          progressVisible: false,
          survey: survey
        });
        console.log('cool');

        // this.sendFile(this.state.survey, "signature");
      });
    }

  };
  sendFile(exportObj, exportName) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
  handleClickDown = event => {
    this.sendFile(this.state.survey, "Signature");
  }
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
                <Fab variant="extended" aria-label="Delete" className={classes.fab}
                  onClick={this.handleClickDown}
                >
                  <ArrowDownward className={classes.extendedIcon} />
                  Download
              </Fab>
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
                  Please Download your signature for safe keeping
                </Typography>
              </CardActions>
            </CardContent>
          </Card >
        )
      }
    };
    return (
      <Countdown date={Date.now() + this.state.timeToRedirect} renderer={renderer} />
    );
  }
  render() {
    const { classes } = this.props;
    if (this.state.loading) return (
      <div>
        <Typography component="h1" variant="h5">
          Please Wait ....
        <Typography color="textSecondary"> {'\t'} Connecting to network</Typography>
        </Typography>
        <br></br>
        <LinearProgress color="secondary"></LinearProgress>
      </div>);
    else if (this.state.hasSurvey)
      return (<Typography component="h1" variant="h5">
        Survey Already Added !
    <Typography color="textSecondary"> {'\t'}Please finish the current one before adding a new one</Typography>
      </Typography>);
    else if (this.state.surveyAdded)
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
              required
              onChange={(e) => { this.setState({ title: e.target.value }) }}
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
              onChange={(e) => { this.setState({ description: e.target.value }) }}
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
              onChange={(e) => { this.setState({ option1: e.target.value }) }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="survey-opt2"
              label="Second Answer Option"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={(e) => { this.setState({ option2: e.target.value }) }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="survey-opt3"
              label="Third Answer Option"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={(e) => { this.setState({ option3: e.target.value }) }}
            />
          </Grid>
          <Grid item>
            <Logo className={classes.logo} />
          </Grid>
          <Grid item>
            <TextField
              className={classes.textField}
              fullWidth
              helperText="Enter the Winning Bet for the survey!"
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">ETH</InputAdornment>,
              }}
              onChange={(e) => { this.setState({ prizeEth: e.target.value }) }}
              id="input-with-icon-grid" label="Prize in ETH" />
          </Grid>
          <Grid item>
            <LinearProgress color="secondary" hidden={!this.state.progressVisible} />
            <div hidden={Number(this.state.formErrors.length) === 0}>
              <List dense={true} >
                {
                  this.state.formErrors.map((txt, i) => {
                    return (
                      <ListItem key={i}>
                        <ListItemText className={classes.listItemError}
                          primary={txt}
                          disableTypography={true}
                        />
                      </ListItem>)
                  })
                }

              </List>
            </div>
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