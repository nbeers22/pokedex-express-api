const app = require('./app.js');
const POKEDEX = require('./pokedex.json');

app.use(function validateBearerToken(req,res,next){
  const bearerToken = req.get('Authorization');
  const apiToken = process.env.API_TOKEN;

  if(!bearerToken){
    return res.status(401).json({
      error: 'Unauthorized request: Token must be passed as Authorization header'
    });
  }

  if(bearerToken.split("  ")[1] !== apiToken){
    return res.status(401).json({
      error: 'Unauthorized request: bad token'
    });
  }
  
  next();
});

function handleGetTypes(req,res){
  const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`];
  res.json(validTypes);
}

app.get('/types', handleGetTypes);

function handleGetPokemon(req,res){
  const { name, type } = req.query;

  if(name && type){
    console.log(name,type)
    const pokemonsNameType = POKEDEX.pokemon.filter( poke => (
      poke.name.toLowerCase().includes(name.toLowerCase()) && poke.type.includes(type)
    ));
    return res.json(pokemonsNameType)
  }else if(name){
    const pokemonsByName = POKEDEX.pokemon.filter( poke => (
      poke.name.toLowerCase().includes(name.toLowerCase())
    ));
    return res.json(pokemonsByName);
  }else if(type){
    const pokemonsByType = POKEDEX.pokemon.filter( poke => (
      poke.type.includes(type)
    ));
    return res.json(pokemonsByType);
  }
}

app.get('/pokemon', handleGetPokemon);

app.listen(4000, () => {
  console.log("Chillin' on port 4k...")
});