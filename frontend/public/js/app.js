let presentationData;

$(function () {
  // Turn off loader initially
  $("#loader-container").hide();

  // Get today's date
  var today = new Date();
  var year = today.getFullYear();
  var startDate = new Date(year, 0, 1); // January 1 of the current year

  // Initialize the datepickers
  $("#from-datepicker-field").datepicker({
    defaultDate: startDate,
    minDate: startDate,
    maxDate: today,
    onSelect: function (selectedDate) {
      var minDate = $(this).datepicker("getDate");
      $("#to-datepicker-field").datepicker("option", "minDate", minDate);
    },
  });

  $("#to-datepicker-field").datepicker({
    defaultDate: today,
    minDate: startDate,
    maxDate: today,
    onSelect: function (selectedDate) {
      var maxDate = $(this).datepicker("getDate");
      $("#from-datepicker-field").datepicker("option", "maxDate", maxDate);
    },
  });

  // Toggle date range fields based on selected option
  $("#select-date-range").on("change", function () {
    if ($(this).val() === "custom_range") {
      $("#date-range-fields").fadeIn();
    } else {
      $("#date-range-fields").fadeOut();
    }
  });

  $("#generate-presentation-container").hide();
  $("#presentation-generated-container").hide();

  $("#home-btn-link").on("click", function () {
    $("#generate-presentation-container").hide();
    $("#presentation-generated-container").hide();
    $("#loader-container").hide();
    $("#main-container").show();
  });

  $("#select-date-range-btn").on("click", function () {
    $("#main-container").fadeOut(function () {
      $("#generate-presentation-container").fadeIn();
    });
  });

  $("#generate-presentation-btn").on("click", async function () {
    if ($("#select-date-range").val() === "Choose") {
      console.log($("#select-date-range").val());
      Swal.fire({
        title: "Error!",
        text: "Choose the Duration",
        icon: "error",
        confirmButtonText: "Okay",
      });
    } else {
      if (
        $("#select-date-range").val() === "custom_range" &&
        ($("#from-datepicker-field").val() === "" ||
          $("#to-datepicker-field").val() === "")
      ) {
        Swal.fire({
          title: "Error!",
          text: "Choose the from and to dates",
          icon: "error",
          confirmButtonText: "Okay",
        });
      } else {
        // Store data in local variables
        let dateRange = $("#select-date-range").val();
        let fromDate = $("#from-datepicker-field").val();
        let toDate = $("#to-datepicker-field").val();

        // reset fields
        $("#select-date-range").prop("selectedIndex", 0);
        $("#from-datepicker-field").val("");
        $("#to-datepicker-field").val("");
        $("#date-range-fields").fadeOut();

        // move from duration picker to loader
        $("#generate-presentation-container").fadeOut(function () {
          $("#loader-container").fadeIn();
        });

        // get presentation data api call
        await generatePresentationFile(dateRange, fromDate, toDate)
          .then(function (presentation) {
            if (presentation.status === 200) {
              presentationData = presentation;
              $("#loader-container").fadeOut(function () {
                $("#presentation-generated-container").fadeIn();
              });
            } else {
              $("#loader-container").fadeOut(function () {
                $("#generate-presentation-container").fadeIn();
              });
            }
          })
          .catch(function (err) {
            console.log(err);
            Swal.fire(
              {
                title: "Error!",
                text: "Something went wrong, Try again",
                icon: "error",
                confirmButtonText: "Okay",
              },
              function () {
                $("#main-container").fadeOut(function () {
                  $("#generate-presentation-container").fadeIn();
                });
              }
            );
          });
      }
    }
  });

  $("#download-slides-btn").on("click", function () {
    download(presentationData);

    $("#presentation-generated-container").fadeOut(function () {
      $("#main-container").fadeIn();
    });
  });
});

async function generatePresentationFile(dateRange, start = "", end = "") {
  if (dateRange === "custom_range" && start !== "" && end !== "") {
    try {
      const presentation = await fetch(
        `http://localhost:8000/generate-presentation/${dateRange}?startDate=${start}&endDate=${end}`
      );
      return presentation;
    } catch (err) {
      console.log("Custom Range Error: " + err);
      Swal.fire(
        {
          title: "Error!",
          text: "Something went wrong, Try again",
          icon: "error",
          confirmButtonText: "Okay",
        },
        function () {
          $("#loader-container").fadeOut(function () {
            $("#generate-presentation-container").fadeIn();
          });
        }
      );
    }
  } else {
    try {
      const presentation = await fetch(
        `http://localhost:8000/generate-presentation/${dateRange}`
      );
      return presentation;
    } catch (err) {
      console.log(err);
      Swal.fire(
        {
          title: "Error!",
          text: "Something went wrong, Try again",
          icon: "error",
          confirmButtonText: "Okay",
        },
        function () {
          $("#loader-container").fadeOut(function () {
            $("#generate-presentation-container").fadeIn();
          });
        }
      );
    }
  }
}

async function download(presentation) {
  const blob = await presentation.blob();
  saveAs(blob, "Ad-Performance.pptx");
}
