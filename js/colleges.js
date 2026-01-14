document.addEventListener("DOMContentLoaded", () => {

  const list = document.getElementById("collegeList");
  const searchInput = document.getElementById("searchInput");
  const cityFilter = document.getElementById("cityFilter");
  const courseFilter = document.getElementById("courseFilter");
  const approvalFilter = document.getElementById("approvalFilter");
  const resetBtn = document.getElementById("resetFilter");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  let allColleges = [];
  let filteredColleges = [];
  let visibleCount = 6;

  fetch("data/colleges.json")
    .then(res => res.json())
    .then(data => {

      const addedCities = new Set();

      Object.values(data).forEach(city => {

        // Avoid duplicate city options
        if (!addedCities.has(city.city_name)) {
          cityFilter.innerHTML += `
            <option value="${city.city_name}">
              ${city.city_name}
            </option>
          `;
          addedCities.add(city.city_name);
        }

        city.colleges.forEach(college => {
          allColleges.push({
            ...college,
            city: city.city_name
          });
        });
      });

      populateFilters();
      applyFilters();
    })
    .catch(err => {
      console.error("Failed to load colleges.json", err);
      list.innerHTML = `<p class="text-center text-muted">Unable to load colleges.</p>`;
    });

  function populateFilters() {
    [...new Set(allColleges.map(c => c.course))].forEach(course => {
      courseFilter.innerHTML += `<option value="${course}">${course}</option>`;
    });

    [...new Set(allColleges.map(c => c.approval))].forEach(approval => {
      approvalFilter.innerHTML += `<option value="${approval}">${approval}</option>`;
    });
  }

  function renderColleges() {
    list.innerHTML = "";

    if (filteredColleges.length === 0) {
      list.innerHTML = `
        <div class="col-12 text-center">
          <p class="text-muted">No colleges found matching your criteria.</p>
        </div>
      `;
      loadMoreBtn.style.display = "none";
      return;
    }

    filteredColleges
      .slice(0, visibleCount)
      .forEach(college => {
        list.innerHTML += `
          <div class="col-md-6 col-lg-4">
            <div class="college-card">
              <div class="college-img position-relative">
                <img src="${college.image}"
                     alt="${college.name}"
                     onerror="this.src='images/colleges/default.jpg'">
                <span class="college-badge">${college.approval}</span>
              </div>

              <div class="college-body">
                <h5>${college.name}</h5>
                <div class="college-meta">📍 ${college.city}</div>
                <div class="college-meta">🎓 ${college.course}</div>
                <a href="${college.detail_page}">
                  View Details →
                </a>
              </div>
            </div>
          </div>
        `;
      });

    loadMoreBtn.style.display =
      visibleCount >= filteredColleges.length ? "none" : "inline-block";
  }

  function applyFilters() {
    visibleCount = 6;

    const searchValue = searchInput.value.trim().toLowerCase();

    filteredColleges = allColleges.filter(college =>
      college.name.toLowerCase().includes(searchValue) &&
      (!cityFilter.value || college.city === cityFilter.value) &&
      (!courseFilter.value || college.course === courseFilter.value) &&
      (!approvalFilter.value || college.approval === approvalFilter.value)
    );

    renderColleges();
  }

  loadMoreBtn.addEventListener("click", () => {
    visibleCount += 3;
    renderColleges();
  });

  searchInput.addEventListener("input", applyFilters);
  cityFilter.addEventListener("change", applyFilters);
  courseFilter.addEventListener("change", applyFilters);
  approvalFilter.addEventListener("change", applyFilters);

  resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    cityFilter.value = "";
    courseFilter.value = "";
    approvalFilter.value = "";
    applyFilters();
  });

});
