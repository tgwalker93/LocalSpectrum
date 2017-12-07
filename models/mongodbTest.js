db.getCollection('items').find({ 
                        $text: { $search: "gfbdgfnfbb" }, 
                        'geometry.coordinates': {
                            $geoWithin: {
                                $center: [[-117.735515, 33.653131], 50000000000000000000000000000000000000000000]
                                }
                 
                                     
                            }})
  
                            
 db.getCollection('items').find(
    $text: { $search: "gfbdgfnfbb" }
   { geometry: { $geoWithin: { $center: [ [-117.735515, 33.653131], 1000] } } }
)                   
               
     db.getCollection('items').find({ 
            $text: { $search: "aa" }
         })
         
//SEARCH WITHIN 5 miles
db.getCollection('items').find({ 'geometry.coordinates':
   { $geoWithin:
      { $centerSphere: [ [-117.735515, 33.653131], 5 / 3963.2 ] } } })
      
      
      
 //NEAR
 db.getCollection('items').find({
     $text: { $search: "gfbdgfnfbb" },
     'geometry.coordinates': {
     $near : {
      $geometry : {   
         index : "Point" ,
         coordinates : [-117.735515, 33.653131]
        },
     $maxDistance : 100
    }
}
    
});

         
use SearchList
db.getCollection('items').find({ 
    "geometry.coordinates.0" : -117.735515, 
    "geometry.coordinates.1" : 33.653131
}, { 
    "itemName" : 1.0, 
    "properties.itemName" : 1.0
});
        
               
                            
                            