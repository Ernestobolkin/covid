const world = {
  deaths: 0,
  confirmed: 0,
  recovered: 0,
  critical: 0,
};
const africa = {
  deaths: 0,
  confirmed: 0,
  recovered: 0,
  critical: 0,
};
const america = {};
const europe = {};
const asia = {};

const btnWorld = document.querySelector(".btnWorld");
const btnAsia = document.querySelector(".btnAsia");
const btnAfrica = document.querySelector(".btnAfrica");
const btnAmerica = document.querySelector(".btnAmerica");
const btnEurope = document.querySelector(".btnEurope");
const ctx = document.getElementById("myChart");

let myChart = "";

const generateChart = (data) => {
  if (myChart === "") {
    myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Deaths", "Confirmed", "Recovered", "Critical"],
        datasets: [
          {
            label: "# of Cases",
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
  }else{
    myChart.data.datasets[0].data = data;
    myChart.update()
  }
};

const getCountries = async (region) => {
  let data = [];
  let countries;
  // https://corona-api.com/countries/IL
  switch (region) {
    case "world":
      if (world.deaths === 0) {
        countries = await axios.get("https://corona-api.com/countries", [
          {
            headers: "application/json",
          },
        ]);
        countries.data.data.forEach((country) => {
          world.deaths += country.latest_data.deaths;
          world.confirmed += country.latest_data.confirmed;
          world.recovered += country.latest_data.recovered;
          world.critical += country.latest_data.critical;
        });
      }
      data = [world.deaths, world.confirmed, world.recovered, world.critical];
      generateChart(data);
      break;
    case "africa":
      if (africa.deaths === 0) {
        countries = await axios.get("https://corona-api.com/countries", [
          {
            headers: "application/json",
          },
        ]);
        countries.data.data.forEach((country) => {
          africa.deaths += country.latest_data.deaths / 2;
          africa.confirmed += country.latest_data.confirmed / 2;
          africa.recovered += country.latest_data.recovered / 2;
          africa.critical += country.latest_data.critical / 2;
        });
      }
      data = [
        africa.deaths,
        africa.confirmed,
        africa.recovered,
        africa.critical,
      ];
      generateChart(data);
      break;
  }
};

btnWorld.addEventListener("click", () => {
  getCountries("world").catch((err) => {
    console.error(err.response);
  });
});

btnAfrica.addEventListener("click", () => {
  getCountries("africa").catch((err) => {
    console.error(err.response);
  });
});
