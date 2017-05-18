import React, {Component} from 'react';
import { Mosaic, MosaicWindow, MosaicWindowContext } from 'react-mosaic-component';
import classnames from 'classnames';

import _cloneDeep from 'lodash/cloneDeep';
import _keys from 'lodash/keys';
import _isNil from 'lodash/isNil';
import _get from 'lodash/get';

import Rows from './Rows';
import Columns from './Columns';
import Grid from './Grid';
import Slices from './Slices';
import FilterPanel from './FilterPanel';

const COMPONENT_MAP = {
    rows: Rows,
    columns: Columns,
    slices: Slices,
    grid: Grid,
    filterPanel: FilterPanel
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
    second: 'columns'
};

const FILTER_PANEL_SUBTREE = {
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
    second: 'filterPanel'
}

class Sheet extends Component {
    constructor(props){
        super(props);

        this.state = {
            layout: INITIAL_LAYOUT,
            showFilterTile: false
        }

        this.elementMap = this.buildElementMap(props);
        this.refEls = {};
    }

    static displayName = "Sheet";
    static contextTypes = MosaicWindowContext;
    context = MosaicWindowContext;

    buildElementMap(props) {
        return _keys(COMPONENT_MAP).reduce((sum, key) => {
            var Component = COMPONENT_MAP[key];
            sum[key] = (
                <Component key={ `${key}-${this.props.id}` }
                           ref={ el => this.setRef(el, key) } />
            );
            return sum;
        }, {});
    }

    setRef(element, id) {
        this.refEls[id] = element;
    }

    createToolbarControls(id) {
        const controls = [];

        if (id === 'filterPanel') {
            controls.push(
                <button onClick={ (e) => this.toggleFilterPanel() }
                        key={ `${id}-closeFilterPanel` }
                        className="mosaic-default-control pt-button pt-minimal pt-icon-cross" />
            );
        } else if (id === 'grid') {
            const expandButton = (
                <button onClick={ (e) => this.expandElement(id) }
                        key={ `${id}-expand` }
                        className="mosaic-default-control pt-button pt-minimal pt-icon-maximize" />
            );

            const restoreButton = (
                <button onClick={ (e) => this.restoreElement() }
                        key={ `${id}-restore` }
                        className="mosaic-default-control pt-button pt-minimal pt-icon-minimize" />
            );

            controls.push(expandButton, restoreButton);
        }

        return controls;
    }

    expandElement(id) {
        // Only one element can be expanded at a time.
        if (this.expandedElement === id) {
            return;
        }

        this.expandedElement = id;
        this.lastSafeLayout = this.state.layout;

        const context = this.refEls[id].context;
        const path = context.getMosaicPath();
        const nextNode = _get(this.state.layout, path);
        const update = {
            path: [],
            spec: {
                splitPercentage: {
                    $set: 100
                },
                first: {
                    $set: nextNode
                }
            }
        }

        context.mosaicActions.updateTree([update]);
    }

    restoreElement() {
        if (!_isNil(this.lastSafeLayout)) {
            this.setState({ layout: this.lastSafeLayout });
        }

        this.expandedElement = null;
        this.lastSafeLayout = null;
    }

    getModuleClassName(id) {
        return classnames({
            'mosaic-window_horizontal': id === 'slices' || id === 'rows'
        });
    }

    createTile(id) {
        return (
            <MosaicWindow createNode={ () => 'new' }
                          title={ id }
                          className={ this.getModuleClassName(id) }
                          toolbarControls={ this.createToolbarControls(id) }
                          draggable={ false }>
                { this.elementMap[id] }
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
                <Mosaic renderTile={ this.createTile.bind(this) }
                        value={ this.state.layout }
                        onChange={ this.onLayoutChange } />
            </div> 
        )
    }
}

export default Sheet;
