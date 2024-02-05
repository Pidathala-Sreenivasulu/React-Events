import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


const MultiSelectDropDownComponent = (props) => {
    const {
      data = [],
      label = '',
      placeholder = '',
      variant = 'standard',
      fullWidth = false,
      defaultValue  = [],
      onChangeAction=()=>{}
    } = props; 

    const [value, setValue]  =useState(defaultValue);

    useEffect(()=>{
       setValue(defaultValue)
    }, [defaultValue])

  return (
    <>
       <Autocomplete
        multiple
        options={data}
        getOptionLabel={(option) => option?.label}
        value={value || []}
        filterSelectedOptions
        selectOnFocus
        fullWidth={fullWidth}
        className='auto-complete-component'
        onChange={(_, newValue) => {
          setValue(newValue)
            onChangeAction(newValue)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant={variant}
            label={label}
            placeholder={placeholder}
          />
        )}
      />
    </>
  )
}

export default MultiSelectDropDownComponent