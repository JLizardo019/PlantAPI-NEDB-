// import { response } from "express";

window.addEventListener("DOMContentLoaded", () => {

    // fetch data button
    const fetchButton = document.getElementById("fetch");
    fetchButton.onclick = async () => {

    const response = await fetch('/plants',{method:"GET"});
    const data = await response.json();
    const list= document.getElementById("plant-list");
    const listItems = data.map((one)=> {
        return `<li>${one.plantId}<br>${one.name}<br>${one.description}<br>${one.growZoneNumber}<br>${one.wateringInterval}<br>${one.imageUrl}</li><br><br>`
    }).join("");
    list.innerHTML = listItems;
  };

  // add plant button
  const addButton = document.getElementById("add_plant");
  addButton.onclick = async () => {

    const id = document.getElementById("plantid").value;
    const name = document.getElementById("name").value;
    const descript = document.getElementById("description").value;
    const grow = document.getElementById("grow").value;
    const water = document.getElementById("water").value;
    const image = document.getElementById("image").value;

    const response = await fetch('/plants',{
        method:"POST",
        body: JSON.stringify({"plantId": id,
        "name": name,
        "description": descript,
        "growZoneNumber": grow,
        "wateringInterval": water,
        "imageUrl": image}),
        headers: {
            "Content-Type": "application/json"
        }
    });
  };

  // delete plant button
  const delButton = document.getElementById("delete_plant");
  delButton.onclick = async () => {

    const id2 = document.getElementById("plantid2").value;

    const response = await fetch(`/plants/${id2}`,{
        method:"DELETE"
    });
  };

  // put plant button
  const upButton = document.getElementById("update_plant");
  upButton.onclick = async () => {

    const id3 = document.getElementById("plantid3").value;
    const attr = document.getElementById("attribute").value;
    const value = document.getElementById("value").value;

    const response = await fetch(`/plants/${id3}`,{
        method:"PUT",
        body: JSON.stringify({"attribute": attr,
        "value": value}),
        headers: {
            "Content-Type": "application/json"
        }
    });
  };


});
