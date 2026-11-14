const categoryStyles = {
    Beef: {
        icon: "fa-cow",
        categoryCard: "bg-gradient-to-br from-red-50 to-rose-50 border-red-200 hover:border-red-400",
        iconBg: "bg-gradient-to-br from-red-400 to-rose-500"
    },

    Chicken: {
        icon: "fa-drumstick-bite",
        categoryCard: "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 hover:border-amber-400",
        iconBg: "bg-gradient-to-br from-amber-400 to-orange-500"
    },

    Dessert: {
        icon: "fa-cake-candles",
        categoryCard: "bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200 hover:border-pink-400",
        iconBg: "bg-gradient-to-br from-pink-400 to-rose-500"
    },

    Lamb: {
        icon: "fa-bone",
        categoryCard: "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 hover:border-orange-400",
        iconBg: "bg-gradient-to-br from-orange-400 to-amber-500"
    },

    Miscellaneous: {
        icon: "fa-bowl-rice",
        categoryCard: "bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200 hover:border-slate-400",
        iconBg: "bg-gradient-to-br from-slate-400 to-gray-500"
    },

    Pasta: {
        icon: "fa-bowl-food",
        categoryCard: "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 hover:border-yellow-400",
        iconBg: "bg-gradient-to-br from-yellow-400 to-amber-500"
    },

    Pork: {
        icon: "fa-bacon",
        categoryCard: "bg-gradient-to-br from-rose-50 to-red-50 border-rose-200 hover:border-rose-400",
        iconBg: "bg-gradient-to-br from-rose-400 to-red-500"
    },

    Seafood: {
        icon: "fa-fish",
        categoryCard: "bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 hover:border-cyan-400",
        iconBg: "bg-gradient-to-br from-cyan-400 to-blue-500"
    },

    Side: {
        icon: "fa-plate-wheat",
        categoryCard: "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-400",
        iconBg: "bg-gradient-to-br from-green-400 to-emerald-500"
    },

    Starter: {
        icon: "fa-utensils",
        categoryCard: "bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200 hover:border-teal-400",
        iconBg: "bg-gradient-to-br from-teal-400 to-cyan-500"
    },

    Vegan: {
        icon: "fa-leaf",
        categoryCard: "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 hover:border-emerald-400",
        iconBg: "bg-gradient-to-br from-emerald-400 to-green-500"
    },

    Vegetarian: {
        icon: "fa-seedling",
        categoryCard: "bg-gradient-to-br from-lime-50 to-green-50 border-lime-200 hover:border-lime-400",
        iconBg: "bg-gradient-to-br from-lime-400 to-green-500"
    },

    Breakfast: {
        icon: "fa-egg",
        categoryCard: "bg-gradient-to-br from-sky-50 to-indigo-50 border-sky-200 hover:border-sky-400",
        iconBg: "bg-gradient-to-br from-sky-400 to-indigo-500"
    },

    Goat: {
        icon: "fa-horse",
        categoryCard: "bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200 hover:border-violet-400",
        iconBg: "bg-gradient-to-br from-violet-400 to-purple-500"
    }
}
const ingredientsGrid = document.querySelector("#ingredients-grid")
const instructionsGrid = document.querySelector("#instructions-grid")

const ingredientTemplate = document.querySelector("#ingredients-grid").firstElementChild
const instructionTemplate = document.querySelector("#instructions-grid").firstElementChild

const ingredientCount = document.querySelector("[data-field='items-count']")

export function fillAreaOneAtime(element, oneArea) {
    element.dataset.field = oneArea.name
    element.textContent = oneArea.name
    return element
}

export function fillCategoryOneAtime(element, oneCategory) {
    element.dataset.category = oneCategory.name
    const style = categoryStyles[element.dataset.category]
    element.classList.add(...style[element.dataset.field].split(" "))
    const eleFields = element.querySelectorAll("[data-field]")
    for (const eleField of eleFields) {
        switch (eleField.dataset.field) {
            case "text":
                element.querySelector("[data-field='text']").textContent = oneCategory.name
                break
            case "icon":
                eleField.classList.add("fa-solid", ...style.icon.split(" "))
                break
            default:
                eleField.classList.add(...style[eleField.dataset.field].split(" "))
        }
    }
    return element
}

export function fillMealsOneAtime(element, oneMeal) {
    const eleFields = element.querySelectorAll("[data-field]")
    element.dataset.mealId = oneMeal.id
    for (const eleField of eleFields) {
        switch (eleField.dataset.field) {
            case "thumbnail":
                eleField.src = oneMeal[eleField.dataset.field]
                break
            default:
                eleField.lastChild.textContent = oneMeal[eleField.dataset.field] || "N/A"
        }
    }
    return element
}


