import { useEffect, useState, useContext } from 'react'
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext'
import { GraphContext } from '../../App';

function convertGraph(g) {
  console.log(g)
  let nodes = g.adj.filter(node => node)
  const links = []
  nodes.forEach(node => {
    let nextNode = node.next
    while(nextNode) {
      links.push({
        source: node.specie,
        target: g.adj[nextNode.idx].specie
      })
      
      nextNode = nextNode.next
    }
  })

  nodes = nodes.map(node => {
    return { id: node.specie, group: node.habit } 
  })

  return { nodes, links }
}

export default function GraphViewPage(props) { //props.graph
  const [graph, setGraph] = useState(null)
  const propsGraph = useContext(GraphContext);

  useEffect(() => {
    setGraph(convertGraph(propsGraph))
  }, [])

  return (
    <>
      {graph
      ?
      <ForceGraph3D
        style={{maxWidth: '100%'}}
        graphData={graph}
        nodeAutoColorBy="group"
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.25}
        nodeThreeObject={node => {
          const sprite = new SpriteText(node.id);
          sprite.color = node.color;
          sprite.textHeight = 8;
          return sprite;
        }}
      />
      : <div>
          <span>Grafo vazio</span>
        </div>
        }
    </>
  )

}
