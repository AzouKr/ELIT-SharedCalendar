const customStyles = {
    control: (styles) => ({ 
        ...styles, 
        "max-height":"70px",
        "overflow-y":"auto",
        "border": "1px solid #332FD0",
        "border-radius": "12px",
        "background-color": "#332FD0", 
    }),

    multiValue: (styles) => ({ 
        ...styles, 
        "background-color": "white", 
        "border-radius": "12px",
        "font-weight": "bold",
    }),
    input: (styles) => ({ 
        ...styles, 
        "color": "white", 
        "font-weight": "bold",
    }),
    placeholder: (styles) => ({ 
        ...styles, 
        "color": "white", 
        "font-weight": "bold",
    }),
    dropdownIndicator: (styles) => ({ 
        ...styles, 
        "color": "white", 
        "font-weight": "bold",
    }),
    clearIndicator: (styles) => ({ 
        ...styles, 
        "color": "white", 
        "font-weight": "bold",
    }),

    
}

export default customStyles;