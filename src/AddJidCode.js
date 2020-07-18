import React, {useState} from "react";
import {Trans} from "@lingui/macro";
import AddIcon from "@material-ui/icons/Add";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    MenuItem,
} from "@material-ui/core";
import MaskedInput from "react-text-mask/dist/reactTextMask";
import {withProfiler} from '@sentry/react';

import {api} from "./config";
import regionCountries from './regionCountries';
import {translateCountryCode} from "./translateCountryCode";
import {EVENT_TYPE, publish} from "./eventManager";

const translateRegion = region => {
    switch (region) {
        case '1':
            return <Trans>Africa Scout Region</Trans>;
        case '2':
            return <Trans>Arab Scout Region</Trans>;
        case '3':
            return <Trans>Asia-Pacific Scout Region</Trans>;
        case '4':
            return <Trans>Eurasia Scout Region</Trans>;
        case '5':
            return <Trans>European Scout Region</Trans>;
        case '6':
            return <Trans>Interamerican Scout Region</Trans>;
        default:
            return null;
    }
};

const translateErrorCode = errorCode => {
    switch (errorCode) {
        case 'DUPLICATE':
            return <Trans id="error.addJid.duplicate">You have added the key already.</Trans>;
        default:
            return null;
    }
};

const JidCodeInput = props => {
    const {inputRef, ...other} = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/[1-6]/, /[a-zA-Z]/, /[a-zA-Z]/, /[0-9]/, /[0-9]/, /[a-zA-Z]/]}
            placeholderChar={'\u2000'}
        />
    );
};

const AddJidCodeModal = withProfiler(({open, handleClose}) => {
    const [jidCode, setJidCode] = useState('');
    const [region, setRegion] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [bingoCode, setBingoCode] = useState('');
    const [suffix, setSuffix] = useState('');
    const [errorCode, setErrorCode] = useState(null);

    const canSave = jidCode.length === 6;
    let incorrectCountryCodeForRegion = false;
    let translatedRegion = null;
    let translatedCountryCode = null;
    if (region) {
        translatedRegion = translateRegion(region);

        if (countryCode) {
            translatedCountryCode = translateCountryCode(countryCode);
            if (regionCountries[region].indexOf(countryCode) === -1) {
                incorrectCountryCodeForRegion = true;
            }
        }
    }

    const handleJidCode = newJidCode => {
        if (newJidCode.length >= 1) {
            setRegion(newJidCode[0]);
        } else {
            setRegion('');
        }
        if (newJidCode.length >= 3) {
            setCountryCode(newJidCode.substring(1, 3));
        } else {
            setCountryCode('');
        }
        if (newJidCode.length >= 5) {
            setBingoCode(newJidCode.substring(3, 5));
        } else {
            setBingoCode('');
        }
        if (newJidCode.length === 6) {
            setSuffix(newJidCode[5]);
        } else {
            setSuffix('');
        }

        setJidCode(newJidCode);
    };

    const handleChangeJidCode = event => {
        const newJidCode = event.target.value.toUpperCase().trim();
        handleJidCode(newJidCode);
    };

    const closeModal = () => {
        handleJidCode('');
        setErrorCode(null);
        handleClose();
    };

    const handleSave = async () => {
        const result = await api.addJidCode(jidCode);
        if (result.saved) {
            publish({
                type: EVENT_TYPE.JID_CODE_ADDED
            });
            closeModal();
        } else {
            setErrorCode(result.errorCode);
        }
    };

    const handleKeyUp = async event => {
        if (event.key === 'Enter' && canSave) {
            await handleSave()
        }
    };

    return (
        <Dialog open={open} onClose={closeModal} maxWidth="xs" aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"><Trans>Add JID Code</Trans></DialogTitle>
            <DialogContent style={{minHeight: 250, width: 300}}>
                <FormControl fullWidth style={{marginBottom: 40}} error={!!errorCode}>
                    <InputLabel htmlFor="formatted-text-mask-input"><Trans>JID Code</Trans></InputLabel>
                    <Input
                        value={jidCode}
                        onChange={handleChangeJidCode}
                        name="textmask"
                        id="formatted-text-mask-input"
                        inputComponent={JidCodeInput}
                        onFocus={event => event.target.select()}
                        onKeyUp={handleKeyUp}
                        autoFocus
                        autoComplete="off"
                    />
                    <FormHelperText id="component-helper-text">{translateErrorCode(errorCode)}</FormHelperText>
                </FormControl>
                {incorrectCountryCodeForRegion ? <DialogContentText style={{color: 'red', fontSize: '13px'}}>
                    <Trans id="error.invalidCountryForRegion">The JID code looks incorrect. The
                        country {countryCode} ({translatedCountryCode})
                        doesn't belong to the region {region} ({translatedRegion})</Trans>
                </DialogContentText> : null}
                {region ? <DialogContentText>
                    {region} = {translatedRegion}
                </DialogContentText> : null}
                {countryCode.length === 2 ? <DialogContentText>
                    {countryCode.toUpperCase()} = {translatedCountryCode}
                </DialogContentText> : null}
                {bingoCode.length === 2 ? <DialogContentText>
                    {bingoCode} = <Trans>Bingo number</Trans>
                </DialogContentText> : null}
                {suffix ? <DialogContentText>
                    {suffix} = <Trans>Control character</Trans>
                </DialogContentText> : null}
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="primary">
                    <Trans>Cancel</Trans>
                </Button>
                <Button onClick={handleSave} color="primary" disabled={!canSave} variant="contained">
                    <Trans>Add</Trans>
                </Button>
            </DialogActions>
        </Dialog>
    );
}, {name: 'AddJidCodeModal', includeUpdates: false});

export const AddJidCodeButton = () => {
    const [open, setOpen] = useState(false);

    return <>
        <Button color="inherit" startIcon={<AddIcon/>} onClick={() => setOpen(true)}>
            <Trans>Add JID Code</Trans>
        </Button>
        <AddJidCodeModal open={open} handleClose={() => setOpen(false)}/>
    </>;
};

export const AddJidCodeMenuItem = () => {
    const [open, setOpen] = useState(false);

    return <>
        <MenuItem onClick={() => setOpen(true)}><Trans>Add JID Code</Trans></MenuItem>
        <AddJidCodeModal open={open} handleClose={() => setOpen(false)}/>
    </>;
};
