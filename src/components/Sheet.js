import React, {Component} from 'react';
import {Mosaic, MosaicWindow, RemoveButton} from 'react-mosaic-component';
import _cloneDeep from 'lodash/cloneDeep'
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
    configWheel: <ConfigWheel/>,
    filterPanel: () => (<div>Filter Panel</div>)
};

const INITIAL_LAYOUT = {
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
};

const FILTER_PANEL_SUBTREE = {
    direction: 'row',
    splitPercentage: 70,
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
    second: 'filterPanel'
}

class Sheet extends Component {
    constructor(){
        super();

        this.state = {
            layout: INITIAL_LAYOUT,
            showFilterTile: false
        }
    }

    createToolbarControls(id) {
        if (id === 'grid') {
            return [];
        }

        return [<RemoveButton key="button1"></RemoveButton>];
    }

    createTile = (id) => {
        return (
            <MosaicWindow createNode={ () => 'new' }
                          title={ id }
                          toolbarControls={ this.createToolbarControls(id) }
                          draggable={ false }>
                { ELEMENT_MAP[id] }
            </MosaicWindow>
        );
    }

    toggleFilterPanel() {
        let nextLayout = _cloneDeep(INITIAL_LAYOUT);

        if (!this.state.showFilterTile) {
            nextLayout.first = FILTER_PANEL_SUBTREE;
        }

        this.setState({
            showFilterTile: !this.state.showFilterTile,
            layout: Object.assign({}, nextLayout)
        })
    }

    onLayoutChange = (nextLayout) => {
        this.setState({
            layout: nextLayout
        });
    }

    render() {
        return (
            <div className="sheet">
                <Mosaic renderTile={ this.createTile }
                        value={ this.state.layout }
                        onChange={ this.onLayoutChange } />
            </div> 
        )
    }
}

export default Sheet;
