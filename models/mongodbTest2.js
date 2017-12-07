db.getCollection('neighborhoods').find({})

db.getCollection('test').find({})

mongoimport "C:\Users\libertycapped\Desktop\CODE\HOMEWORK\GroupProject3\project3-teamAmazon\models\restaurants.json" -c restaurants
mongoimport "C:\Users\libertycapped\Desktop\CODE\HOMEWORK\GroupProject3\project3-teamAmazon\models\neighborhoods.json" -c neighborhoods



db.restaurants.createIndex({ location: "2dsphere" })
db.neighborhoods.createIndex({ geometry: "2dsphere" })


// This query returns a document
db.restaurants.findOne()


db.neighborhoods.findOne({ geometry: { $geoIntersects: { $geometry: { type: "Point", coordinates: [ -73.93414657, 40.82302903 ] } } } })


//RETURN NUMBER OF ALL RESTUARANTS
var neighborhood = db.neighborhoods.findOne( { geometry: { $geoIntersects: { $geometry: { type: "Point", coordinates: [ -73.93414657, 40.82302903 ] } } } } )
db.restaurants.find( { location: { $geoWithin: { $geometry: neighborhood.geometry } } } ).count()


//SEARH ALL ITEMS WITHIN THIS NEIGHBORHOOD
var neighborhood = db.neighborhoods.findOne( { geometry: { $geoIntersects: { $geometry: { type: "Point", coordinates: [ -73.93414657, 40.82302903 ] } } } } )
db.restaurants.find( { location: { $geoWithin: { $geometry: neighborhood.geometry } } } )

//SEARCH WITHIN 5 miles
db.restaurants.find({ location:
   { $geoWithin:
      { $centerSphere: [ [ -73.93414657, 40.82302903 ], 5 / 3963.2 ] } } })

