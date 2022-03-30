let $breed_select = $("select.breed_select");
$breed_select.change(function () {
  let id = $(this).children(":selected").attr("id");
  getDogByBreed(id);
  console.log(id);
});

function getBreeds() {
  $.ajax({
    url: "https://api.thedogapi.com/v1/breeds",
    dataType: "json",
    type: "get",
    headers: { "x-api-key": "d5e885d5-6dfc-4a61-a75a-28ee75179949" },

    success: function (data) {
      console.log(data);

      $breed_select.append(function () {
        let output = "";
        $.each(data, function (key, value) {
          output += '<option id="' + value.id + '">' + value.name + "</option>";
        });
        return output;
      });
    },
    error: function (error) {
      console.error(error);
    },
  });
}

function getDogByBreed(breed_id) {
  $.ajax({
    url:
      "https://api.thedogapi.com/v1/images/search?include_breed=1&breed_id=" +
      breed_id,
    dataType: "json",
    type: "get",
    headers: { "x-api-key": "d5e885d5-6dfc-4a61-a75a-28ee75179949" },

    success: function (data) {
      console.log(data);

      $("#breed_image").attr("src", data[0].url);
      $("#breed_data_table tr").remove();

      let breed_data = data[0].breeds[0];
      $.each(breed_data, function (key, value) {
        if (key == "weight" || key == "height") value = value.metric;
        $("#breed_data_table").append(
          "<tr><td>" + key + "</td><td>" + value + "</td></tr>"
        );
      });
    },

    error: function (error) {
      console.error(error);
    },
  });
}

function clearBreed() {
  $("#breed_image").attr("src", "");
  $("#breed_data_table tr").remove();
}

// call the getBreeds function which will load all the Dog breeds into the select control
getBreeds();
