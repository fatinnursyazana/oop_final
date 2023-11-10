function buttonClicked() {
  var brand = document.getElementById("searchData").value; // Get the makeup brand entered

  fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      var makeupDetailsContainer = document.getElementById("makeupDetails");
      makeupDetailsContainer.innerHTML = ""; // Clear previous results

      var table = document.createElement("table");
      table.className = "makeup-table";

      data.forEach((makeup) => {
        var row = table.insertRow();

        var nameCell = row.insertCell(0);
        var priceCell = row.insertCell(1);
        var descriptionCell = row.insertCell(2);
        var websiteCell = row.insertCell(3);
        var imagesCell = row.insertCell(4);

        nameCell.textContent = makeup.name;
        priceCell.textContent = makeup.price;
        descriptionCell.textContent = makeup.description;

        var websiteLink = document.createElement("a");
        websiteLink.href = makeup.product_link;
        websiteLink.target = "_blank";
        websiteLink.textContent = makeup.name;
        websiteCell.appendChild(websiteLink);

        if (Array.isArray(makeup.image_link)) {
          makeup.image_link.forEach((image) => {
            var img = document.createElement("img");
            img.src = image;
            imagesCell.appendChild(img);
          });
        } else if (typeof makeup.image_link === "string") {
          var img = document.createElement("img");
          img.src = makeup.image_link;
          imagesCell.appendChild(img);
        }
      });

      makeupDetailsContainer.appendChild(table);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.getElementById("makeupDetails").innerHTML = "Error occurred";
    });
}
