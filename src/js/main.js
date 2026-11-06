/**
 * NutriPlan - Main Entry Point
 * 
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */


// تصحيح التنقل 
//  عندما اضغط على الوجبة يجب ان يظهر 
// id="meal-details" 
// ويختفى الباقي
// إدارة حالة الشريط العلوي ليتغير محتواه مع كل انقال

// هعمل كائن بياخد الحاجة الي دوست عليها اودالة واول ما ياخدها يعدل ما يجب
// الحجات الي ممكن ادوس عليها 
//  الشريط الجانبي - ظل الشريط الجانبي للعودة - التبويبات الجانبية فى الشريط الجانبي - كارت الطعام - اضافة الطعام - تغيير شكل العرض
// 
// نبدأ بتغيير العرض 
//  grid-view-btn, list-view-btn 
//  اولا حالة الزر 
// 

//  الأشكال والخلفيات والأيقونات 

const categoryStyles = {
    Beef: {
        icon: "fa-cow",
        card: "bg-gradient-to-br from-red-50 to-rose-50 border-red-200 hover:border-red-400",
        iconBg: "bg-gradient-to-br from-red-400 to-rose-500"
    },

    Chicken: {
        icon: "fa-drumstick-bite",
        card: "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 hover:border-amber-400",
        iconBg: "bg-gradient-to-br from-amber-400 to-orange-500"
    },

    Dessert: {
        icon: "fa-cake-candles",
        card: "bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200 hover:border-pink-400",
        iconBg: "bg-gradient-to-br from-pink-400 to-rose-500"
    },

    Lamb: {
        icon: "fa-bone",
        card: "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 hover:border-orange-400",
        iconBg: "bg-gradient-to-br from-orange-400 to-amber-500"
    },

    Miscellaneous: {
        icon: "fa-bowl-rice",
        card: "bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200 hover:border-slate-400",
        iconBg: "bg-gradient-to-br from-slate-400 to-gray-500"
    },

    Pasta: {
        icon: "fa-bowl-food",
        card: "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 hover:border-yellow-400",
        iconBg: "bg-gradient-to-br from-yellow-400 to-amber-500"
    },

    Pork: {
        icon: "fa-bacon",
        card: "bg-gradient-to-br from-rose-50 to-red-50 border-rose-200 hover:border-rose-400",
        iconBg: "bg-gradient-to-br from-rose-400 to-red-500"
    },

    Seafood: {
        icon: "fa-fish",
        card: "bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 hover:border-cyan-400",
        iconBg: "bg-gradient-to-br from-cyan-400 to-blue-500"
    },

    Side: {
        icon: "fa-plate-wheat",
        card: "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-400",
        iconBg: "bg-gradient-to-br from-green-400 to-emerald-500"
    },

    Starter: {
        icon: "fa-utensils",
        card: "bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200 hover:border-teal-400",
        iconBg: "bg-gradient-to-br from-teal-400 to-cyan-500"
    },

    Vegan: {
        icon: "fa-leaf",
        card: "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 hover:border-emerald-400",
        iconBg: "bg-gradient-to-br from-emerald-400 to-green-500"
    },

    Vegetarian: {
        icon: "fa-seedling",
        card: "bg-gradient-to-br from-lime-50 to-green-50 border-lime-200 hover:border-lime-400",
        iconBg: "bg-gradient-to-br from-lime-400 to-green-500"
    },

    Breakfast: {
        icon: "fa-egg",
        card: "bg-gradient-to-br from-sky-50 to-indigo-50 border-sky-200 hover:border-sky-400",
        iconBg: "bg-gradient-to-br from-sky-400 to-indigo-500"
    },

    Goat: {
        icon: "fa-horse",
        card: "bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200 hover:border-violet-400",
        iconBg: "bg-gradient-to-br from-violet-400 to-purple-500"
    }
};




