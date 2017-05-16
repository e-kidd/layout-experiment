import React, {Component} from 'react';
import {Mosaic, MosaicWindow, RemoveButton} from 'react-mosaic-component';
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

const createToolbarControls = id => {
    if (id === 'grid') {
        return [];
    }
    return [<RemoveButton></RemoveButton>];
};

const createTile = id => (
    <MosaicWindow createNode={ () => 'new' }
                  title={id}
                  toolbarControls={createToolbarControls(id)}
                  draggable={ false }>
        { ELEMENT_MAP[id] }
    </MosaicWindow>
);

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

export const Sheet = (props) => (
    <div className="sheet">
        <Mosaic renderTile={ createTile } initialValue={ SHEET_CONFIG } />
    </div>
);

export default Sheet;
