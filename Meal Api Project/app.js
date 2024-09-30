const loadAllProducts = (input) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
       .then(response => response.json())
       .then(data => {
            console.log(data);
            if (!data || !data.meals) {
                let mealDataContainer = document.querySelector('#meal-container');
                mealDataContainer.innerHTML = `<span class="noData">Sorry, no matching results were found for "${input}".</span>`;
                console.log("Not found!");
            }else{
                displayAllMeals(data);
            }
        });
}

const displayAllMeals = (data) => {
    console.log(data);
    data.meals.forEach(meal => {
        console.log(`ID: ${meal.idMeal}, Meal: ${meal.strMeal}`);
    });
    // <p>${meal.strInstructions}</p>
    const mealDataContainer = document.querySelector('#meal-container');
    mealDataContainer.innerHTML = '';
    data.meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('meal-card');
        mealDiv.innerHTML = `
            <h3 class="title">${meal.strMeal}</h3>
            <img class="mealImage" src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <button onclick="viewDetailsCard(${meal.idMeal})">View Details</button>
            `;
        mealDataContainer.appendChild(mealDiv);
    });

}
const addViewCardDetais = (meals) =>{
    const detaisCardContainer = document.querySelector('.mealDetais');
    detaisCardContainer.innerHTML = '';
    console.log(meals);
    meals.forEach(meal => {

        const detaisDiv = document.createElement('div');
        detaisDiv.classList.add('meal-detais');
        detaisDiv.innerHTML = `
            <h3>${meal.strMeal}</h3>
            <img class="mealImage" src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p class="instruction">${meal.strInstructions}</p>
            <p class="catego">Category: ${meal.strCategory}</p>
            <p class="ingre">Ingredients:</p>
            <ul>
                <li>${meal.strIngredient1}</li>
                <li>${meal.strIngredient2}</li>
                <li>${meal.strIngredient3}</li>
                <li>${meal.strIngredient4}</li>
                <li>${meal.strIngredient5}</li>
                <li>${meal.strIngredient6}</li>
                <li>${meal.strIngredient7}</li>
                <li>${meal.strIngredient8}</li>
                <li>${meal.strIngredient9}</li>
            </ul>
            `;
        detaisCardContainer.appendChild(detaisDiv);
    });
}
const viewDetailsCard = (id) =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(response => response.json())
    .then(data => {
        addViewCardDetais(data.meals);
    });
    window.scrollTo({
        top: 0,
        behavior: 'smooth'  // Optional: add smooth scrolling
    });
}
const takeInput = () => {
    const searchInput = document.getElementById('search').value;
    const detaisCardContainer = document.querySelector('.mealDetais');
    detaisCardContainer.innerHTML = '';
    loadAllProducts(searchInput);
    document.getElementById('search').value = '';
}

