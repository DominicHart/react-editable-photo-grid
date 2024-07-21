import React from 'react';

type props = {
    value: string;
    onClick: (value: string, checked: boolean) => void;
    checked: boolean;
}

const Checkbox = (props: props) => {
    const toggleCheckbox = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();
        if (props.checked) {
            props.onClick(props.value, false);
        } else {
            props.onClick(props.value, true);
        }
    }

    return (
        <div 
            className={props.checked ? "photogrid--checkbox active" : "photogrid--checkbox"} 
            onClick={toggleCheckbox} 
        />
    );
}

export default Checkbox;