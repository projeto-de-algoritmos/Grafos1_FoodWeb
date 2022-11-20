import React from 'react';
import { styles } from './style';
import { useNavigate } from 'react-router-dom';

export default function Header(props) {
    const navigate = useNavigate();
    
    return (
        <div style={styles.header}>
            <h1 style={styles.goBack} onClick={() => navigate('/')} >{'<<'} Voltar</h1>
            <h1 style={styles.appName}>FoodWeb</h1>
            <h1 style={styles.appName}></h1>
        </div>
    );
}