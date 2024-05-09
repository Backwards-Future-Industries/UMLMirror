import { xClass } from "$lib/objects/xClass"

export function getScenario(from: xClass, to: xClass): number | undefined{
    
    let scenario: number | undefined = undefined
    
    if (to.getXMax() < from.x){ // from is on the left of to
        if (from.y < to.getYMax()){ // from is above to
            console.log('scenario -4')
            scenario = -4
        }else
        if (from.getYMax() > to.y){ //from is below to 
            console.log('scenario -2')
            scenario = -2
        }else{ // from must be beside to
            console.log('scenario 3')
            scenario = -3
        }
    }
    if (from.x > to.getXMax()){ // from is on the right of to
        if (from.y < to.getYMax()){ // from is above to
            console.log('scenario 2')
            scenario = 2
        }else
        if (from.getYMax() > to.y){ //from is below to 
            console.log('scenario 4')
            scenario = 4
        }else{ // from must be beside to
            console.log('scenario 3')
            scenario = 3
        }
    }
    if (from.getXMax() > to.x && from.x < to.getXMax()) { // I dont know
        if (from.y < to.getYMax()){ // from is above to
            console.log('scenario -1')
            scenario = -1
        }else
        if (from.getYMax() > to.y){ //from is below to 
            console.log('scenario 1')
            scenario = 1
        }else{ // they are touching
            console.log('they are touching')
            scenario = 0
        }
    }

    return scenario
}
