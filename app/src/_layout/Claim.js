import { ClaimLayoutStyles } from '../_layout/Styles';
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import 'react-circular-progressbar/dist/styles.css';
import helpers from '../_helpers/helpers';
import SurveyHandler from '../_contractHandlers/SurveryHandler';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import { DropzoneArea } from 'material-ui-dropzone'
import LinearProgress from '@material-ui/core/LinearProgress';
class ClaimLayout extends React.Component {
    state = {
        files: [], fileUploaded: true,
        loading: true, drizzleState: null,
    };
    componentDidMount() {
        const { drizzle } = this.props;
        helpers.initDrizzle(drizzle).then((state) => {
            this.setState(state);
        });
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
        return this.renderCodeRequest(classes);
    }
    handleChange(files) {
        this.setState({
            files: files
        });
    }
    renderCodeRequest(classes) {
        return (<main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Avatar className={classes.footer}>
                    <ArrowUpward />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Upload Signature
            </Typography>
                <DropzoneArea
                    onChange={this.handleChange.bind(this)}
                    filesLimit={1}
                    dropzoneText={''}
                    showFileNamesInPreview={true}
                    dropzoneClass={classes.dropzone}
                />
                <div hidden={this.state.fileUploaded}>
                    <p className={classes.listItemError}>Please Upload a file</p>
                </div>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => this.handleClaim()}
                >
                    Claim Prize !
              </Button>
            </Paper>
        </main>)
    }
    handleClaim = event => {
        const { drizzle } = this.props;
        if (this.state.files.length > 0) {
            this.setState({ fileUploaded: true });
            helpers.getJSONFromFile(this.state.files).then((sign) => {
                const { drizzleState, selected } = this.state;
                SurveyHandler.ClaimPrize(drizzle, drizzleState.accounts[0], sign).then((done) => {
                    console.log(done);

                })
            })
        }
        else {
            this.setState({ fileUploaded: false });
        }
    }
}
ClaimLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(ClaimLayoutStyles)(ClaimLayout);
