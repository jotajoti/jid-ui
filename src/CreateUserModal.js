import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {t, Trans} from "@lingui/macro";
import {I18n} from "@lingui/react";
import {api} from "./config";
import {EVENT_TYPE, publish} from "./eventManager";

const CreateUserModal = ({open, handleClose}) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const createUser = async () => {
        const response = await api.createUser(name, username, password);
        if (response.error) {
            alert(response.error);
            return;
        }
        localStorage.setItem('token', response.token);
        publish({
            type: EVENT_TYPE.LOGIN
        });
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"><Trans>Create user</Trans></DialogTitle>
            <I18n>
                {({i18n}) => (
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label={i18n._(t`Name`)}
                            value={name}
                            type="text"
                            onChange={event => setName(event.target.value)}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="username"
                            label={i18n._(t`Username`)}
                            value={username}
                            type="text"
                            onChange={event => setUsername(event.target.value)}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label={i18n._(t`Password`)}
                            value={password}
                            type="password"
                            autoComplete="current-password"
                            onChange={event => setPassword(event.target.value)}
                            fullWidth
                        />
                    </DialogContent>
                )}
            </I18n>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    <Trans>Cancel</Trans>
                </Button>
                <Button onClick={createUser} color="primary" variant="contained">
                    <Trans>Create user</Trans>
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export const CreateUserButton = ({onClose}) => {
    const [open, setOpen] = useState(false);

    return <>
        <Button color="inherit" onClick={() => setOpen(true)}><Trans>Create user</Trans></Button>
        <CreateUserModal open={open} handleClose={() => {
            setOpen(false);
            onClose();
        }}/>
    </>;
};
