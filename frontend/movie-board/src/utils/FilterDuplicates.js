export const filterMovies = (page, current, newInput) => {
  let addMovies = [];
  newInput.forEach((newMovie) => {
    for (let i = 0; i < current.length; i++) {
      if (current[i].id == newMovie.id) {
        return;
      }
    }
    addMovies.push(newMovie);
  });
  return page == 1 ? newInput : [...current, ...addMovies];
};

export const filterProviders = (availableProviders, newInput) => {
  let filteredProviders = [];
  newInput.forEach((movieProvider) => {
    for (let i = 0; i < filteredProviders.length; i++) {
      if (filteredProviders[i].source_id == movieProvider.source_id) {
        return;
      }
    }
    let provider = availableProviders.filter(
      (availableProvider) => availableProvider.id == movieProvider.source_id
    );
    if (provider.length) {
      movieProvider.format = provider[0].logo_100px;
    } else {
      movieProvider.format = null;
    }
    filteredProviders.push(movieProvider);
  });
  return filteredProviders;
};

export const filterCast = (results) => {
  let addCast = [];
  results.forEach((person) => {
    for (let i = 0; i < addCast.length; i++) {
      if (addCast[i].id == person.id) {
        return;
      }
    }
    addCast.push(person);
  });
  return addCast;
};
