var arrayResults = [];

$('.md a').each(function() {
    var href = $(this).attr("href");
    if(href.startsWith("#I")) {

        var a = window.getComputedStyle($(this).get(0), ':after');
        var background = a.getPropertyValue("background");
        background = background.substring(background.indexOf('scroll')+7);
        background = background.substring(0, background.indexOf('auto')-3);
        var unitName = $(this).parent().parent().children().eq(2).children('a').eq(0).text();
        var unitId = href.substring(9, href.length-1);

        //console.log(unitId);
        //console.log(background);
        //console.log(unitName);

        var obj = new Object();
        obj.id = unitId;
        obj.bg  = background;
        obj.name = unitName;
        arrayResults.push(obj);

    }
});

var jsonString= JSON.stringify(arrayResults);

console.log(jsonString);