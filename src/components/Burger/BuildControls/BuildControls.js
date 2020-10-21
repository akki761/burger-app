import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Meat', type: 'meat'},
    { label: 'Cheese', type: 'cheese'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((ctrl) => {
            return <BuildControl added={() => props.ingredientAdded(ctrl.type)}
                        removed={() => props.ingredientRemoved(ctrl.type)}
                    label={ctrl.label} key={ctrl.label} disabled={props.disabledInfo[ctrl.type]}/>
        })}
        <button className={classes.OrderButton} disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;