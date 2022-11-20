import { useContext, useState } from "react";
import { GraphContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { styles } from './style'

export default function AddNodePage() {
  const navigate = useNavigate()
  const [specie, setSpecie] = useState('')
  const [habitSelected, setHabitSelected] = useState('Produtor')
  const habitOptions = [
    'Produtor', 'Consumidor Primario', 'Consumidor Secundário', 'Consumidor Terciário',
     'Consumidor Quartenário'
  ]

  const graph = useContext(GraphContext)

  function handleAddNode() {
    graph.insertNode(specie, habitSelected)
    navigate('/')
    
  }

  function disableSubmit() {
    return !specie || !habitSelected
  }


  return (
    <>
      <form onSubmit={handleAddNode} style={styles.optionsBlock}>
        <label>
          Espécie
          </label>
          <input
            style={styles.input}
            type="text"
            value={specie}
            onChange={(e) => setSpecie(e.target.value)}
          />
        <label>
          Nível Trófico
        </label>
          <select
            id="habits"
            name="habit"
            onChange={(e) => setHabitSelected(e.target.value)}
            value={habitSelected}
            style={styles.input}
          >
            {habitOptions.map(hab => <option key={hab} value={hab}>{hab}</option>)}
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
