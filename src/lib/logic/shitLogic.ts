import { xClass } from "$lib/objects/xClass"

let from: xClass = new xClass('2')
let to: xClass = new xClass('1')


if (from.getXMax() < to.x){ // class2 are on the right of class1
    if (from.y < to.getYMax()){ // class2 are above class1
        console.log('right1')
    }else
    if (from.getYMax() > to.y){ //class2 are below class1 
        console.log('right2')
    }else{ // class2 must be beside class1
        console.log('right3')
    }
}
if (from.x > to.getXMax()){ // class2 are on the left of class1
    if (from.y < to.getYMax()){ // class2 are above class1
        console.log('left1')
    }else
    if (from.getYMax() > to.y){ //class2 are below class1 
        console.log('left2')
    }else{ // class2 must be beside class1
        console.log('left2')
    }
}
if (from.getXMax() > to.x && from.x < to.getXMax()) { // I dont know
    if (from.y < to.getYMax()){ // class2 are above class1
        console.log('scenario1')
    }else
    if (from.getYMax() > to.y){ //class2 are below class1 
        console.log('scenario1')
    }else{ // they are touching
        console.log('they are touching')
    }
}