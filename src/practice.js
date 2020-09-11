require('dotenv').config();
const knex = require('knex');

// We are using knex to query a table data from our database
const knexInstance = knex({
    // what is the driver?
    client: 'pg',
    // what database are we connecting to?
    connection: process.env.DB_URL
});


function searchByProduceName(searchterm){
// toQuery returns a string of the query at its current state
const q1 = knexInstance.from('amazong_products')
    .select('product_id',"name","price","category")
    .where("name","iLike",`%${searchterm}%`)
    // returns the object outside of its string
    .first()
    .toQuery()
    // .then(result => {
    // console.log(result);
    // });
}

// searchByProduceName('holo');
// console.log(q1);

function paginateProducts(page){
    const productsPerPage = 10;
    const offset = productsPerPage * (page - 1);
    knexInstance
    .from('amazong_products')
    .select('product_id','name','price','category')
    .limit(productsPerPage)
    .offset(offset)
    .then(results => {
    console.log(results);
    })
}

// paginateProducts(2);
// console.log('knex and driver installed correctly');

function filterImages(){
    knexInstance
        .from('amazong_products')
        .select('product_id','name','price','category','image')
        .whereNotNull('image')
        .then(result => {
            console.log(result);
        })
}

// filterImages();

function mostPopularVideosForDays(days) {
    knexInstance
      .select('video_name', 'region')
      .count('date_viewed AS views')
      .where(
        'date_viewed',
        '>',
        knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
      )
      .from('whopipe_video_views')
      .groupBy('video_name', 'region')
      .orderBy([
        { column: 'region', order: 'ASC' },
        { column: 'views', order: 'DESC' },
      ])
      .then(result => {
        console.log(result)
      })
  }
  
  mostPopularVideosForDays(30)
