import React, {useEffect, useMemo, useState} from 'react';
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
import {Trans} from "@lingui/macro";
import SearchIcon from '@material-ui/icons/Search';

import logoImage from './logo_50x50.png';
import {api, newCountryTime} from "./config";
import {UserButton} from "./UserButton";
import {translateCountryCode} from "./translateCountryCode";
import {CountryPopup} from "./CountryPopup";
import IconButton from "@material-ui/core/IconButton";

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
    const [hoveredCountry, setHoveredCountry] = useState(null);
    const [zoomBounds, setZoomBounds] = useState(null);
    const countryBounds = useMemo(() => ({}), []);

    useEffect(() => {
        const fetchStats = async () => {
            const stats = await api.getStats();
            stats.countryMap = stats.countries.reduce((lookupMap, country) => {
                lookupMap[country.country] = country;
                return lookupMap;
            }, {});
            setStats(stats);
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
            <AppBar position={'fixed'} className={classes.appBar} color="default">
                <Toolbar>
                    <img src={logoImage} height={50} alt="Jota/Joti 2020"/>
                    <Typography variant="h6" color="inherit" className={classes.title}>
                        Jota/Joti 2020
                    </Typography>
                    <UserButton/>
                </Toolbar>
            </AppBar>
            <div className={classes.content}>
                {loading ? (<div><Trans>Loading</Trans></div>) : (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper className={classes.totals}>
                                <Grid container alignItems="center" justify="space-around" direction="row">
                                    <Grid item>
                                        <Typography variant="body2"><Trans>Total number of JID
                                            codes: {stats.totals.jids}</Trans></Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2"><Trans>Unique JID
                                            codes: {stats.totals.unique}</Trans></Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2"><Trans>Unique
                                            countries: {stats.totals.countries}</Trans></Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                <Map center={center} zoom={2} bounds={zoomBounds}>
                                    <GeoJSON data={geoJson} style={feature => {
                                        const countryCode = iso3to2(feature.id) ? iso3to2(feature.id).toLowerCase() : null;
                                        const statsCountry = stats.countryMap[countryCode];
                                        const firstCreated = statsCountry ? moment(statsCountry.created) : null;
                                        const newlyCreated = firstCreated && newCountryIndicator.isBefore(firstCreated);
                                        return {
                                            weight: 1,
                                            color: '#8a8a8a',
                                            fillColor: newlyCreated ? '#FFFF00' : statsCountry ? '#0000FF' : '#888888',
                                            interactive: !!statsCountry
                                        };
                                    }} onEachFeature={(feature, layer) => {
                                        const countryCode = iso3to2(feature.id) ? iso3to2(feature.id).toLowerCase() : null;
                                        const statsCountry = stats.countryMap[countryCode];

                                        countryBounds[countryCode] = layer.getBounds();

                                        if (statsCountry) {
                                            layer.on('mouseover', () => {
                                                setHoveredCountry({
                                                    feature
                                                });
                                            });
                                            layer.on('mouseout', () => {
                                                setHoveredCountry(null);
                                            });
                                        }
                                    }}>
                                        {hoveredCountry ?
                                            <CountryPopup hoveredCountry={hoveredCountry} stats={stats}/> : null}
                                    </GeoJSON>
                                </Map>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.box}>
                                <Typography variant="h6"
                                            className={classes.boxHeader}><Trans>Scoreboard</Trans></Typography>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><Trans>Name</Trans></TableCell>
                                            <TableCell align="right"><Trans>Countries</Trans></TableCell>
                                            <TableCell align="right"><Trans>Unique codes</Trans></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {stats.users.map((user, index) => (
                                            <TableRow key={`${user.name}-${index}`}>
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
                                <Typography variant="h6"
                                            className={classes.boxHeader}><Trans>Countries</Trans></Typography>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><Trans>Country name</Trans></TableCell>
                                            <TableCell align="right"><Trans>Unique codes</Trans></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {stats.countries.map(country => {
                                            const firstCreated = moment(country.created);
                                            const newlyCreated = newCountryIndicator.isBefore(firstCreated);
                                            return (
                                                <TableRow key={country.country}
                                                          className={newlyCreated ? classes.new : ''}>
                                                    <TableCell component="th" scope="row">
                                                        <IconButton size="small"
                                                           onClick={() => {
                                                               window.scrollTo({top: 0, behavior: 'smooth'});
                                                               setZoomBounds(countryBounds[country.country]);
                                                           }}>
                                                            <SearchIcon fontSize="small"/>
                                                        </IconButton>
                                                        {translateCountryCode(country.country.toUpperCase())}
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
