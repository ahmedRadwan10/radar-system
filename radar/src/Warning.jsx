import React from 'react';

const divStyles = {
    width: "70%",
    marginInline: "auto",
    border: "1px solid #032b3a",
    borderRadius: "5px",
    padding: "2em",
    fontSize: "1.2rem"
}

const spanStyles = {
    backgroundColor: "#032b3a",
    padding: "3px 10px",
    fontSize: "0.9rem",
    fontStyle: "italic",
    borderRadius: "5px",
    marginRight: "5px",
}

const Warning = () => {
    return (
        <div style={divStyles}>
            Due to Math calculations,
            This app require a <span style={spanStyles}>1440px </span>
            width screen and above.
        </div>
    );
}

export default Warning;