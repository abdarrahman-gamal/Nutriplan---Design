
import { getData } from './get-data/get-data.js'
import { fillProductDetailModal, fillLogMealModal, fillAreaOneAtime, fillCategoryOneAtime, fillMealsOneAtime, renderAreas, renderCategories, renderMeals, renderOneMeal, renderProducts, fillProductsOneAtime } from './render-data/render-data.js'

async function loadAndRenderArea() {
    const areas = await getData.areas("https://nutriplan-api.vercel.app/api/meals/areas")
    renderAreas(fillAreaOneAtime, templateArea, areaGrid, areas)
}

async function loadAndRenderCategories() {
    const categories = await getData.categories("https://nutriplan-api.vercel.app/api/meals/categories")
    renderCategories(fillCategoryOneAtime, templateCategories, categoriesGrid, categories)
    FontAwesome.dom.i2svg({
        node: categoriesGrid
    })
}

async function loadAndRenderRandomMeals() {
    const meals = await getData.mealsSearchOrFilterOrRandom("https://nutriplan-api.vercel.app/api/meals/random?count=25")
    renderMeals(fillMealsOneAtime, templateRecipes, recipesGrid, meals, recipesCount)
}

async function loadAndRenderMeals(URL) {
    const meals = await getData.mealsSearchOrFilterOrRandom(URL)
    renderMeals(fillMealsOneAtime, templateRecipes, recipesGrid, meals, recipesCount)
}

async function loadAndRenderOneMeal(URL) {
    const mealData = await getData.oneMeal(URL)
    renderOneMeal(mealData)
    console.log(mealData)
    return mealData
}

async function loadAndRenderProducts(URL) {
    const productsData = await getData.products(URL)
    renderProducts(fillProductsOneAtime, templateProducts, productsGrid, productsData)

}


class viewSwitcher {
    constructor(hideParts = [], showParts = []) {
        this.hideParts = hideParts
        this.showParts = showParts
    }
    apply() {
        for (const part of this.hideParts) {
            document.querySelector(`${part}`).classList.toggle("hidden", true)
        }
        for (const part of this.showParts) {
            document.querySelector(`${part}`).classList.toggle("hidden", false)
        }
    }
}
const mealsAndRecipes = new viewSwitcher(["#meal-details", "#products-section", "#foodlog-section"], ["#search-filters-section", "#meal-categories-section", "#all-recipes-section"])
const productScanner = new viewSwitcher(["#meal-details", "#search-filters-section", "#meal-categories-section", "#all-recipes-section", "#foodlog-section"], ["#products-section"])
const foodLog = new viewSwitcher(["#meal-details", "#products-section", "#search-filters-section", "#meal-categories-section", "#all-recipes-section"], ["#foodlog-section"])
const mealDetails = new viewSwitcher(["#search-filters-section", "#meal-categories-section", "#all-recipes-section", "#products-section", "#foodlog-section"], ["#meal-details"])

const recipesCount = document.querySelector("#recipes-count")
const templateRecipes = document.querySelector("#recipes-grid").firstElementChild
const templateCategories = document.querySelector("#categories-grid").firstElementChild
const templateArea = document.querySelector("#area-grid").firstElementChild
const recipesGrid = document.querySelector("#recipes-grid")
const categoriesGrid = document.querySelector("#categories-grid")
const areaGrid = document.querySelector("#area-grid")
const searchInput = document.querySelector("#search-input")
const sideBar = document.querySelector("#sidebar")
const sideBarOverlay = document.querySelector("#sidebar-overlay")
const appLoadingOverlay = document.querySelector("#app-loading-overlay")
const titleParagraph = document.querySelector("#title-paragraph")
const title = document.querySelector("#title")
const templateProducts = document.querySelector("#products-grid").firstElementChild
const productsGrid = document.querySelector("#products-grid")
const productSearch = document.querySelector("#product-search-input")
const productBarcode = document.querySelector("#barcode-input")
const mealServingsCount = document.querySelector("#meal-servings")
const logMealModal = document.querySelector("#log-meal-modal")
const productDetailModal = document.querySelector("#product-detail-modal")
let tempProdOrMealObj = {}
let tempDay = {}
let thisModalData = {}

const Transitions = {
    "#meal-details": mealDetails,
    "#mealsAndRecipes": mealsAndRecipes,
    "#productScanner": productScanner,
    "#foodLog": foodLog
}

function titleAndParagraph() {
    console.log(window.location.hash)
    switch (window.location.hash) {
        case "#mealsAndRecipes":
            title.textContent = "Meals & Recipes"
            titleParagraph.textContent = "Discover delicious and nutritious recipes tailored for you"
            break;
        case "#productScanner":
            title.textContent = "Product Scanner"
            titleParagraph.textContent = "Search packaged foods by name or barcode"
            break;
        case "#foodLog":
            title.textContent = "Food Log"
            titleParagraph.textContent = "Track your daily nutrition and food intake"
            break;
        case "#mealDetails":
            title.textContent = "Recipe Details"
            titleParagraph.textContent = "View full recipe information and nutrition facts"
            break;
    }
}

