import React, {useEffect, useState} from 'react';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {GeoJSON, Map} from "react-leaflet";
import iso3to2 from 'country-iso-3-to-2';
import geoJson from './geojson/countries.geo';
import moment from 'moment';
import logoImage from './logo.png';
import countries from './countries';
import {newCountryTime, serverUrl} from "./config";

const styles = {
    root: {
        display: 'flex',
    },
    appBar: {
        colorPrimary: '#FFFFFF'
    },
    title: {
        marginLeft: 24,
        flexGrow: 1,
    },
    content: {
        paddingTop: 70,
        flex: 1,
    },
    box: {
        paddingTop: 8,
    },
    boxHeader: {
        marginLeft: 16,
    },
    statNumber: {
        textAlign: 'right'
    },
    totals: {
        padding: 8
    },
    new: {
        backgroundColor: '#FFFF00'
    }
};

export const App = withStyles(styles)(props => {
    const {classes} = props;

    const [stats, setStats] = useState({totals: {jids: 0, unique: 0, countries: 0}, users: [], countries: []});
    const [loading, setLoading] = useState(true);

    const countryMap = countries.reduce((lookupMap, country) => {
        lookupMap[country.code] = country.name;
        return lookupMap;
    }, {});

    useEffect(() => {
        const fetchStats = async () => {
            const response = await fetch(serverUrl);
            const body = await response.json();
            body.countryMap = body.countries.reduce((lookupMap, country) => {
                lookupMap[country.country] = country;
                return lookupMap;
            }, {});
            setStats(body);
            setLoading(false);
        };
        fetchStats().then(() => {
            setInterval(fetchStats, 5 * 1000);
        });
    }, []);

    const center = [30, 10];
    const newCountryIndicator = moment().subtract(newCountryTime, 'minutes');

    return (
        <div className={classes.root}>
            <AppBar position={'absolute'} className={classes.appBar} color="default">
                <Toolbar>
                    <img src={logoImage} height={50} alt="Jota/Joti 2019"/>
                    <Typography variant="h6" color="inherit" className={classes.title}>
                        Jota/Joti 2019
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.content}>
                {loading ? (<div>Loading</div>) : (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper className={classes.totals}>
                                <Grid container alignItems="center" justify="space-around" direction="row">
                                    <Grid item>
                                        <Typography variant="body2">Total antal JID
                                            koder: {stats.totals.jids}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2">Unikke JID koder: {stats.totals.unique}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2">Unikke lande: {stats.totals.countries}</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                <Map center={center} zoom={2}>
                                    <GeoJSON data={geoJson} style={feature => {
                                        const countryCode = iso3to2(feature.id) ? iso3to2(feature.id).toLowerCase() : null;
                                        const statsCountry = stats.countryMap[countryCode];
                                        const firstCreated = statsCountry ? moment(statsCountry.created) : null;
                                        const newlyCreated = firstCreated && newCountryIndicator.isBefore(firstCreated);
                                        return {
                                            weight: 1,
                                            color: '#8a8a8a',
                                            fillColor: newlyCreated ? '#FFFF00' : statsCountry ? '#0000FF' : '#888888'
                                        };
                                    }}/>
                                </Map>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.box}>
                                <Typography variant="h6" className={classes.boxHeader}>Stillinger</Typography>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Navn</TableCell>
                                            <TableCell align="right">Lande</TableCell>
                                            <TableCell align="right">Unikke koder</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {stats.users.map(user => (
                                            <TableRow key={user.name}>
                                                <TableCell component="th" scope="row">
                                                    {user.name}
                                                </TableCell>
                                                <TableCell align="right">{user.countries}</TableCell>
                                                <TableCell align="right">{user.jids}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.box}>
                                <Typography variant="h6" className={classes.boxHeader}>Lande</Typography>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Landenavn</TableCell>
                                            <TableCell align="right">Unikke koder</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {stats.countries.map(country => {
                                            const firstCreated = moment(country.created);
                                            const newlyCreated = newCountryIndicator.isBefore(firstCreated);
                                            return (
                                                <TableRow key={country.country} className={newlyCreated ? classes.new : ''}>
                                                    <TableCell component="th" scope="row">
                                                        {countryMap[country.country.toUpperCase()] ? countryMap[country.country.toUpperCase()] : country.country}
                                                    </TableCell>
                                                    <TableCell align="right">{country.jids}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </Grid>
                )}
            </div>
        </div>
    );
});
