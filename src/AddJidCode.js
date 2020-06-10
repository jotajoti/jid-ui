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
    InputLabel
} from "@material-ui/core";
import MaskedInput from "react-text-mask/dist/reactTextMask";

import {api} from "./config";
import regionCountries from './regionCountries';

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

const translateCountryCode = countryCode => {
    switch (countryCode.toUpperCase()) {
        case 'AF':
            return <Trans id="AF">Afghanistan</Trans>;
        case 'AX':
            return <Trans id="AX">\u00c5land Islands</Trans>;
        case 'AL':
            return <Trans id="AL">Albania</Trans>;
        case 'DZ':
            return <Trans id="DZ">Algeria</Trans>;
        case 'AS':
            return <Trans id="AS">American Samoa</Trans>;
        case 'AD':
            return <Trans id="AD">Andorra</Trans>;
        case 'AO':
            return <Trans id="AO">Angola</Trans>;
        case 'AI':
            return <Trans id="AI">Anguilla</Trans>;
        case 'AQ':
            return <Trans id="AQ">Antarctica</Trans>;
        case 'AG':
            return <Trans id="AG">Antigua and Barbuda</Trans>;
        case 'AR':
            return <Trans id="AR">Argentina</Trans>;
        case 'AM':
            return <Trans id="AM">Armenia</Trans>;
        case 'AW':
            return <Trans id="AW">Aruba</Trans>;
        case 'AU':
            return <Trans id="AU">Australia</Trans>;
        case 'AT':
            return <Trans id="AT">Austria</Trans>;
        case 'AZ':
            return <Trans id="AZ">Azerbaijan</Trans>;
        case 'BS':
            return <Trans id="BS">Bahamas</Trans>;
        case 'BH':
            return <Trans id="BH">Bahrain</Trans>;
        case 'BD':
            return <Trans id="BD">Bangladesh</Trans>;
        case 'BB':
            return <Trans id="BB">Barbados</Trans>;
        case 'BY':
            return <Trans id="BY">Belarus</Trans>;
        case 'BE':
            return <Trans id="BE">Belgium</Trans>;
        case 'BZ':
            return <Trans id="BZ">Belize</Trans>;
        case 'BJ':
            return <Trans id="BJ">Benin</Trans>;
        case 'BM':
            return <Trans id="BM">Bermuda</Trans>;
        case 'BT':
            return <Trans id="BT">Bhutan</Trans>;
        case 'BO':
            return <Trans id="BO">Bolivia, Plurinational State of</Trans>;
        case 'BQ':
            return <Trans id="BQ">Bonaire, Sint Eustatius and Saba</Trans>;
        case 'BA':
            return <Trans id="BA">Bosnia and Herzegovina</Trans>;
        case 'BW':
            return <Trans id="BW">Botswana</Trans>;
        case 'BV':
            return <Trans id="BV">Bouvet Island</Trans>;
        case 'BR':
            return <Trans id="BR">Brazil</Trans>;
        case 'IO':
            return <Trans id="IO">British Indian Ocean Territory</Trans>;
        case 'BN':
            return <Trans id="BN">Brunei Darussalam</Trans>;
        case 'BG':
            return <Trans id="BG">Bulgaria</Trans>;
        case 'BF':
            return <Trans id="BF">Burkina Faso</Trans>;
        case 'BI':
            return <Trans id="BI">Burundi</Trans>;
        case 'KH':
            return <Trans id="KH">Cambodia</Trans>;
        case 'CM':
            return <Trans id="CM">Cameroon</Trans>;
        case 'CA':
            return <Trans id="CA">Canada</Trans>;
        case 'CV':
            return <Trans id="CV">Cape Verde</Trans>;
        case 'KY':
            return <Trans id="KY">Cayman Islands</Trans>;
        case 'CF':
            return <Trans id="CF">Central African Republic</Trans>;
        case 'TD':
            return <Trans id="TD">Chad</Trans>;
        case 'CL':
            return <Trans id="CL">Chile</Trans>;
        case 'CN':
            return <Trans id="CN">China</Trans>;
        case 'CX':
            return <Trans id="CX">Christmas Island</Trans>;
        case 'CC':
            return <Trans id="CC">Cocos (Keeling) Islands</Trans>;
        case 'CO':
            return <Trans id="CO">Colombia</Trans>;
        case 'KM':
            return <Trans id="KM">Comoros</Trans>;
        case 'CG':
            return <Trans id="CG">Congo</Trans>;
        case 'CD':
            return <Trans id="CD">Congo, the Democratic Republic of the</Trans>;
        case 'CK':
            return <Trans id="CK">Cook Islands</Trans>;
        case 'CR':
            return <Trans id="CR">Costa Rica</Trans>;
        case 'CI':
            return <Trans id="CI">C\u00f4te d'Ivoire</Trans>;
        case 'HR':
            return <Trans id="HR">Croatia</Trans>;
        case 'CU':
            return <Trans id="CU">Cuba</Trans>;
        case 'CW':
            return <Trans id="CW">Cura\u00e7ao</Trans>;
        case 'CY':
            return <Trans id="CY">Cyprus</Trans>;
        case 'CZ':
            return <Trans id="CZ">Czech Republic</Trans>;
        case 'DK':
            return <Trans id="DK">Denmark</Trans>;
        case 'DJ':
            return <Trans id="DJ">Djibouti</Trans>;
        case 'DM':
            return <Trans id="DM">Dominica</Trans>;
        case 'DO':
            return <Trans id="DO">Dominican Republic</Trans>;
        case 'EC':
            return <Trans id="EC">Ecuador</Trans>;
        case 'EG':
            return <Trans id="EG">Egypt</Trans>;
        case 'SV':
            return <Trans id="SV">El Salvador</Trans>;
        case 'GQ':
            return <Trans id="GQ">Equatorial Guinea</Trans>;
        case 'ER':
            return <Trans id="ER">Eritrea</Trans>;
        case 'EE':
            return <Trans id="EE">Estonia</Trans>;
        case 'ET':
            return <Trans id="ET">Ethiopia</Trans>;
        case 'FK':
            return <Trans id="FK">Falkland Islands (Malvinas)</Trans>;
        case 'FO':
            return <Trans id="FO">Faroe Islands</Trans>;
        case 'FJ':
            return <Trans id="FJ">Fiji</Trans>;
        case 'FI':
            return <Trans id="FI">Finland</Trans>;
        case 'FR':
            return <Trans id="FR">France</Trans>;
        case 'GF':
            return <Trans id="GF">French Guiana</Trans>;
        case 'PF':
            return <Trans id="PF">French Polynesia</Trans>;
        case 'TF':
            return <Trans id="TF">French Southern Territories</Trans>;
        case 'GA':
            return <Trans id="GA">Gabon</Trans>;
        case 'GM':
            return <Trans id="GM">Gambia</Trans>;
        case 'GE':
            return <Trans id="GE">Georgia</Trans>;
        case 'DE':
            return <Trans id="DE">Germany</Trans>;
        case 'GH':
            return <Trans id="GH">Ghana</Trans>;
        case 'GI':
            return <Trans id="GI">Gibraltar</Trans>;
        case 'GR':
            return <Trans id="GR">Greece</Trans>;
        case 'GL':
            return <Trans id="GL">Greenland</Trans>;
        case 'GD':
            return <Trans id="GD">Grenada</Trans>;
        case 'GP':
            return <Trans id="GP">Guadeloupe</Trans>;
        case 'GU':
            return <Trans id="GU">Guam</Trans>;
        case 'GT':
            return <Trans id="GT">Guatemala</Trans>;
        case 'GG':
            return <Trans id="GG">Guernsey</Trans>;
        case 'GN':
            return <Trans id="GN">Guinea</Trans>;
        case 'GW':
            return <Trans id="GW">Guinea-Bissau</Trans>;
        case 'GY':
            return <Trans id="GY">Guyana</Trans>;
        case 'HT':
            return <Trans id="HT">Haiti</Trans>;
        case 'HM':
            return <Trans id="HM">Heard Island and McDonald Islands</Trans>;
        case 'VA':
            return <Trans id="VA">Holy See (Vatican City State)</Trans>;
        case 'HN':
            return <Trans id="HN">Honduras</Trans>;
        case 'HK':
            return <Trans id="HK">Hong Kong</Trans>;
        case 'HU':
            return <Trans id="HU">Hungary</Trans>;
        case 'IS':
            return <Trans id="IS">Iceland</Trans>;
        case 'IN':
            return <Trans id="IN">India</Trans>;
        case 'ID':
            return <Trans id="ID">Indonesia</Trans>;
        case 'IR':
            return <Trans id="IR">Iran, Islamic Republic of</Trans>;
        case 'IQ':
            return <Trans id="IQ">Iraq</Trans>;
        case 'IE':
            return <Trans id="IE">Ireland</Trans>;
        case 'IM':
            return <Trans id="IM">Isle of Man</Trans>;
        case 'IL':
            return <Trans id="IL">Israel</Trans>;
        case 'IT':
            return <Trans id="IT">Italy</Trans>;
        case 'JM':
            return <Trans id="JM">Jamaica</Trans>;
        case 'JP':
            return <Trans id="JP">Japan</Trans>;
        case 'JE':
            return <Trans id="JE">Jersey</Trans>;
        case 'JO':
            return <Trans id="JO">Jordan</Trans>;
        case 'KZ':
            return <Trans id="KZ">Kazakhstan</Trans>;
        case 'KE':
            return <Trans id="KE">Kenya</Trans>;
        case 'KI':
            return <Trans id="KI">Kiribati</Trans>;
        case 'KP':
            return <Trans id="KP">Korea, Democratic People's Republic of</Trans>;
        case 'KR':
            return <Trans id="KR">Korea, Republic of</Trans>;
        case 'KW':
            return <Trans id="KW">Kuwait</Trans>;
        case 'KG':
            return <Trans id="KG">Kyrgyzstan</Trans>;
        case 'LA':
            return <Trans id="LA">Lao People's Democratic Republic</Trans>;
        case 'LV':
            return <Trans id="LV">Latvia</Trans>;
        case 'LB':
            return <Trans id="LB">Lebanon</Trans>;
        case 'LS':
            return <Trans id="LS">Lesotho</Trans>;
        case 'LR':
            return <Trans id="LR">Liberia</Trans>;
        case 'LY':
            return <Trans id="LY">Libya</Trans>;
        case 'LI':
            return <Trans id="LI">Liechtenstein</Trans>;
        case 'LT':
            return <Trans id="LT">Lithuania</Trans>;
        case 'LU':
            return <Trans id="LU">Luxembourg</Trans>;
        case 'MO':
            return <Trans id="MO">Macao</Trans>;
        case 'MK':
            return <Trans id="MK">Macedonia, the Former Yugoslav Republic of</Trans>;
        case 'MG':
            return <Trans id="MG">Madagascar</Trans>;
        case 'MW':
            return <Trans id="MW">Malawi</Trans>;
        case 'MY':
            return <Trans id="MY">Malaysia</Trans>;
        case 'MV':
            return <Trans id="MV">Maldives</Trans>;
        case 'ML':
            return <Trans id="ML">Mali</Trans>;
        case 'MT':
            return <Trans id="MT">Malta</Trans>;
        case 'MH':
            return <Trans id="MH">Marshall Islands</Trans>;
        case 'MQ':
            return <Trans id="MQ">Martinique</Trans>;
        case 'MR':
            return <Trans id="MR">Mauritania</Trans>;
        case 'MU':
            return <Trans id="MU">Mauritius</Trans>;
        case 'YT':
            return <Trans id="YT">Mayotte</Trans>;
        case 'MX':
            return <Trans id="MX">Mexico</Trans>;
        case 'FM':
            return <Trans id="FM">Micronesia, Federated States of</Trans>;
        case 'MD':
            return <Trans id="MD">Moldova, Republic of</Trans>;
        case 'MC':
            return <Trans id="MC">Monaco</Trans>;
        case 'MN':
            return <Trans id="MN">Mongolia</Trans>;
        case 'ME':
            return <Trans id="ME">Montenegro</Trans>;
        case 'MS':
            return <Trans id="MS">Montserrat</Trans>;
        case 'MA':
            return <Trans id="MA">Morocco</Trans>;
        case 'MZ':
            return <Trans id="MZ">Mozambique</Trans>;
        case 'MM':
            return <Trans id="MM">Myanmar</Trans>;
        case 'NA':
            return <Trans id="NA">Namibia</Trans>;
        case 'NR':
            return <Trans id="NR">Nauru</Trans>;
        case 'NP':
            return <Trans id="NP">Nepal</Trans>;
        case 'NL':
            return <Trans id="NL">Netherlands</Trans>;
        case 'NC':
            return <Trans id="NC">New Caledonia</Trans>;
        case 'NZ':
            return <Trans id="NZ">New Zealand</Trans>;
        case 'NI':
            return <Trans id="NI">Nicaragua</Trans>;
        case 'NE':
            return <Trans id="NE">Niger</Trans>;
        case 'NG':
            return <Trans id="NG">Nigeria</Trans>;
        case 'NU':
            return <Trans id="NU">Niue</Trans>;
        case 'NF':
            return <Trans id="NF">Norfolk Island</Trans>;
        case 'MP':
            return <Trans id="MP">Northern Mariana Islands</Trans>;
        case 'NO':
            return <Trans id="NO">Norway</Trans>;
        case 'OM':
            return <Trans id="OM">Oman</Trans>;
        case 'PK':
            return <Trans id="PK">Pakistan</Trans>;
        case 'PW':
            return <Trans id="PW">Palau</Trans>;
        case 'PS':
            return <Trans id="PS">Palestine, State of</Trans>;
        case 'PA':
            return <Trans id="PA">Panama</Trans>;
        case 'PG':
            return <Trans id="PG">Papua New Guinea</Trans>;
        case 'PY':
            return <Trans id="PY">Paraguay</Trans>;
        case 'PE':
            return <Trans id="PE">Peru</Trans>;
        case 'PH':
            return <Trans id="PH">Philippines</Trans>;
        case 'PN':
            return <Trans id="PN">Pitcairn</Trans>;
        case 'PL':
            return <Trans id="PL">Poland</Trans>;
        case 'PT':
            return <Trans id="PT">Portugal</Trans>;
        case 'PR':
            return <Trans id="PR">Puerto Rico</Trans>;
        case 'QA':
            return <Trans id="QA">Qatar</Trans>;
        case 'RE':
            return <Trans id="RE">R\u00e9union</Trans>;
        case 'RO':
            return <Trans id="RO">Romania</Trans>;
        case 'RU':
            return <Trans id="RU">Russian Federation</Trans>;
        case 'RW':
            return <Trans id="RW">Rwanda</Trans>;
        case 'BL':
            return <Trans id="BL">Saint Barth\u00e9lemy</Trans>;
        case 'SH':
            return <Trans id="SH">Saint Helena, Ascension and Tristan da Cunha</Trans>;
        case 'KN':
            return <Trans id="KN">Saint Kitts and Nevis</Trans>;
        case 'LC':
            return <Trans id="LC">Saint Lucia</Trans>;
        case 'MF':
            return <Trans id="MF">Saint Martin (French part)</Trans>;
        case 'PM':
            return <Trans id="PM">Saint Pierre and Miquelon</Trans>;
        case 'VC':
            return <Trans id="VC">Saint Vincent and the Grenadines</Trans>;
        case 'WS':
            return <Trans id="WS">Samoa</Trans>;
        case 'SM':
            return <Trans id="SM">San Marino</Trans>;
        case 'ST':
            return <Trans id="ST">Sao Tome and Principe</Trans>;
        case 'SA':
            return <Trans id="SA">Saudi Arabia</Trans>;
        case 'SN':
            return <Trans id="SN">Senegal</Trans>;
        case 'RS':
            return <Trans id="RS">Serbia</Trans>;
        case 'SC':
            return <Trans id="SC">Seychelles</Trans>;
        case 'SL':
            return <Trans id="SL">Sierra Leone</Trans>;
        case 'SG':
            return <Trans id="SG">Singapore</Trans>;
        case 'SX':
            return <Trans id="SX">Sint Maarten (Dutch part)</Trans>;
        case 'SK':
            return <Trans id="SK">Slovakia</Trans>;
        case 'SI':
            return <Trans id="SI">Slovenia</Trans>;
        case 'SB':
            return <Trans id="SB">Solomon Islands</Trans>;
        case 'SO':
            return <Trans id="SO">Somalia</Trans>;
        case 'ZA':
            return <Trans id="ZA">South Africa</Trans>;
        case 'GS':
            return <Trans id="GS">South Georgia and the South Sandwich Islands</Trans>;
        case 'SS':
            return <Trans id="SS">South Sudan</Trans>;
        case 'ES':
            return <Trans id="ES">Spain</Trans>;
        case 'LK':
            return <Trans id="LK">Sri Lanka</Trans>;
        case 'SD':
            return <Trans id="SD">Sudan</Trans>;
        case 'SR':
            return <Trans id="SR">Suriname</Trans>;
        case 'SJ':
            return <Trans id="SJ">Svalbard and Jan Mayen</Trans>;
        case 'SZ':
            return <Trans id="SZ">Swaziland</Trans>;
        case 'SE':
            return <Trans id="SE">Sweden</Trans>;
        case 'CH':
            return <Trans id="CH">Switzerland</Trans>;
        case 'SY':
            return <Trans id="SY">Syrian Arab Republic</Trans>;
        case 'TW':
            return <Trans id="TW">Taiwan, Province of China</Trans>;
        case 'TJ':
            return <Trans id="TJ">Tajikistan</Trans>;
        case 'TZ':
            return <Trans id="TZ">Tanzania, United Republic of</Trans>;
        case 'TH':
            return <Trans id="TH">Thailand</Trans>;
        case 'TL':
            return <Trans id="TL">Timor-Leste</Trans>;
        case 'TG':
            return <Trans id="TG">Togo</Trans>;
        case 'TK':
            return <Trans id="TK">Tokelau</Trans>;
        case 'TO':
            return <Trans id="TO">Tonga</Trans>;
        case 'TT':
            return <Trans id="TT">Trinidad and Tobago</Trans>;
        case 'TN':
            return <Trans id="TN">Tunisia</Trans>;
        case 'TR':
            return <Trans id="TR">Turkey</Trans>;
        case 'TM':
            return <Trans id="TM">Turkmenistan</Trans>;
        case 'TC':
            return <Trans id="TC">Turks and Caicos Islands</Trans>;
        case 'TV':
            return <Trans id="TV">Tuvalu</Trans>;
        case 'UG':
            return <Trans id="UG">Uganda</Trans>;
        case 'UA':
            return <Trans id="UA">Ukraine</Trans>;
        case 'AE':
            return <Trans id="AE">United Arab Emirates</Trans>;
        case 'GB':
            return <Trans id="GB">United Kingdom</Trans>;
        case 'US':
            return <Trans id="US">United States</Trans>;
        case 'UM':
            return <Trans id="UM">United States Minor Outlying Islands</Trans>;
        case 'UY':
            return <Trans id="UY">Uruguay</Trans>;
        case 'UZ':
            return <Trans id="UZ">Uzbekistan</Trans>;
        case 'VU':
            return <Trans id="VU">Vanuatu</Trans>;
        case 'VE':
            return <Trans id="VE">Venezuela, Bolivarian Republic of</Trans>;
        case 'VN':
            return <Trans id="VN">Viet Nam</Trans>;
        case 'VG':
            return <Trans id="VG">Virgin Islands, British</Trans>;
        case 'VI':
            return <Trans id="VI">Virgin Islands, U.S.</Trans>;
        case 'WF':
            return <Trans id="WF">Wallis and Futuna</Trans>;
        case 'EH':
            return <Trans id="EH">Western Sahara</Trans>;
        case 'YE':
            return <Trans id="YE">Yemen</Trans>;
        case 'ZM':
            return <Trans id="ZM">Zambia</Trans>;
        case 'ZW':
            return <Trans id="ZW">Zimbabwe</Trans>;
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

const AddJidCodeModal = ({open, handleClose}) => {
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
                    <Trans id="error.invalidCountryForRegion">The JID code looks incorrect. The country {countryCode} ({translatedCountryCode})
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
};

export const AddJidCodeButton = () => {
    const [open, setOpen] = useState(true);

    return <>
        <Button color="inherit" startIcon={<AddIcon/>} onClick={() => setOpen(true)}>
            <Trans>Add JID Code</Trans>
        </Button>
        <AddJidCodeModal open={open} handleClose={() => setOpen(false)}/>
    </>;
};