class tabsAbearance {
    constructor() {
        this.siblingsActiveClasses = []
        this.siblingsUnactiveClasses = []
    }
    setClickedElement(clickedElement) {
        this.clickedElement = clickedElement
        let levelTwoSiblings = []
        const childElements = clickedElement?.parentElement?.parentElement?.children
        if (childElements === undefined) return
        for (const element of childElements) {
            levelTwoSiblings.push(...element.children)
        }
        const siblingsArray = clickedElement.parentElement.children.length >= 2 ? clickedElement.parentElement.children : levelTwoSiblings
        this.siblings = Array.from(siblingsArray) // html collection no map => array
        this.applyState()
    }
    applyState() {
        if (this.siblings === undefined) return
        const stateEntries = this.siblings.map(
            (el) => {
                const notActive = this.siblingsUnactiveClasses[0] ? el.classList.contains(this.siblingsUnactiveClasses[0]) : !el.classList.contains(this.siblingsActiveClasses[0])
                const active = this.siblingsActiveClasses[0] ? el.classList.contains(this.siblingsActiveClasses[0]) : !el.classList.contains(this.siblingsUnactiveClasses[0])
                if (notActive) { // special token list. It uses the .contains() method 
                    return [el, "unactive"]
                }
                else if (active) {
                    return [el, "active"]
                }
            }
        )
        this.stateMap = new Map(stateEntries) // لأنها تحتفظ بال obj كمفاتيح
    }
    activateDeactivate(el) {
        if (!el) { return }
        for (const deactiveSide of this.siblingsUnactiveClasses) {
            let shouldActivate
            deactiveSide && (shouldActivate = el.classList.contains(deactiveSide))
            deactiveSide && el.classList.toggle(deactiveSide, !shouldActivate)
        }
        for (const activeSide of this.siblingsActiveClasses) {
            let shouldActivate
            activeSide && (shouldActivate = !el.classList.contains(activeSide))
            activeSide && el.classList.toggle(activeSide, shouldActivate)
        }
        this.applyState()
    }
    activeOnlyClicked() {
        this.stateMap?.forEach((val, key) => {
            if (val === "active") this.activateDeactivate(key)
        })
        this.activateDeactivate(this.clickedElement)
        this.applyState()
    }
}
// search-filters-section
const searchFiltersSection = new tabsAbearance()
searchFiltersSection.siblingsActiveClasses = ["bg-emerald-600", "text-white", "hover:bg-emerald-700"]
searchFiltersSection.siblingsUnactiveClasses = ["bg-gray-100", "text-gray-700", "hover:bg-gray-200"]
// sidebar
const sidebar = new tabsAbearance()
sidebar.siblingsActiveClasses = ["bg-emerald-50", "text-emerald-700"]
sidebar.siblingsUnactiveClasses = ["text-gray-600", "hover:bg-gray-50"]
// view-toggle
const viewToggle = new tabsAbearance()
viewToggle.siblingsActiveClasses = ["bg-white", "shadow-sm"]
viewToggle.siblingsUnactiveClasses = []

function setNavURL(eleHasPathName) {
    const pathName = eleHasPathName.getAttribute("href")
    history.pushState(null, null, `${pathName}`)
    return pathName
}

