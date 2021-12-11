const ctx2 = document.getElementById("myChart2");
let myChart2 = "";

const generateChart2 = (a,b,c,d) => {
  const data = [a, b, c, d];
  if (myChart2 !== "") myChart2.destroy();
  myChart2 = new Chart(ctx2, {
    plugins:[ChartDataLabels],
    type: "pie",
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
          datalabels:{
            color:'black',
            anchor:'center',
          },
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

function myFunction() {
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

const ul = document.querySelector("#myUL");
let testingArr = [];

const generateBtn = (countries) => {
  let buttons = ``;
  countries.forEach((country) => {
    testingArr.push(
      country.latest_data.deaths,
      country.latest_data.confirmed,
      country.latest_data.recovered,
      country.latest_data.critical
    );
    buttons += `<li class="buttons n1" onclick="generateChart2(${testingArr})" data-name=${country.name}><a>${country.name}</a></li>`;
    testingArr = [];
  });
  ul.innerHTML = buttons;
};
