import { useContext, useState } from "react";
import { GraphContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { styles } from './style'
import { Edge } from '../../../../src/graph/graphFoodWeb'

export default function AddLinkPage() {
  const navigate = useNavigate()
  
  const graph = useContext(GraphContext)
  const species = graph.adj.filter(node => node).map(node => {
    return {
      id: node.idx,
      label: node.specie
    }
  })
  species.sort()
  
  const [speciePredator, setSpeciePredator] = useState(0)
  const [speciePredated, setSpeciePredated] = useState(0)

  function handleAddEdge(e) {
    e.preventDefault()
    if (speciePredator === speciePredated) {
      alert('Uma espécie não pode predar ela mesmo')
      return
    }

    const edge = new Edge(speciePredator, speciePredated)
    graph.insertEdge(edge)
    navigate('/')
  }

  function disableSubmit() {
    return !speciePredator || !speciePredated
  }


  return (
    <>
      <form onSubmit={handleAddEdge} style={styles.optionsBlock}>
        <label>
          Espécie Predadora
        </label>
          <select
            id="predator"
            name="predator"
            onChange={(e) => setSpeciePredator(e.target.value)}
            value={speciePredator}
            style={styles.input}
          >
            {species.map(spec => <option key={spec.id} value={spec.id}>{spec.label}</option>)}
          </select>
        <label>
          Espécie Predada
        </label>
          <select
            id="predated"
            name="predated"
            onChange={(e) => setSpeciePredated(e.target.value)}
            value={speciePredated}
            style={styles.input}
          >
            {species.map(spec => <option key={spec.id} value={spec.id}>{spec.label}</option>)}
          </select>
        <input
          type="submit"
          value="Adicionar"
          disabled={disableSubmit()}
        />
      </form>
    </>
  )
}
