module.exports=class ApiFeatures{
constructor(query,queryObj){
    this.query=query;
    this.queryObj=queryObj
}
filter(){
    // the fields that should not enter into filtering process
    const excluded=["page","limit","field","sort"]

    // excluded fields gets deleted 
   excluded.forEach(q=>delete this.queryObj[q])
   let queryStr=JSON.stringify(this.queryObj)

//    replacing the query as we use in db
   queryStr=queryStr.replace(
    /\b(gte|gt|lte|lt|eq)\b/g,
    (match) => `$${match}`
  );
  this.query=this.query.find(JSON.parse(queryStr))

  // returning this to chain the methods for other features like sorting etc  
  return this
}
sort(){
    return this
}
}