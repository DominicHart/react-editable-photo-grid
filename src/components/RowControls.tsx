import React from 'react';
import { RowControlsProps } from "../types";

const RowControls: React.FC = (props: RowControlsProps) => {
  return (
    <ul className='row__controls'>
      {props.rowKey > 1 &&
        <li>
          <button className="row__control" onClick={props.moveRowUp} data-row={props.rowKey}>
            &#8593;
          </button>
        </li>
      }
      {props.rowKey < props.rowCount &&
        <li>
          <button className="row__control" onClick={props.moveRowDown} data-row={props.rowKey}>
            &#8595;
          </button>
        </li>
      }
    </ul>
  );
};

export default RowControls;