document.body.addEventListener("click", (e) => {
    if (e.target.closest("#sidebar a")) {
        const ele = e.target.closest("a")
        if (ele === null) {
            return
        }
        sidebar.setClickedElement(ele)
        Transitions[setNavURL(ele)].apply()
        sidebar.activeOnlyClicked()
        titleAndParagraph()
    }
    if (e.target.closest("#search-filters-section")) {
        searchFiltersSection.setClickedElement(e.target.closest("button"))
        searchFiltersSection.activeOnlyClicked()
    }
    if (e.target.closest("#view-toggle")) {
        viewToggle.setClickedElement(e.target.closest("button"))
        viewToggle.activeOnlyClicked()
    }
    if (e.target.closest("#recipes-grid")) {
        if (e.target.closest("[data-meal-id]")) {
            appLoadingOverlay.classList.toggle("loading", false)
            const thisId = e.target.closest("[data-meal-id]").dataset.mealId
            loadAndRenderOneMeal(`https://nutriplan-api.vercel.app/api/meals/${thisId}`).then(
                (data) => {
                    console.log(data)
                    thisModalData = structuredClone(getData.modalData(data))
                    fillLogMealModal(thisModalData, logMealModal, mealServingsCount)
                    console.log(thisModalData)
                    appLoadingOverlay.classList.toggle("loading", true)
                }
            ).catch(error => {
                console.error("Initialization failed:", error);
            })
            mealDetails.apply()
            setNavURL(e.target.closest("[data-meal-id]"))
            console.log()
            titleAndParagraph()
        }
    }
    if (e.target.closest("#back-to-meals-btn")) {
        setNavURL(document.querySelector("[href = '#mealsAndRecipes']"))
        mealsAndRecipes.apply()
        titleAndParagraph()
    }
    if (e.target.closest("[data-field='categoryCard']")) {
        const ele = e.target.closest("[data-field='categoryCard']")
        loadAndRenderMeals(`https://nutriplan-api.vercel.app/api/meals/filter?category=${ele.dataset.category}&page=1&limit=25`)

    }
    if (e.target.closest("#area-grid")) {
        const ele = e.target.closest("button")
        if (ele.dataset.field == "area") {
            loadAndRenderRandomMeals()
        }
        else {
            loadAndRenderMeals(`https://nutriplan-api.vercel.app/api/meals/filter?area=${ele.dataset.field}&page=1&limit=25`)
        }
    }
    if (e.target.closest("#header-menu-btn")) {
        sideBar.classList.toggle("-translate-x-full", false)
        sideBarOverlay.classList.toggle("hidden", false)
    }
    if (e.target.closest("#sidebar-close-btn")) {
        sideBar.classList.toggle("-translate-x-full", true)
        sideBarOverlay.classList.toggle("hidden", true)
    }
    if (e.target.closest("#sidebar-overlay")) {
        sideBar.classList.toggle("-translate-x-full", true)
        sideBarOverlay.classList.toggle("hidden", true)
    }
    if (e.target.closest(".product-category-btn")) {
        const nutri = e.target.closest(".product-category-btn").dataset.nutri
        loadAndRenderProducts(`https://nutriplan-api.vercel.app/api/products/category/${nutri}`)
        console.log(`https://nutriplan-api.vercel.app/api/products/category/${nutri}`)
    }
    if (e.target.closest("#sidebar-overlay")) {
        sideBar.classList.toggle("-translate-x-full", true)
        sideBarOverlay.classList.toggle("hidden", true)
    }
    if (e.target.closest("#decrease-servings")) {
        mealServingsCount.value = +mealServingsCount.value > 0.5 ? +mealServingsCount.value - 0.5 : mealServingsCount.value
        fillLogMealModal(thisModalData, logMealModal, mealServingsCount)
    }
    if (e.target.closest("#increase-servings")) {
        mealServingsCount.value = +mealServingsCount.value < 10 ? +mealServingsCount.value + 0.5 : mealServingsCount.value
        fillLogMealModal(thisModalData, logMealModal, mealServingsCount)
    }
    if (e.target.closest("#cancel-log-meal")) {
        logMealModal.classList.toggle("flex", false)
        logMealModal.classList.toggle("hidden", true)
    }
    if (e.target.closest("#log-meal-btn")) {
        logMealModal.classList.toggle("hidden", false)
        logMealModal.classList.toggle("flex", true)
    }
    if (e.target.closest(".product-card")) {
        productDetailModal.classList.toggle("hidden", false)
        productDetailModal.classList.toggle("flex", true)
        const ele = e.target.closest(".product-card")
        const barcode = ele.dataset.barcode
        getData.products(`https://nutriplan-api.vercel.app/api/products/barcode/${barcode}`).then((data) => {
            fillProductDetailModal(data, productDetailModal)

        })
    }
    if (e.target.closest("button.close-product-modal")) {
        productDetailModal.classList.toggle("hidden", true)
        productDetailModal.classList.toggle("flex", false)
    }
})


document.addEventListener("DOMContentLoaded", function () {
    appLoadingOverlay.classList.toggle("loading", false)
    // loadAndRenderRandomMeals()
    mealsAndRecipes.apply()
    setNavURL(document.querySelector("[href = '#mealsAndRecipes']"))
    Promise.all([
        loadAndRenderCategories(),
        loadAndRenderArea(),
        loadAndRenderRandomMeals()
            .then(
                () => {
                    const ele = document.querySelector("[data-field='area']")
                    searchFiltersSection.setClickedElement(ele)
                    searchFiltersSection.activeOnlyClicked()
                })
    ]).then(() => {
        appLoadingOverlay.classList.toggle("loading", true)
    }).catch(error => {
        console.error("Initialization failed:", error);
    })

})
searchInput.addEventListener("input", function () {
    const term = this.value
    loadAndRenderMeals(`https://nutriplan-api.vercel.app/api/meals/search?q=${term}&page=1&limit=25`)
})
productSearch.addEventListener("input", function () {
    const term = this.value
    loadAndRenderProducts(`https://nutriplan-api.vercel.app/api/products/search?q=${term}&page=1&limit=24`)
})
productBarcode.addEventListener("input", function () {
    const term = this.value
    loadAndRenderProducts(`https://nutriplan-api.vercel.app/api/products/barcode/${term}`)
})

loadAndRenderProducts("https://nutriplan-api.vercel.app/api/products/search?q=nutella&page=1&limit=24")



// obj = {
//     name: `name`,
//     secondname: brand || `${count} serving`,
//     type: 'Recipe' || 'Product',
//     timeOfAdd: "HH:MM (AM|pm",
//     colories: 1270,
//     protin: "111g",
//     carb: "111g",
//     fat: "111g"
// }

// tempDay = {
//     daytext:"sat",
//     daynum:1,
//     calories: 3232, sum of all day cal
//     items: 4 aray length
// }

// metadata= {
//     date,
//     time
// }