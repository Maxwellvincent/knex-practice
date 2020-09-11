require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
    // what is the driver?
    client: 'pg',
    // what database are we connecting to?
    connection: process.env.DB_URL
});

function getAllItems(searchTerm){
    knexInstance
        .from('shopping_list')
        .select('name','price','category','checked','date_added')
        .where('name','Ilike', `%${searchTerm}%`)
        .then(results => {
            console.log(results)
        })
}
// getAllItems('burger');

function paginateItems(page){
    const productsPerPage = 10;
    const offset = productsPerPage * (page - 1);

    knexInstance
        .from('shopping_list')
        .select('name','price','category','checked','date_added')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

// paginateItems(3);

function itemsAfterDate(daysAgo){
    knexInstance
        .from('shopping_list')
        .select('name','price','category','checked','date_added')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .then(result => {
            console.log(result)
        })
}

// itemsAfterDate(10)

function costPerCategory() {
    knexInstance
      .select('category')
      .sum('price as total')
      .from('shopping_list')
      .groupBy('category')
      .then(result => {
        console.log('COST PER CATEGORY')
        console.log(result)
      })
  }
  
  costPerCategory()
