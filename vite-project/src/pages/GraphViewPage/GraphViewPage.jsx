import { useEffect, useState } from 'react'
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext'

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

  useEffect(() => {
    setGraph(convertGraph(props.graph))
  }, [])

  return (
    <>
      {graph
      ?
      <ForceGraph3D
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
