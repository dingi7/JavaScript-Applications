async function getInfo() {
  console.log("TODO...");
  const id = document.getElementById("stopId").value;
  let ulBuses = document.querySelector("#buses");

  try {
    let response = await fetch(
      `http://localhost:3030/jsonstore/bus/businfo/${id}`
    );
    if (!response.ok) {
      throw new Error();
    }
    let data = await response.json();
    ulBuses.replaceChildren();
    let name = data.name;
    let buses = data.buses;
    id.value = "";
    document.getElementById("stopName").textContent = name;
    for (const [key, value] of Object.entries(buses)) {
      let li = document.createElement("li");
      li.textContent = `Bus ${key} arrives in ${value} minutes`;
      ulBuses.appendChild(li);
    }
  } catch (err) {
    ulBuses.replaceChildren();
    document.getElementById("stopName").textContent = "Error";
  }
}
