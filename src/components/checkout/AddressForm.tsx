import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, FormHelperText, FormLabel, Grid, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import { styled } from '@mui/system';
import { AddressDetails } from '../../types/types';
import { useEffect, useState } from 'react';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

const AddressForm: React.FC<{ addressDetails: AddressDetails, setAddressDetails: React.Dispatch<React.SetStateAction<AddressDetails>>, errorForm: AddressDetails }> = ({ addressDetails, setAddressDetails, errorForm }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddressDetails({ ...addressDetails, [name]: value });
    };

    return (
        <Grid container spacing={2}>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="firstName" required>
                    First name
                </FormLabel>
                <OutlinedInput
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    autoComplete="first name"
                    type="name"
                    value={addressDetails.firstName}
                    onChange={handleChange}
                    error={!!errorForm.firstName}
                    required
                />
                {!!errorForm.firstName && (
                    <FormHelperText error id="accountId-error">
                        {errorForm.firstName}
                    </FormHelperText>
                )}
            </FormGrid>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="lastName" required>
                    Last name
                </FormLabel>
                <OutlinedInput
                    id="lastName"
                    name="lastName"
                    type="lastName"
                    value={addressDetails.lastName}
                    placeholder="Snow"
                    autoComplete="last name"
                    onChange={handleChange}
                    error={!!errorForm.lastName}
                    required
                />
                {!!errorForm.lastName && (
                    <FormHelperText error id="accountId-error">
                        {errorForm.lastName}
                    </FormHelperText>
                )}
            </FormGrid>
            <FormGrid item xs={12}>
                <FormLabel htmlFor="email" required>
                    Email
                </FormLabel>
                <OutlinedInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={addressDetails.email}
                    onChange={handleChange}
                    error={!!errorForm.email}
                    required
                />
                {!!errorForm.email && (
                    <FormHelperText error id="accountId-error">
                        {errorForm.email}
                    </FormHelperText>
                )}
            </FormGrid>
            <FormGrid item xs={6}>
                <FormLabel htmlFor="city" required>
                    City
                </FormLabel>
                <OutlinedInput
                    id="city"
                    name="city"
                    type="city"
                    placeholder="Łódz"
                    autoComplete="City"
                    value={addressDetails.city}
                    onChange={handleChange}
                    error={!!errorForm.city}
                    required
                />
                {!!errorForm.city && (
                    <FormHelperText error id="accountId-error">
                        {errorForm.city}
                    </FormHelperText>
                )}
            </FormGrid>
            <FormGrid item xs={6}>
                <FormLabel htmlFor="phoneNumber" required>
                    Phone Number
                </FormLabel>
                <OutlinedInput
                    id="phoneNumber"
                    name="phoneNumber"
                    type="phone"
                    placeholder="123456789"
                    autoComplete="Phone"
                    value={addressDetails.phoneNumber}
                    onChange={handleChange}
                    error={!!errorForm.phoneNumber}
                    required
                />
                {!!errorForm.phoneNumber && (
                    <FormHelperText error id="accountId-error">
                        {errorForm.phoneNumber}
                    </FormHelperText>
                )}
            </FormGrid>
            <FormGrid item xs={12}>
                <FormLabel htmlFor="street" required>
                    Street
                </FormLabel>
                <OutlinedInput
                    id="street"
                    name="street"
                    type="street"
                    placeholder="street"
                    autoComplete="street"
                    value={addressDetails.street}
                    onChange={handleChange}
                    error={!!errorForm.street}
                    required
                />
                {!!errorForm.street && (
                    <FormHelperText error id="accountId-error">
                        {errorForm.street}
                    </FormHelperText>
                )}
            </FormGrid>
            <FormGrid item xs={6}>
                <FormLabel htmlFor="postalCode" required>
                    Zip / Postal code
                </FormLabel>
                <OutlinedInput
                    id="postalCode"
                    name="postalCode"
                    type="postalCode"
                    placeholder="91-474"
                    value={addressDetails.postalCode}
                    onChange={handleChange}
                    error={!!errorForm.postalCode}
                    autoComplete="shipping postal-code"
                    required
                />
                {!!errorForm.postalCode && (
                    <FormHelperText error id="accountId-error">
                        {errorForm.postalCode}
                    </FormHelperText>
                )}
            </FormGrid>
            <FormGrid item xs={6}>
                <FormLabel htmlFor="houseNumber" required>
                    House Number
                </FormLabel>
                <OutlinedInput
                    id="houseNumber"
                    name="houseNumber"
                    type="houseNumber"
                    placeholder="House Number"
                    value={addressDetails.houseNumber}
                    onChange={handleChange}
                    error={!!errorForm.houseNumber}
                    required
                />
                {!!errorForm.houseNumber && (
                    <FormHelperText error id="accountId-error">
                        {errorForm.houseNumber}
                    </FormHelperText>
                )}
            </FormGrid>
            <FormGrid item xs={6}>
                <FormLabel htmlFor="service" required>
                    Service
                </FormLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={addressDetails.service}
                    label="Age"
                    onChange={(event: SelectChangeEvent) => {
                        setAddressDetails((prevState) => ({
                            ...prevState,
                            service: event.target.value as string
                        }))
                    }}
                >
                    <MenuItem value={'INPOST'}>INPOST</MenuItem>
                    <MenuItem value={'DPD'}>DPD</MenuItem>
                </Select>
            </FormGrid>
        </Grid>
    )
}

export default AddressForm;