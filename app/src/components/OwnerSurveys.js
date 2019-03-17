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
        hasSurvey: false,
        timeToRedirect: 5000,
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
                                this.setState({ rows: data });
                            }).then(() => {
                                this.forceUpdate();
                            });;
                    }
                })
        });
    }
    createData(creationDate, numOfUsers) {
        id += 1;
        return { id, creationDate, numOfUsers };
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        const { classes } = this.props;
        if (this.state.winnnerFetched) return this.MediaCard(classes)
        if (!this.state.hasSurvey) return (this.navigateHome(classes))
        else if (this.state.rows) {
            return (this.OwnerSurveysTable(classes, this.state.results))
        }
        else {
            return "loading...";
        }
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
        return (<CircularProgressbar
            percentage={value}
            text={`${value}`}
            background
            backgroundPadding={6}
            className={classes.result}
        />);
    }
    handleDone(part, code) {
        if (part > 0) {
            SurveryHandler.GetWinnerAddress(this.props.drizzle,
                code, part)
                .then((address) => {
                    this.setState({ winner: address, winnnerFetched: true });
                    this.forceUpdate();
                });
        }
    }
    OwnerSurveysTable(classes, results) {
        const Timestamp = require('react-timestamp');
        const prefix = '/survey-proof-auth/#/';
        return (
            <div>
                <Grid container spacing={40} className={classes.cardGrid}>
                    <Grid item xs={12} md={12}>
                        <Card className={classes.card}>
                            <div className={classes.cardDetails}>
                                <CardContent>
                                    <Typography component="h1" variant="h5">
                                        <Typography color="textSecondary"> {'\t'} Title</Typography>
                                        {this.state.rows[0]}
                                    </Typography>
                                    <Typography component="h1" variant="h5">
                                        <Typography color="textSecondary">{'\t'}  Description</Typography>
                                        {this.state.rows[1]}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={() => this.handleDone(this.state.rows[8], this.state.rows[7])}
                                    >End Survey</Button>
                                </CardActions>
                            </div>
                            <CardMedia
                                className={classes.cardMedia}
                                image={surveyIcon}
                            />

                        </Card>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Paper>
                            <List dense={false}>
                                <ListItem>
                                    <ListItemText
                                        primary={this.state.rows[2]}
                                        secondary="First Option"
                                    />
                                    <div>{this.state.rows ? this.RenderResult(this.state.rows[9], 0, classes) : "fool"}</div>
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={this.state.rows[3]}
                                        secondary="Second Option"
                                    />
                                    <div>{this.state.rows ? this.RenderResult(this.state.rows[10], 0, classes) : "fool"}</div>
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary={this.state.rows[4]}
                                        secondary="Third Option"
                                    />
                                    <div>{this.state.rows ? this.RenderResult(this.state.rows[11], 0, classes) : "fool"}</div>
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
                                                {this.state.rows[7]}
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
                                                        <Link href={prefix + "/participate/" + this.state.rows[7]}>{window.location.host + prefix + "/participate/" + this.state.rows[7]}</Link>
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <CopyToClipboard text={window.location.host + "/participate?survey=" + this.state.rows[7]}
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
                                        <Timestamp time={this.state.rows[6]} />
                                    </Typography></TableCell>
                                <TableCell align="left">Participants:
                                <Typography variant="subtitle1" color="textSecondary">
                                        {this.state.rows[8]}
                                    </Typography></TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </Paper></div>
        );
    }
    MediaCard(classes) {
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