class GlobalStateAbearance {
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
const searchFiltersSection = new GlobalStateAbearance()
searchFiltersSection.siblingsActiveClasses = ["bg-emerald-600", "text-white", "hover:bg-emerald-700"]
searchFiltersSection.siblingsUnactiveClasses = ["bg-gray-100", "text-gray-700", "hover:bg-gray-200"]
// sidebar
const sidebar = new GlobalStateAbearance()
sidebar.siblingsActiveClasses = ["bg-emerald-50", "text-emerald-700"]
sidebar.siblingsUnactiveClasses = ["text-gray-600", "hover:bg-gray-50"]
// view-toggle
const viewToggle = new GlobalStateAbearance()
viewToggle.siblingsActiveClasses = ["bg-white", "shadow-sm"]
viewToggle.siblingsUnactiveClasses = []


let renderCards
document.body.addEventListener("click", (e) => {
    if (e.target.closest("#sidebar")) {
        const ele = e.target.closest("a")
        if (ele === null) {
            return
        }
        sidebar.setClickedElement(ele)
        Transitions[setNavURL(ele)].apply()
        sidebar.activeOnlyClicked()
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
            const thisId = e.target.closest("[data-meal-id]").dataset.mealId
            renderMeal(`https://nutriplan-api.vercel.app/api/meals/${thisId}`)
            mealDetails.apply()
            setNavURL(document.querySelector("#meal-details"))
        }
    }
    if (e.target.closest("#back-to-meals-btn")) {
        setNavURL(document.querySelector("[href = '#mealsAndRecipes']"))
        mealsAndRecipes.apply()
    }
    if (e.target.closest("[data-field='card']")) {
        const ele = e.target.closest("[data-field='card']")
        render(`https://nutriplan-api.vercel.app/api/meals/filter?category=${ele.dataset.category}&page=1&limit=25`, recipesGrid, templateRecipes)
    }
    if (e.target.closest("#area-grid")) {
        const ele = e.target.closest("button")
        if (ele.dataset.field == "area") {
            renderCards = render(`https://nutriplan-api.vercel.app/api/meals/random?count=25`, recipesGrid, templateRecipes)
        }
        else {
            render(`https://nutriplan-api.vercel.app/api/meals/filter?area=${ele.dataset.field}&page=1&limit=25`, recipesGrid, templateRecipes)
        }
    }
})


class PageState {
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

function setNavURL(eleHasPathName) {
    const pathName = eleHasPathName.getAttribute("href")
    if (pathName === null) {
        let id
        const section = document.querySelector("#meal-details")
        const options = {
            root: document.querySelector("#main-content"),
            rootMargin: "0px",
            threshold: 0.6
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    id = entry.target.getAttribute("id")
                    history.pushState(null, null, `#${id}`)
                }
            })
        }, options)
        observer.observe(section)
        return id
    }
    history.pushState(null, null, `${pathName}`)
    return pathName
}

const mealsAndRecipes = new PageState(["#meal-details", "#products-section", "#foodlog-section"], ["#search-filters-section", "#meal-categories-section", "#all-recipes-section"])
const productScanner = new PageState(["#meal-details", "#search-filters-section", "#meal-categories-section", "#all-recipes-section", "#foodlog-section"], ["#products-section"])
const foodLog = new PageState(["#meal-details", "#products-section", "#search-filters-section", "#meal-categories-section", "#all-recipes-section"], ["#foodlog-section"])
const mealDetails = new PageState(["#search-filters-section", "#meal-categories-section", "#all-recipes-section", "#products-section", "#foodlog-section"], ["#meal-details"])


const Transitions = {
    "#meal-details": mealDetails,
    "#mealsAndRecipes": mealsAndRecipes,
    "#productScanner": productScanner,
    "#foodLog": foodLog
}

async function getData(URL) {
    let response = await fetch(URL)
    response = await response.json()
    return response.results ?? response.result
}


