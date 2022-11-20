import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styles } from './style';
import { Graph } from '../../../../src/graph/graphFoodWeb'
import GraphViewPage from '../GraphViewPage/GraphViewPage';
import { useContext } from 'react';
import { GraphContext } from '../../App';

export default function InitialPage(props) {
    const navigate = useNavigate();

    const graph = useContext(GraphContext);
    
    return (
        <div>
            <div style={styles.optionsBlock}>
                <div style={styles.option} onClick={() => navigate('/teia')}>
                    <h3>Ver teia alimentar</h3>
                </div>
                <div style={styles.option} onClick={() => navigate('/teia')}>
                    <h3>Pesquisar ligação</h3>
                </div>
                <div style={styles.option} onClick={() => navigate('/add-node')}>
                    <h3>Adicionar elemento</h3>
                </div>
                <div style={styles.option} onClick={() => navigate('/add-link')}>
                    <h3>Adicionar ligação</h3>
                </div>
            </div>
        </div>
    );
}