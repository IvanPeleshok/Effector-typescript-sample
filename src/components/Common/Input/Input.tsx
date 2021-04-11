import React, { useRef } from 'react';
import TextField from '@material-ui/core/TextField';

interface IInput {
    onSubmit: (val: string) => void;
    onChange?: (val: string) => string;
    
    label?: string;
}

export const Input = (props: IInput) => {
    const ref = useRef(null);

    const submit = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            if ((e.target as HTMLInputElement).value) {
                props.onSubmit((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
            }
        }
    }

    return (
        <TextField fullWidth id="outlined-basic" variant="outlined"
            label={props.label ?? 'Текстовое поле'} ref={ref} onKeyDown={submit} />
    )
}