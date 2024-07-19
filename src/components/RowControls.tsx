import React from 'react';
import { RowControlsProps } from "../types";
import { castRowKey } from '../utils';
import'../styles.css';

const RowControls = (props: RowControlsProps) => {
  return (
    <ul className='photogrid--row__controls'>
      {castRowKey(props.rowKey) > 1 &&
        <li>
          <button 
            className="row__control move__row__up" 
            onClick={props.moveRowUp} 
            data-row={props.rowKey}
            dangerouslySetInnerHTML={{ __html: props.buttonArrows ? props.buttonArrows.up : '&#8593' }}
          />
        </li>
      }
      {castRowKey(props.rowKey) < props.rowCount &&
        <li>
          <button 
            className="row__control move__row__down" 
            onClick={props.moveRowDown} 
            data-row={props.rowKey}
            dangerouslySetInnerHTML={{ __html: props.buttonArrows ? props.buttonArrows.down : '&#8595' }}
          />
        </li>
      }
    </ul>
  );
};

export default RowControls;