import React, { Component } from 'react';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import Sheet from './Sheet';

const INITIAL_VIEW_STATE = {
    direction: 'column',
    splitPercentage: 50,
    first: "sheet1",
    second: "sheet2"
}

export class Canvas extends Component {
    constructor() {
        super();

        this.state = {
            layout: INITIAL_VIEW_STATE
        }

        this.sheetRefs = {};
    }

    static displayName = "Canvas"

    renderSheet = (id) => {
        const onConfigPanelToggle = () => {
            this.onConfigPanelToggle(id);
        }
        const additionalControls = [
            <button onClick={ onConfigPanelToggle } key={ `${id}-configButton` }>Filter</button>
        ];

        return (
            <MosaicWindow createNode={ () => 'new' }
                          title={ id }
                          toolbarControls={[]}
                          additionalControls={ additionalControls }>
                <Sheet id={ id }
                       ref={ el => this.setSheetRef(el, id) } />
            </MosaicWindow>
        );
    }

    setSheetRef = (el, id) => {
        this.sheetRefs[id] = el;
    }

    onConfigPanelToggle = (sheetId) => {
        const nextState = this.state;
        const sheetEl = this.sheetRefs[sheetId];

        sheetEl.toggleFilterPanel();
    }

    onLayoutChange = (nextLayout) => {
        this.setState({
            layout: nextLayout
        });
    }

    render() {
        return (
            <div className="canvas">
                <Mosaic renderTile={ this.renderSheet }
                        value={ this.state.layout }
                        onChange={ this.onLayoutChange } />
            </div>
        );
    }
};
