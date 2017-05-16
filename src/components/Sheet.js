import React from 'react';
import {Mosaic, MosaicWindow} from 'react-mosaic-component';
import HideButton from './buttons/HideButton';
import Rows from './Rows';
import Columns from './Columns';
import Grid from './Grid';
import Slices from './Slices';
import ConfigWheel from './ConfigWheel';

const ELEMENT_MAP = {
    rows: <Rows/>,
    columns: <Columns/>,
    slices: <Slices/>,
    grid: <Grid/>,
    configWheel: <ConfigWheel/>
};

const SHEET_CONFIG = {
    direction: 'row',
    splitPercentage: 80,
    first: {
        direction: 'column',
        splitPercentage: 10,
        first: 'slices',
        second: {
            direction: 'column',
            splitPercentage: 88.89,
            first: 'grid',
            second: 'rows'
        }
    },
    second: {
        direction: 'column',
        splitPercentage: 90,
        first: 'columns',
        second: 'configWheel'
    }
}

const createToolbarControls = (id) => {
    if (id === 'grid') {
        return [<HideButton></HideButton>];
    }
    return [<HideButton></HideButton>];
};

const createTile = (id) => {
    return (
        <MosaicWindow createNode={ () => 'new' }
                      title={id}
                      toolbarControls={createToolbarControls(id)}
        >
            {ELEMENT_MAP[id]}
        </MosaicWindow>);
}

class Sheet extends React.Component {
    render() {
        return (<div className="sheet">
            <Mosaic renderTile={ createTile } initialValue={ SHEET_CONFIG } />
        </div>);
    }
}

Sheet.displayName = "Sheet";



export default Sheet;
