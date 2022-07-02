export const searchMealByName = async name => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const meals = response.json();
    return meals;
  } catch (error) {
    console.log('error', error);
  }
};

export const searchMealById = async id => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const meals = response.json();
    return meals;
  } catch (error) {
    console.log('error', error);
  }
};

export const viewRandomMeal = async () => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const meals = response.json();
    return meals;
  } catch (error) {
    console.log('error', error);
  }
};

export const searchByFirstLetter = async letter => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const meals = response.json();
    return meals;
  } catch (error) {
    console.log('error', error);
  }
};

export const getAreas = async () => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const meals = response.json();
    return meals;
  } catch (error) {
    console.log('error', error);
  }
};