async function render(URL, area, template) {
    const data = await getData(URL)
    recipesCount.textContent = `Showing ${data.length >= 25 ? "25" : data.length} recipes`
    const fragment = document.createDocumentFragment()
    for (const row of data) {
        fragment.appendChild(fill(template.cloneNode(true), row))
    }
    template.dataset.field === "area" || area.replaceChildren()
    area.appendChild(fragment)

}

const recipesCount = document.querySelector("#recipes-count")

const templateRecipes = document.querySelector("#recipes-grid").firstElementChild
const templateCategories = document.querySelector("#categories-grid").firstElementChild
const templateArea = document.querySelector("#area-grid").firstElementChild


const recipesGrid = document.querySelector("#recipes-grid")
const categoriesGrid = document.querySelector("#categories-grid")
const areaGrid = document.querySelector("#area-grid")


const searchInput = document.querySelector("#search-input")

const appLoadingOverlay = document.querySelector("#app-loading-overlay")

document.addEventListener("DOMContentLoaded", function () {
    // render(`https://nutriplan-api.vercel.app/api/meals/random?count=25`, recipesGrid, templateRecipes)
    mealsAndRecipes.apply()
    setNavURL(document.querySelector("[href = '#mealsAndRecipes']"))
    const renderCat = render("https://nutriplan-api.vercel.app/api/meals/categories", categoriesGrid, templateCategories)
    const renderArea = render("https://nutriplan-api.vercel.app/api/meals/areas", areaGrid, templateArea)
    .then(
        () => {
            const ele = document.querySelector("[data-field='area']")
            ele.click()
        })
        // Promise.all([renderCat, renderArea, renderCards]).then(
        //     ()=>{
        //         appLoadingOverlay.classList.toggle("loading", true)
        //     }
        // )

})
searchInput.addEventListener("input", function () {
    const term = this.value
    render(`https://nutriplan-api.vercel.app/api/meals/search?q=${term}&page=1&limit=25`, recipesGrid, templateRecipes)
})
function fill(element, data) {
    let eleFields
    if (element.dataset.field === "area") {
        element.dataset.field = data.name
        element.textContent = data.name
        return element
    }
    if (element.dataset.field === "card") {
        element.dataset.category = data.name
        const style = categoryStyles[element.dataset.category]
        element.classList.add(...style[element.dataset.field].split(" "))
        eleFields = element.querySelectorAll("[data-field]")
        for (const eleField of eleFields) {
            switch (eleField.dataset.field) {
                case "text":
                    element.querySelector("[data-field='text']").textContent = data.name
                    break
                case "icon":
                    eleField.classList.add("fa-solid", ...style.icon.split(" "))
                    break
                default:
                    eleField.classList.add(...style[eleField.dataset.field].split(" "))
            }
        }
        FontAwesome.dom.i2svg({
            node: element
        })
        return element
    }
    eleFields = element.querySelectorAll("[data-field]")
    element.dataset.mealId = data.id
    for (const eleField of eleFields) {
        switch (eleField.dataset.field) {
            case "thumbnail":
                eleField.src = data[eleField.dataset.field]
                break
            default:
                eleField.lastChild.textContent = data[eleField.dataset.field] || "N/A"
        }
    }
    return element
}

async function renderMeal(URL) {
    const data = await getData(URL)
    const {
        ingredients,
        instructions,
    } = data
    const tag = data.tags[0] || "N/A"
    const dataFields = document.querySelector("#meal-details").querySelectorAll("[data-field]")
    const img = document.querySelector("#meal-details img")
    const iframe = document.querySelector("#meal-details iframe")
    img.src = data.thumbnail
    iframe.src = data.youtube

    for (const field of dataFields) {
        switch (field.dataset.field) {
            case "ingredients":
                // ingredientsRender(ingredients)
                break
            case "instructions":
                // instructionsReander(instructions)
                break
            case "tag":
                field.textContent = tag
                break
            default:
                field.textContent = data[field.dataset.field] || "N/A"
        }
    }
}

getData("https://nutriplan-api.vercel.app/api/meals/52772").then((data) => {
    console.log("why this not  working??", data)
})