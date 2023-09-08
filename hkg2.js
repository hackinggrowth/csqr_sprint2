_fnEstimateInit = fnEstimateInit;
fnEstimateInit = function () {
    var quoteData = getGlobalData("hkg_test");
    setGlobalData("estimateResponseData", quoteData);
    clearGlobalData("hkg_test");
    if (quoteData) {
        setDefaultFromTo(quoteData.saveRequestData);
        fnRenderQuoteList(quoteData.quoteResponseData);
    } else {
        $("#type-ocean").click();
        $("#type-fcl").click();
        $("#btn-departure-delet").show();
    }
    // let saveData = getGlobalData("estimateResponseData");
    clearGlobalData("estimateResponseData");
}

fnEstimateInit();

let changeElement = ()=>{
    $('.email-enter > div').load("https://cdn.jsdelivr.net/gh/hackinggrowth/csqr_sprint2@dev/hkg2.html", (data) => {
    console.log("email show!");
    $('.email-enter').show();
});
};

changeElement();

                    