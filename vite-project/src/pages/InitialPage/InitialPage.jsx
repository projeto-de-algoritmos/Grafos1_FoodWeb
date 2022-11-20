import React from 'react';
import { styles } from './style';

export default function InitialPage(props) {
    return (
        <>
            <div style={styles.optionsBlock}>
                <div>
                    <h3>Ver teia alimentar</h3>
                </div>
                <div>
                    <h3>Pesquisar ligação</h3>
                </div>
                <div>
                    <h3>Adicionar elemento</h3>
                </div>
                <div>
                    <h3>Adicionar ligação</h3>
                </div>
            </div>
        </>
    );
}