// Defining some helper functions
function getMonthNumberFromName(monthName)
{
    return new Date(`${monthName} 1, 2023`).getMonth();
}


// Extract all date strings to aray
var dates = [];
var currentMonth = new Date().getMonth();
var currentYear = new Date().getFullYear();
$("div#work-experience-cards div.card-header").each(function () {
    var headerString = $(this).text().trim();
    var headerBits = headerString.split(" ");
    var startMonth = getMonthNumberFromName(headerBits[0]);
    var startYear = parseInt(headerBits[1]);
    var endMonth;
    var endYear;

    // Conditionally handle "Present" if specified
    if (headerBits[3].toLowerCase() == "present") {
        endMonth = currentMonth;
        endYear = currentYear;
    }
    else {
        endMonth = getMonthNumberFromName(headerBits[3]);
        endYear = parseInt(headerBits[4]);
    }

    // Get title from sibling element
    var title = $(this).siblings("div.card-body").children(".card-title").text().trim();

    dates.push([
        startMonth,
        startYear,
        endMonth,
        endYear,
        title
    ]);
});


// Empty work experience timeline
function emptyWorkExperienceTimeline()
{
    $("div#work-experience-timeline-header").empty();
    $("div#work-experience-timeline > a").remove()
}


// Populating work experience timeline
function populateWorkExperienceTimeline()
{
    // Timeline math to determine resolution
    var smallestYear = dates[dates.length - 1][1];
    var largestYear = dates[0][3];
    var totalYearDelta = largestYear - smallestYear;
    var totalMonthCount = (totalYearDelta * 12) + 12;
    var timelineWidth = $("div#work-experience-timeline").width();
    var timelineResolution = timelineWidth / totalMonthCount;
    var timelineElementHeight = 40;

    // Add timeline element for each date
    for (var z = 0; z < dates.length; z++)
    {
        var date = dates[z];
        var startYearDelta = date[1] - smallestYear;
        var endYearDelta = largestYear - date[3];
        var leftCount = (startYearDelta * 12) + date[0];
        var rightCount = (endYearDelta * 12) + (12 - date[2]);
        var leftSpacing = leftCount * timelineResolution;
        var rightSpacing = rightCount * timelineResolution;
        var elementWidth = timelineWidth - leftSpacing - rightSpacing

        var timelineLink = $("<a></a>")
            .attr("href", `#work-experience-${z}`)
            .css("display", "block")
            .css("width", `${elementWidth}px`)
            .css("height", `${timelineElementHeight}px`)
            .css("margin-left", `${leftSpacing}px`)
            .css("margin-right", `${rightSpacing}px`)
            .addClass("auto-fade")
            .attr("title", date[4]);

        $("div#work-experience-timeline").append(timelineLink);
    }


    // Add timeline headers for each year
    for (var z = smallestYear; z < largestYear + 1; z++)
    {
        var yearDelta = largestYear - smallestYear + 1;
        var elementWidth = timelineWidth / yearDelta;
        var headerText;

        // Limit the year to last two characters if width sufficiently small
        var headerText = (elementWidth < 55) ? z % 100 : z;

        var timelineHeader = $("<div></div>")
            .css("width", `${elementWidth}px`)
            .text(headerText);

        $("div#work-experience-timeline-header").append(timelineHeader);
    }
}

$(window).on("resize", function()
{
    emptyWorkExperienceTimeline();
    populateWorkExperienceTimeline();
});

populateWorkExperienceTimeline();