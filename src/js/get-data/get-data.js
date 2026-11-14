async function fetchJson(URL) {
    const response = await fetch(URL)
    return await response.json()
}

async function getMealsDataForSearchOrFilterOrRandom(URL) {
    const data = await fetchJson(URL)
    return data.results
}

async function getDataForOneMeal(URL) {
    const data = await fetchJson(URL)
    let mealDataResult = data.result

    const mealIngredents = mealDataResult.ingredients
    const ingredientArray = []
    for (const [, val] of Object.entries(mealIngredents)) {
        ingredientArray.push(`${val.measure} ${val.ingredient}`)
    }

    let perServing
    let totalWeight
    let servings

    for (let i = 0; i < 5; i++) {
        try {
            const mealNutrition = await getRecipeNutrition("https://nutriplan-api.vercel.app/api/nutrition/analyze", mealDataResult.name, ingredientArray)
            perServing = mealNutrition.data.perServing
            totalWeight = mealNutrition.data.totalWeight
            servings = mealNutrition.data.servings
            break
        } catch (error) {
            continue
        }
    }

    mealDataResult = {
        ...mealDataResult,
        "perServing": perServing,
        "totalWeight": totalWeight,
        "servings": servings
    }
    console.log(mealDataResult)
    return mealDataResult
}

async function getCategories(URL) {
    const data = await fetchJson(URL)
    return data.results
}

async function getAreas(URL) {
    const data = await fetchJson(URL)
    return data.results
}

async function getRecipeNutrition(URL, recipeName, ingredients) {
    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "QrG9KpDtQ8M6LjntfFkdpmhrrBfkddfBG7TNKDGn"
        },
        body: JSON.stringify({
            "recipeName": recipeName,
            "ingredients": ingredients
        })
    })
    // const nutrantData = await response.json()
    return await response.json()
}

async function products(URL) {
    const data = await fetchJson(URL)
    return data.results || data.result
}

function modalData(data) {
    const madalSmallData = {
        name: data.name,
        thumbnail: data.thumbnail,
        id: data.id,
        nutrients: {
            fat: data.perServing.fat,
            carbs: data.perServing.carbs,
            protein: data.perServing.protein,
            calories: data.perServing.calories
        }
    }
    return madalSmallData
}

export const getData = {
    mealsSearchOrFilterOrRandom: getMealsDataForSearchOrFilterOrRandom,
    oneMeal: getDataForOneMeal,
    categories: getCategories,
    areas: getAreas,
    products: products,
    modalData: modalData
}