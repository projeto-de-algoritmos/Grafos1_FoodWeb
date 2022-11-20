import React, { useState, useContext } from 'react';
import { GraphContext } from '../../App';
import { styles } from './style';

export default function SearchEdgePage(props) {
    const graph = useContext(GraphContext)
    const species = graph.adj.filter(node => node).map(node => {
        return {
            id: node.idx,
            label: node.specie
        }
    })
    species.sort()

    const [specie, setSpecie] = useState(0)
    const [specie2, setSpecie2] = useState(0)
    const [edge, setEdge] = useState(null)

    function handleSearchNode(e) {
        e.preventDefault()
        setEdge(graph.dfs1(specie, specie2))
        console.log(edge, specie, specie2)
    }

    function disableSubmit() {
        return specie === specie2
    }

    return (
        <>
            <form onSubmit={handleSearchNode} style={styles.optionsBlock}>
                <label>
                    Espécie 1
                </label>
                <select
                    id="specie1"
                    name="specie1"
                    onChange={(e) => setSpecie(e.target.value)}
                    value={specie}
                    style={styles.input}
                >
                    {species.map(hab => <option key={hab.id} value={hab.id}>{hab.label}</option>)}
                </select>
                <label>
                    Espécie 2
                </label>
                <select
                    id="specie2"
                    name="specie1"
                    onChange={(e) => setSpecie2(e.target.value)}
                    value={specie2}
                    style={styles.input}
                >
                    {species.map(hab => <option key={hab.id} value={hab.id}>{hab.label}</option>)}
                </select>
                <input
                    type="submit"
                    value="Adicionar"
                    disabled={disableSubmit()}
                />
            </form>

            {edge !== null &&
                <div style={styles.optionsBlock}>
                    <h3>Resultado</h3>
                    {edge ?
                        <p>A Espécie {species[specie2].label} está na cadeia de consumo da Espécie {species[specie].label}</p>
                        : 
                        <p>A Espécie {species[specie2].label} não está na cadeia de consumo da Espécie {species[specie].label}</p>
                    }
                </div>
            }
        </>
    );
}