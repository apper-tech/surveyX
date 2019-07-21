import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SurveryHandler from '../_contractHandlers/SurveryHandler';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import helpers from '../_helpers/helpers';
import surveyIcon from '../survey.svg';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ShareIcon from '@material-ui/icons/Share';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Fab from '@material-ui/core/Fab';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Redirect } from 'react-router'
import Countdown from 'react-countdown-now';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import LinearProgress from '@material-ui/core/LinearProgress';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        alignItems: 'center',
    },
    table: {
        minWidth: 700,
    },
    card: {
        display: 'flex',
    },
    cardError: {
        display: 'flex',
        color: 'red'
    },
    cardDetails: {
        flex: 1,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
        float: 'right'
    },
    cardMedia: {
        width: 197
    },
    result: {
        width: 60,
        background: {
            fill: '#3f51b5',
        },
        text: {
            fill: '#fff',
        },
        path: {
            stroke: '#fff',
        },
        trail: { stroke: 'transparent' },
    }
});


let id = 0;
class OwnerSurveys extends React.Component {
    state = {
        rows: null,
        open: false,
        loading: true,
        hasSurvey: false,
        hasData: false,
        timeToRedirect: 5000,
        connecting: false,
        surveryCanceled: false,
        winner: '',
        winnnerFetched: false
    }
    componentDidMount() {
        helpers.initDrizzle(this.props.drizzle).then((state) => {
            SurveryHandler.CheckSurveyExsist(this.props.drizzle,
                state.drizzleState.accounts[0])
                .then((hasSurvey) => {
                    if (hasSurvey) {
                        this.setState({ hasSurvey: true });
                        SurveryHandler.GetSurveyList(this.props.drizzle,
                            state.drizzleState.accounts[0])
                            .then((data) => {
                                console.log(data);

                                this.setState({ rows: data, hasData: true, loading: false });
                            }).then(() => {
                                this.forceUpdate();
                            });
                    }
                    else {
                        this.setState({ loading: false });
                        this.forceUpdate();
                    }
                })
        });
    }
    /* let survey = {
        title: title,
        description: description,
        address: address,
        option1: option1,
        option2: option2,
        option3: option3,
        surveyCode: surveyCode,
        prizeEth: prizeEth
    } */
    createData(creationDate, numOfUsers) {
        id += 1;
        return { id, creationDate, numOfUsers };
    }
    getParticipantsCount(rows) {
        let o1 = 0, o2 = 0, o3 = 0;
        rows.forEach(element => {
            switch (element.selectedOption) {
                case 1:
                    o1++;
                    break;
                case 2:
                    o2++;
                    break;
                case 3:
                    o3++;
                    break;
                default:
                    break;
            }
        });
        return { o1, o2, o3 };
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        const { classes } = this.props;
        if (this.state.loading) {
            return (<div>
                <Typography component="h1" variant="h5">

                    Please Wait ....
                  <Typography color="textSecondary"> {'\t'} Connecting to network</Typography>
                </Typography>
                <br></br>
                <LinearProgress color="secondary"></LinearProgress>
            </div>);
        }
        else if (this.state.hasSurvey) {
            if (this.state.winnnerFetched) {
                return this.WinnerCard(classes);
            }
            else if (this.state.surveryCanceled)
                return (
                    <Typography component="h1" variant="h5">
                        Survey canceled
             <Typography color="textSecondary">
                            {'\t'} You Can create a new one now !</Typography>
                    </Typography>
                );
            else if (this.state.hasData) {
                return (this.OwnerSurveysTable(classes, this.state.results));
            }
        }
        else {
            return (
                <Typography component="h1" variant="h5">
                    No Survey Created!
                      <Typography color="textSecondary"> {'\t'} please create one using the menu</Typography>
                </Typography>);
        }
    }
    navigateHome(classes) {
        const renderer = ({ hours, minutes, seconds, completed }) => {
            if (completed) {
                this.forceUpdate();
                return <Redirect to="/mysurveys" />
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
                            title="No Survey Found Please Create One"></CardHeader>
                        <CardActions className={classes.actions} disableActionSpacing>
                            <Divider ></Divider>
                            <br></br>
                            <Typography component="p" color="textSecondary" >
                                Redirecting to Home Page click to procced
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
    RenderResult(value, option, classes) {
        const { o1, o2, o3 } = this.getParticipantsCount(value);
        switch (option) {
            case 1:
                return (<CircularProgressbar
                    percentage={o1}
                    text={`${o1}`}
                    background
                    backgroundPadding={6}
                    className={classes.result}
                />);

            case 2:
                return (<CircularProgressbar
                    percentage={o2}
                    text={`${o2}`}
                    background
                    backgroundPadding={6}
                    className={classes.result}
                />);

            case 3:
                return (<CircularProgressbar
                    percentage={o3}
                    text={`${o3}`}
                    background
                    backgroundPadding={6}
                    className={classes.result}
                />);

            default:
                break;
        }

    }
    handleDone(rows) {
        if (rows.participants.length > 0) {
            SurveryHandler.GetWinnerAddress(this.props.drizzle,
                rows)
                .then((address) => {
                    this.setState({ winner: address, winnnerFetched: true });
                    this.forceUpdate();
                });
        }
    }
    handleCancel(rows) {
        this.setState({ connecting: true });

        SurveryHandler.CancelSurvey(this.props.drizzle, rows.address)
            .then((canceled) => {
                this.setState({ connecting: false, surveryCanceled: true });
            })

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
        let survey = this.state.rows;
        delete (survey['participants']);
        delete (survey['_id']);
        this.sendFile(this.state.rows, "Signature");
    }
    OwnerSurveysTable(classes, results) {
        const Timestamp = require('react-timestamp');
        const surveyLink = `/surveyX/#/participate/${this.state.rows.surveyCode}`;
        return (
            <div>
                <Grid container spacing={40} className={classes.cardGrid}>
                    <Grid item xs={12} md={12}>
                        <Card className={classes.card}>
                            <div className={classes.cardDetails}>
                                <CardContent>
                                    <Typography component="h1" variant="h5">
                                        <Typography color="textSecondary"> {'\t'} Title</Typography>
                                        {this.state.rows.title}
                                    </Typography>
                                    <Typography component="h1" variant="h5">
                                        <Typography color="textSecondary">{'\t'}  Description</Typography>
                                        {this.state.rows.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        disabled={this.state.rows.participants.length == 0}
                                        className={classes.submit}
                                        onClick={() => this.handleDone(this.state.rows)}
                                    >
                                        End Survey
                                    </Button>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        className={classes.submit}
                                        onClick={() => this.handleCancel(this.state.rows)}
                                    >
                                        Cancel Survey
                                    </Button>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="outlined"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={() => this.handleClickDown()}
                                    >
                                        <ArrowDownward className={classes.extendedIcon} />
                                        Download
                                    </Button>
                                </CardActions>
                            </div>
                            <CardMedia
                                className={classes.cardMedia}
                                image={surveyIcon}
                            />

                        </Card>
                        <br></br>
                        <LinearProgress hidden={!this.state.connecting}></LinearProgress>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Paper>
                            <List dense={false}>
                                <ListItem>
                                    <ListItemText
                                        primary={this.state.rows.option1}
                                        secondary="First Option"
                                    />
                                    <div>{this.state.rows ? this.RenderResult(this.state.rows.participants, 1, classes) : "fool"}</div>
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={this.state.rows.option2}
                                        secondary="Second Option"
                                    />
                                    <div>{this.state.rows ? this.RenderResult(this.state.rows.participants, 2, classes) : "fool"}</div>
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={this.state.rows.option3}
                                        secondary="Third Option"
                                    />
                                    <div>{this.state.rows ? this.RenderResult(this.state.rows.participants, 3, classes) : "fool"}</div>
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
                <Paper className={classes.root} >
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">
                                    <Grid container>
                                        <Grid item> #ID:
                                            <Typography variant="subtitle1" color="textSecondary">
                                                {this.state.rows.surveyCode}
                                            </Typography>
                                        </Grid>
                                        <Grid item> <BottomNavigationAction label="Share" onClick={this.handleClickOpen} icon={<ShareIcon />} /></Grid>
                                    </Grid>
                                    <Dialog
                                        open={this.state.open}
                                        onClose={this.handleClose}
                                        aria-labelledby="share-title"
                                        aria-describedby="share-description"
                                    >
                                        <DialogTitle id="share-title">{"Share Code to participants: "}</DialogTitle>
                                        <DialogContent>
                                            <Grid container spacing={8}>
                                                <Grid item>  Please Share This Link:
                                                    <Typography>
                                                        <Link href={surveyLink}>{this.state.rows.surveyCode}</Link>
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <CopyToClipboard text={surveyLink}
                                                        onCopy={() => this.setState({ copied: true })}>
                                                        <Fab color="secondary" aria-label="Edit" className={classes.fab}>
                                                            <FileCopyIcon />
                                                        </Fab>
                                                    </CopyToClipboard>

                                                </Grid>
                                            </Grid>
                                        </DialogContent>
                                        <DialogActions>
                                        </DialogActions>
                                    </Dialog>
                                </TableCell>
                                <TableCell align="left">Creation Date:
                                    <Typography variant="subtitle1" color="textSecondary">
                                        <Timestamp date={this.state.rows.creationDate} />
                                    </Typography></TableCell>
                                <TableCell align="left">Participants:
                                <Typography variant="subtitle1" color="textSecondary">
                                        {this.state.rows.participants.length}
                                    </Typography></TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </Paper></div>
        );
    }
    WinnerCard(classes) {
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Survey Concluded!
                </Typography>
                        <Typography component="p">
                            Winner Address is : <b>{this.state.winner}</b>
                        </Typography>
                        <Typography component="p" color="textSecondary">
                            Please Send the Ether to this Account and have a nice day
                </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <CopyToClipboard text={this.state.winner}>
                        <Button size="small" color="primary">
                            Copy
                  </Button>
                    </CopyToClipboard>
                </CardActions>
            </Card>
        );
    }

}


OwnerSurveys.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OwnerSurveys);
