import React from 'react';
import { styles } from './style';

export default function Header(props) {
    return (
        <div style={styles.header}>
            <h1 style={styles.appName}>FoodWeb</h1>
        </div>
    );
}