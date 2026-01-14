document.addEventListener("DOMContentLoaded", function () {

  const city = document.body.getAttribute("data-city");
  if (!city) return;

  const container = document.getElementById("collegeList");
  const searchInput = document.getElementById("searchInput");
  const courseFilter = document.getElementById("courseFilter");
  const approvalFilter = document.getElementById("approvalFilter");
  const resetBtn = document.getElementById("resetFilter");

  let allColleges = [];

  fetch("../data/colleges.json")
    .then(response => response.json())
    .then(data => {

      if (!data[city]) return;
      allColleges = data[city].colleges;
      renderColleges(allColleges);
    })
    .catch(error => console.error("Error loading colleges:", error));

  function renderColleges(colleges) {
    container.innerHTML = "";

    if (colleges.length === 0) {
      container.innerHTML = `<p class="text-center">No colleges found.</p>`;
      return;
    }

    colleges.forEach(college => {
      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-4";

      col.innerHTML = `
        <div class="college-card">
          <div class="college-img">
            <img src="${college.image}"
                 alt="${college.name}"
                 loading="lazy"
                 onerror="this.src='../images/colleges/default.jpg'">
            <span class="college-badge">${college.approval}</span>
          </div>

          <div class="college-body">
            <h5>${college.name}</h5>
            <div class="college-meta">📍 ${college.location}</div>
            <div class="college-meta">🎓 ${college.course}</div>

            <a href="${college.detail_page}">
              View Details →
            </a>
          </div>
        </div>
      `;

      container.appendChild(col);
    });
  }

  function applyFilters() {
    const searchValue = searchInput.value.toLowerCase();
    const courseValue = courseFilter.value.toLowerCase();
    const approvalValue = approvalFilter.value.toLowerCase();

    const filtered = allColleges.filter(college => {
      const matchName = college.name.toLowerCase().includes(searchValue);
      const matchCourse = !courseValue || college.course.toLowerCase().includes(courseValue);
      const matchApproval = !approvalValue || college.approval.toLowerCase().includes(approvalValue);
      return matchName && matchCourse && matchApproval;
    });

    renderColleges(filtered);
  }

  searchInput.addEventListener("input", applyFilters);
  courseFilter.addEventListener("change", applyFilters);
  approvalFilter.addEventListener("change", applyFilters);

  resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    courseFilter.value = "";
    approvalFilter.value = "";
    renderColleges(allColleges);
  });

});
