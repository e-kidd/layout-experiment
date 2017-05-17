import React, { Component } from 'react';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import _isNil from 'lodash/isNil';
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

        const onCogWheelClick = () => {
            alert("Open the options menu");
        }

        const additionalControls = [
            <button className="mosaic-default-control pt-button pt-minimal pt-icon-filter"
                    onClick={ onConfigPanelToggle }
                    key={ `${id}-configButton` }>
                Filter
            </button>
        ];

        const toolbarControls = [
            <button className="mosaic-default-control pt-button pt-minimal pt-icon-cog"
                    onClick={ onCogWheelClick }
                    key={ `${id}-cogWheel` } />
        ];

        return (
            <MosaicWindow createNode={ () => 'new' }
                          title={ id }
                          toolbarControls={ toolbarControls }
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
        const sheetEl = this.sheetRefs[sheetId];

        if (!_isNil(sheetEl.expandedElement)) {
            return;
        }

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
