import React, { useRef } from 'react';
import TextField from '@material-ui/core/TextField';

export const Input = (props) => {
    const ref = useRef(null);

    const submit = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            if ((e.target as HTMLInputElement).value) {
                props.onPressEnter((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
            }
        }
    }

    return <TextField fullWidth id="outlined-basic" variant="outlined" 
            label="Текстовое поле" ref={ref} onChange={props.onChange} onKeyDown={submit} />;
}