export function renderAreas(fillFunction, templateEle, fillGrid, fillingData) {
    const fragment = document.createDocumentFragment()
    for (const row of fillingData) {
        fragment.appendChild(fillFunction(templateEle.cloneNode(true), row))
    }
    fillGrid.appendChild(fragment)
}

export function renderCategories(fillFunction, templateEle, fillGrid, fillingData) {
    const fragment = document.createDocumentFragment()
    for (const row of fillingData) {
        fragment.appendChild(fillFunction(templateEle.cloneNode(true), row))
    }
    fillGrid.replaceChildren()
    fillGrid.appendChild(fragment)
}

export function renderMeals(fillFunction, templateEle, fillGrid, fillingData, recipesCountHolder) {
    recipesCountHolder.textContent = `Showing ${fillingData.length >= 25 ? "25" : fillingData.length} recipes`
    const fragment = document.createDocumentFragment()
    for (const row of fillingData) {
        fragment.appendChild(fillFunction(templateEle.cloneNode(true), row))
    }
    fillGrid.replaceChildren()
    fillGrid.appendChild(fragment)
}

export function renderOneMeal(fillingData) {
    const {
        ingredients,
        instructions,
    } = fillingData
    const serving = document.querySelector("#hero-servings")
    serving.textContent = `Total: ${fillingData.servings} cal`
    const img = document.querySelector("#meal-details img")
    const iframe = document.querySelector("#meal-details iframe")

    img.src = fillingData.thumbnail
    iframe.src = fillingData.youtube.replace("watch?v=", "embed/")

    const dataFields = document.querySelector("#meal-details").querySelectorAll("[data-field]")

    for (const field of dataFields) {
        switch (field.dataset.field) {
            case "totalWeight":
                field.textContent = `Total: ${fillingData.totalWeight} cal`
                break
            case "servings":
                field.textContent = (fillingData[field.dataset.field] || "N?A") + " servings"
                break
            case "ingredients":
                ingredientsRender(fillIngredientsOneAtime, ingredientTemplate, ingredientsGrid, ingredients)
                break
            case "instructions":
                instructionsReander(fillInstructionsOneAtime, instructionTemplate, instructionsGrid, instructions)
                break
            case "tag":
                field.textContent = fillingData.tags[0] || field.remove()
                break
            case "items-count":
                field.textContent = ingredients.length + " items"
                break
            default:
                field.textContent = fillingData[field.dataset.field] || "N?A"
        }
    }
    const dataServings = document.querySelector("#meal-details").querySelectorAll("[data-perServing]")
    const totals = {
        carbs: fillingData.perServing.carbs,
        fat: fillingData.perServing.fat,
        fiber: fillingData.perServing.fiber,
        protein: fillingData.perServing.protein,
        saturatedFat: fillingData.perServing.saturatedFat,
        sugar: fillingData.perServing.sugar
    }
    const totalsSum = Object.values(totals).reduce((returns, current) => returns + current)
    for (const field of dataServings) {
        switch (field.dataset.perserving) {
            case "soloCalories":
                field.textContent = fillingData.perServing.calories || "0"
                break
            case "calories":
                field.textContent = (fillingData.perServing[field.dataset.perserving] || "0") + " cal/serving"
                break
            case "sodium":
            case "cholesterol":
                field.textContent = (fillingData.perServing[field.dataset.perserving] || "0") + " mg"
                break
            default:
                field.textContent = (fillingData.perServing[field.dataset.perserving] || "0") + " g"
                const progress = fillingData.perServing[field.dataset.perserving] / totalsSum * 100
                const bar = document.querySelector("[data-bar='" + field.dataset.perserving + "']")

                bar.style.width = `${progress}%`
                console.log(bar, progress)
        }
    }
}

function ingredientsRender(fillFunction, templateEle, fillGrid, ingredients) {
    const fragment = document.createDocumentFragment()
    ingredientCount.textContent = ingredients.length + " items"
    for (const ingredient of ingredients) {
        fragment.appendChild(fillFunction(templateEle.cloneNode(true), ingredient))
    }
    fillGrid.replaceChildren()
    fillGrid.appendChild(fragment)
}

function instructionsReander(fillFunction, templateEle, fillGrid, instructions) {
    const fragment = document.createDocumentFragment()
    let skip = 0
    for (const instructionKey in instructions) {
        if (instructions[instructionKey].length <= 1) { skip += 1; continue }
        const instruction = {
            "index": +instructionKey + 1 - skip,
            "phrase": instructions[instructionKey]
        }
        fragment.appendChild(fillFunction(templateEle.cloneNode(true), instruction))
    }
    fillGrid.replaceChildren()
    fillGrid.appendChild(fragment)
}

