export async function initDashboard(ctx,next){
    ctx.animals = await getAnimals()
    next()
}

async function getAnimals(){
    const response = await fetch(`http://localhost:3030/data/pets?sortBy=_createdOn%20desc&distinct=name`)
    const data = await response.json()
    if(!response.ok){
        throw new Error(data.message)
    }
    return data
}