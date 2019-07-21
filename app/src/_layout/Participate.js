import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/SupervisorAccount';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Filter1 from '@material-ui/icons/Filter1Outlined';
import Filter2 from '@material-ui/icons/Filter2Outlined';
import Filter3 from '@material-ui/icons/Filter3Outlined';
import Bookmark from '@material-ui/icons/BookmarkBorder';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Done';
import helpers from '../_helpers/helpers'
import SurveryHandler from '../_contractHandlers/SurveryHandler';
import { Redirect } from 'react-router'
import Countdown from 'react-countdown-now';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import LinearProgress from '@material-ui/core/LinearProgress';
import { ParticipateLayoutStyles } from '../_layout/Styles';

class ParticipateLayout extends React.Component {
  state = {
    selected: 0,
    title: '',
    description: '',
    option1: '',
    option2: '',
    option3: '',
    surveyDate: '',
    survey: null,
    loading: true, drizzleState: null,
    hasSurvey: false,
    voted: false,
    voting: false,
    requestCall: true,
    timeToRedirect: 1150000,
    code: '',
    surveyId: '',
    participation: null
  }
  componentDidMount() {
    const { drizzle, code } = this.props;
    if (code) {
      helpers.initDrizzle(drizzle).then((state) => {
        this.setState(state);
        this.setState({ requestCall: false })
        const { drizzleState, selected } = this.state;
        SurveryHandler.GetSurveyByCode(drizzle, code).then((res) => {
          if (Object.entries(res).length > 0) {
            SurveryHandler.GetParticipantByAddress(drizzleState.accounts[0], res).then((part) => {
              if (Object.entries(part).length > 0) {
                this.setState({ hasSurvey: true, voted: true, voting: false, participation: part });
                this.forceUpdate();
              }
              else {
                this.setState({
                  hasSurvey: true,
                  title: res.title,
                  description: res.description,
                  option1: res.option1,
                  option2: res.option2,
                  option3: res.option3,
                  surveyId: res["_id"]
                });
                this.forceUpdate();
              }
            });
          }
          else {
            this.setState({ hasSurvey: false });
            this.forceUpdate();
          }

        })
      });
    }
  }

  headerRender(classes) {
    return (
      <Card className={classes.footer} >
        <CardHeader
          avatar={<Bookmark />}
          title="Participating in survey With Code: "></CardHeader>
        <CardActions disableActionSpacing>
          <Typography component="h1" className={classes.actions} color="textSecondary" >
            {this.props.code}
          </Typography>
        </CardActions>
      </Card>);
  }
  handleClick(e) {
    this.setState({ selected: e })
  }
  handleVote() {
    const { drizzle } = this.props;
    const { drizzleState, selected } = this.state;
    this.setState({ voting: true })
    SurveryHandler.CastVote(drizzle, drizzleState.accounts[0], this.state.surveyId, selected).then((res) => {
      if (res) {
        this.setState({ voted: true, voting: false, participation: res });
        this.forceUpdate();
      }
    })
  }
  navigateHome(classes) {
    const renderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        return <Redirect to="/" />
      } else {
        return (
          <Card className={classes.cardError}>
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
              title="Done! thanks for participating , wait for winner results soon"></CardHeader>
            <CardActions className={classes.actions} disableActionSpacing>
              <Divider ></Divider>
              <br></br>
              <Typography component="i" color="textSecondary" >
                Please Download your signature for safe keeping
                </Typography>
            </CardActions>
          </Card>
        )
      }
    };
    return (
      <Countdown date={Date.now() + this.state.timeToRedirect} renderer={renderer} />
    );
  }
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
    delete (this.state.participation['surveyId'])
    delete (this.state.participation['_id'])
    this.sendFile(this.state.participation, "Signature");
  }
  renderCodeRequest(classes) {
    return (<main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.footer}>
          <Bookmark />
        </Avatar>
        <Typography component="h1" variant="h5">
          Enter Survey Code
        </Typography>
        <TextField
          id="survey-title"
          label="Survey Code"
          className={classes.textField}
          helperText="Enter a Code for the survey!"
          margin="normal"
          fullWidth
          onChange={this.handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => this.handleSendCode()}
        >
          Participate
          </Button>
      </Paper>
    </main>)
  }
  handleSendCode() {
    //http://localhost:3000/surveyX/#/participate/yjdnl782
    window.location.href = window.location.href + '/' + this.state.code;
    window.location.reload(true);
  }

  handleChange = event => {
    const control = event.target;
    this.setState({ code: control.value });
  }
  render() {
    const { classes, code } = this.props;

    if (!code) return this.renderCodeRequest(classes);
    else if (this.state.requestCall) return (<div>
      <Typography component="h1" variant="h5">

        Please Wait ....
        <Typography color="textSecondary"> {'\t'} Connecting to network</Typography>
      </Typography>
      <br></br>
      <LinearProgress color="secondary"></LinearProgress>
    </div>);
    else if (!this.state.hasSurvey) return (<Typography component="h1" variant="h5">

      Code Doesn't Exist !
    <Typography color="textSecondary"> {'\t'} Check the code and try again</Typography>
    </Typography>);
    else if (this.state.voted) return this.navigateHome(classes);
    return (<div>

      <main className={classes.main}>

        <CssBaseline />

        <Paper className={classes.paper}>
          <Avatar className={classes.headerIcon}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {this.state.title}
          </Typography>
          <Typography component="p" color="textSecondary" variant="h5">
            {this.state.description}
          </Typography>
          <List className={classes.root}>
            <ListItem button onClick={() => this.handleClick(1)}
              className={this.state.selected === 1 ? classes.active : null} >
              <Avatar>
                <Filter1 />
              </Avatar>
              <ListItemText primary={this.state.option1} secondary="Check to Select Option 1" />
            </ListItem>
            <ListItem button onClick={() => this.handleClick(2)}
              className={this.state.selected === 2 ? classes.active : null} >
              <Avatar>
                <Filter2 />
              </Avatar>
              <ListItemText primary={this.state.option2} secondary="Check to Select Option 2" />
            </ListItem>
            <ListItem button onClick={() => this.handleClick(3)}
              className={this.state.selected === 3 ? classes.active : null} >
              <Avatar>
                <Filter3 />
              </Avatar>
              <ListItemText primary={this.state.option3} secondary="Check to Select Option 3" />
            </ListItem>
            <ListItem className={classes.fab}>
              <Fab variant="extended" aria-label="Delete" onClick={() => this.handleVote()}>
                <NavigationIcon className={classes.extendedIcon} />{'\t'}
                Cast Vote
            </Fab>
            </ListItem>
          </List>

        </Paper>
        <LinearProgress hidden={!this.state.voting}></LinearProgress>
      </main> {this.headerRender(classes)}</div>
    );
  }
}


ParticipateLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(ParticipateLayoutStyles)(ParticipateLayout);
