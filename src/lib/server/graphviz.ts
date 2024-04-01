import { associationStoreObject } from '$lib/objects/associationStoreObject';
import { classStoreObject } from '$lib/objects/classStoreObject';
import {attribute as att, Digraph, Node, Edge, toDot,} from 'ts-graphviz';

export function prettify(classes:string, associations:string): string {
    const graph = new Digraph('G');
    
    let allClassesDick = classStoreObject.fromJSONString(classes);
    let allClasses = Object.values(allClassesDick);
    let allAssociations = associationStoreObject.fromJSONString(associations);

    allClasses.forEach((n) => {
        addNodes(graph, n);
    });
    allAssociations.forEach((e) => {
        addEdges(graph, e);
    });

    return toDot(graph);
}

function addNodes(graph:Digraph, classes:classStoreObject) {
    let node:Node = new Node(classes.getId(),{
        [att.width]: classes.width / 96,
        [att.height]: classes.height / 96,
    });
    graph.addNode(node);
}

function addEdges(graph:Digraph, association:associationStoreObject) {
    let node1 = graph.getNode(association.id1);
    let node2 = graph.getNode(association.id2);
    if (!node1 || !node2) {
        throw new Error('Node not found');
    }
    let edge:Edge = new Edge([node1, node2]);
    graph.addEdge(edge);
}