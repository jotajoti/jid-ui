import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {t, Trans} from "@lingui/macro";
import {I18n} from "@lingui/react";
import {CreateUserButton} from "./CreateUserModal";
import {api} from "./config";
import {EVENT_TYPE, publish} from "./eventManager";

const LoginModal = ({open, handleClose}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const loginResult = await api.login(username, password);
        if (loginResult.error) {
            alert(loginResult.error);
            return;
        }
        localStorage.setItem('token', loginResult.token);
        publish({
            type: EVENT_TYPE.LOGIN
        });
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"><Trans>Login</Trans></DialogTitle>
            <I18n>
                {({i18n}) => (
                    <DialogContent>
                        <DialogContentText>
                            <Trans>Login to submit JID codes.</Trans>
                        </DialogContentText>
                        <TextField
                            autoFocus
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
                        <DialogContentText>
                            <br/><br/>
                            <Trans>If you do not have a user yet, click here:</Trans>
                            <CreateUserButton onClose={handleClose}/>
                        </DialogContentText>
                    </DialogContent>
                )}
            </I18n>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    <Trans>Cancel</Trans>
                </Button>
                <Button onClick={handleLogin} color="primary" variant="contained">
                    <Trans>Login</Trans>
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export const LoginButton = () => {
    const [open, setOpen] = useState(false);

    return <>
        <Button color="inherit" onClick={() => setOpen(true)}><Trans>Login</Trans></Button>
        <LoginModal open={open} handleClose={() => setOpen(false)}/>
    </>;
};
