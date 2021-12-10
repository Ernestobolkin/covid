const regions = {
  world: {
    deaths: 0,
    confirmed: 0,
    recovered: 0,
    critical: 0,
  },
  africa: {
    deaths: 0,
    confirmed: 0,
    recovered: 0,
    critical: 0,
  },
  americas: {
    deaths: 0,
    confirmed: 0,
    recovered: 0,
    critical: 0,
  },
  europe: {
    deaths: 0,
    confirmed: 0,
    recovered: 0,
    critical: 0,
  },
  asia: {
    deaths: 0,
    confirmed: 0,
    recovered: 0,
    critical: 0,
  },
};

const btnWorld = document.querySelector(".btnWorld");
const btnAsia = document.querySelector(".btnAsia");
const btnAfrica = document.querySelector(".btnAfrica");
const btnAmerica = document.querySelector(".btnAmerica");
const btnEurope = document.querySelector(".btnEurope");
const ctx = document.getElementById("myChart");

let myChart = "";

const generateChart = (resData) => {
  const data = [
    resData.deaths,
    resData.confirmed,
    resData.recovered,
    resData.critical,
  ];
  if (myChart !== "") myChart.destroy();
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Deaths", "Confirmed", "Recovered", "Critical"],
      datasets: [
        {
          label: "Covid",
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

let asia = [];
let africa = [];
let america = [];
let europe = [];
const getRegionData = async (data, region) => {
  let data2 = [];
  const baseURLCovid = "https://corona-api.com/countries";
  let ind = 0;
  if (region !== "world") {
    data.data.forEach((country, index) => {
      axios.get(`${baseURLCovid}/${country.cca2}`).then((response) => {
        regions[region].deaths += response.data.data.latest_data.deaths;
        regions[region].confirmed += response.data.data.latest_data.confirmed;
        regions[region].recovered += response.data.data.latest_data.recovered;
        regions[region].critical += response.data.data.latest_data.critical;
        switch (region) {
          case "asia":
            asia.push(response.data.data);
            break;
          case "africa":
            africa.push(response.data.data);
            break;
          case "americas":
            america.push(response.data.data);
            break;
          case "europe":
            europe.push(response.data.data);
            break;
        }
      });
    });
  } else {
    countries = await axios.get(baseURLCovid, [
      {
        headers: "application/json",
      },
    ]);
    countries.data.data.forEach((country) => {
      regions.world.deaths += country.latest_data.deaths;
      regions.world.confirmed += country.latest_data.confirmed;
      regions.world.recovered += country.latest_data.recovered;
      regions.world.critical += country.latest_data.critical;
    });
    generateChart(regions.world);
  }
};
const getCountries = async (region) => {
  let data = [];
  let countries;
  const baseURL =
    "https://intense-mesa-62220.herokuapp.com/restcountries.herokuapp.com/api/v1/";
  console.log("Called API");
  if (region !== "world") {
    countries = await axios.get(
      `https://intense-mesa-62220.herokuapp.com/restcountries.herokuapp.com/api/v1/region/${region}`,
      [
        {
          headers: "Access-Control-Allow-Origin *",
        },
      ]
    );
    getRegionData(countries, region);
  } else {
    getRegionData([], region);
  }
};

btnWorld.addEventListener("click", () => {
  generateChart(regions.world);
});
btnAfrica.addEventListener("click", () => {
  generateChart(regions.africa);
  generateBtn(africa)
});
btnAsia.addEventListener("click", () => {
  generateChart(regions.asia);
  generateBtn(asia)
});
btnAmerica.addEventListener("click", () => {
  generateChart(regions.americas);
  generateBtn(america)
});
btnEurope.addEventListener("click", () => {
  generateChart(regions.europe);
  generateBtn(europe)
});

window.addEventListener("load", () => {
  getCountries("world").catch((err) => {
    console.error(err);
  });
  getCountries("asia").catch((err) => {
    console.error(err);
  });
  getCountries("africa").catch((err) => {
    console.error(err);
  });
  getCountries("europe").catch((err) => {
    console.error(err);
  });
  getCountries("americas").catch((err) => {
    console.error(err);
  });
});