function fillIngredientsOneAtime(element, oneIngrediant) {
    const eleFields = element.querySelectorAll("[data-ingredient]")
    for (const eleField of eleFields) {
        eleField.lastChild.textContent = oneIngrediant[eleField.dataset.ingredient] + "  " || "N/A"
    }
    return element
}

function fillInstructionsOneAtime(element, oneInstruction) {
    const eleFields = element.querySelectorAll("[data-instruction]")
    for (const eleField of eleFields) {
        eleField.lastChild.textContent = oneInstruction[eleField.dataset.instruction] || "N/A"
    }
    return element
}

export function fillProductsOneAtime(element, oneProduct) {
    const eleFields = element.querySelectorAll("[data-field]")
    const eleFieldsNutrients = element.querySelectorAll("[data-nutrients]")
    element.dataset.barcode = oneProduct.barcode
    for (const eleField of eleFields) {
        switch (eleField.dataset.field) {
            case "image":
                eleField.src = oneProduct[eleField.dataset.field]
                break
            case "novaGroup":
                eleField.title = "NOVA " + oneProduct[eleField.dataset.field]
                eleField.lastChild.textContent = oneProduct[eleField.dataset.field] || "-"
                break
            default:
                eleField.lastChild.textContent = oneProduct[eleField.dataset.field] || "N/A"
        }
    }
    for (const eleField of eleFieldsNutrients) {
        switch (eleField.dataset.nutrients) {
            default:
                const gram = oneProduct.nutrients[eleField.dataset.nutrients].toFixed(1)
                eleField.textContent = (+gram == 0 ? 0 : gram)
        }
    }
    return element
}

export function renderProducts(fillFunction, templateEle, fillGrid, fillingData) {
    const fragment = document.createDocumentFragment()
    try {
        for (const row of fillingData) {
            fragment.appendChild(fillFunction(templateEle.cloneNode(true), row))
        }
    } catch (error) {
        console.log(fillingData)
        fragment.appendChild(fillFunction(templateEle.cloneNode(true), fillingData))
    }
    fillGrid.replaceChildren()
    fillGrid.appendChild(fragment)
}

export function fillLogMealModal(meal, modal, mealServingsCount) {
    const eleFields = modal.querySelectorAll("[data-field]")
    const eleFieldsNutrients = modal.querySelectorAll("[data-nutrients]")
    const eleId = modal.querySelector("[data-id]")
    eleId.dataset.id = meal.id
    for (const eleField of eleFields) {
        switch (eleField.dataset.field) {
            case "thumbnail":
                eleField.src = meal[eleField.dataset.field]
                break
            default:
                eleField.lastChild.textContent = meal[eleField.dataset.field] || "N/A"
        }
    }
    for (const eleField of eleFieldsNutrients) {
        switch (eleField.dataset.nutrients) {
            default:
                const gram = meal.nutrients[eleField.dataset.nutrients].toFixed(1)
                eleField.textContent = gram * mealServingsCount.value
        }
    }
}

export function fillProductDetailModal(product, modal) {
    const eleFields = modal.querySelectorAll("[data-field]")
    const eleFieldsNutrients = modal.querySelectorAll("[data-nutrients]")
    const eleBarcode = modal.querySelector("[data-barcode]")
    const modalBars = modal.querySelectorAll("[data-bar]")
    console.log(modalBars)
    console.log("Modal:", modal)
    console.log("Modal ID:", modal.id)
    console.log("Bars:", modal.querySelectorAll("[data-bar]").length)
    for (const eleField of modalBars) {
        console.log("cat")
        const gram = product.nutrients[eleField.dataset.bar].toFixed(1)
        console.log(eleField.dataset.bar, product.nutrients[eleField.dataset.bar].toFixed(1), `${gram}%`)
        eleField.style.width = gram + "%"
    }

    eleBarcode.dataset.barcode = product.barcode

    for (const eleField of eleFields) {
        switch (eleField.dataset.field) {
            case "image":
                eleField.src = product[eleField.dataset.field]
                eleField.alt = product.name
                break

            case "nutritionGrade":
                eleField.textContent = product[eleField.dataset.field].toUpperCase() === "UNKNOWN" ? "N/A" : product[eleField.dataset.field].toUpperCase()
                break

            default:
                eleField.lastChild.textContent = product[eleField.dataset.field] ?? "N/A"
        }
    }

    for (const eleField of eleFieldsNutrients) {
        switch (eleField.dataset.nutrients) {
            case "calories":
                eleField.textContent = product.nutrients[eleField.dataset.nutrients].toFixed(0)
                break

            default:
                const gram = product.nutrients[eleField.dataset.nutrients].toFixed(1)
                eleField.textContent = gram
        }
    }
}
