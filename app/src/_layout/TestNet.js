import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
});

function TestNetLayout(props) {
    const { classes } = props;
    const cards = props.networks;
    const prefix = '/surveyX/#/';
    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.heroUnit}>
                    <div className={classes.heroContent}>
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Ethereum Network Check
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary">
                            You need to connect your wallet (<b>MetaMask</b>, <b>Mist</b>, <b>Parity</b> or any other) to one of the following networks in order to be able to use this DApp!
                            </Typography>
                        <Typography variant="h6" align="center" paragraph>
                          Our DApp is currently deployed on the following networks:
                        </Typography>
                    </div>
                </div>
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    {/* End hero unit */}
                    <Grid container spacing={40}>
                        {cards.map(card => (
                            <Grid item key={card.id} sm={6} md={4} lg={3}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.title}
                                        </Typography>
                                        <Typography variant="subheading" color="secondary">
                                            {card.subtitle}
                                        </Typography>
                                        <Typography>
                                            {card.body}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <div className={classes.heroButtons}>
                    <Grid container spacing={16} justify="center">
                        <Grid item>
                            <Button variant="contained" color="primary" href={prefix}>
                                Lets Start
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}

TestNetLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TestNetLayout);