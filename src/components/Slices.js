import React, { Component } from 'react';
import { MosaicWindowContext } from 'react-mosaic-component';

class Slices extends Component {
    static contextTypes = MosaicWindowContext;
    context = MosaicWindowContext;

    render() {
        return (
            <div className="item">

            </div>
        );
    }
}

export default Slices;