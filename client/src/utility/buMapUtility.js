function getColourFromRating(rating){
  if(rating === "poor" ){
    return "#ff5b4f";
  }
  if(rating === "fair" ){
    return "#ff8d38";
  }
  if(rating === "good" ){
    return "#ffd64e";
  }
  if(rating === "excellent" ){
    return "#7df289";
  }
  
}
export {getColourFromRating}