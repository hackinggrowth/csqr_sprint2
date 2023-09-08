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



                    