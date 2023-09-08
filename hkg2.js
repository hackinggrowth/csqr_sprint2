console.log("hkg2");

function showPop(msg, classes, isContact) {
    console.log("isContact", isContact);
    classes = classes || 'estimate-email';
    $('#estimate-email').addClass(classes);
    $('#estimate-email').html(msg);
    $('.pop-email').css('display', 'flex');
    if (undefined == isContact) {
        $('#estimate-email').next('button').focus();
        $('#jumpContact').hide();
    } else {
        $('#jumpContact').show();
        $('#jumpContact').focus();
    }
}

function offPop() {
    $('.pop-email').css('display', 'none');
    $('#estimate-email').removeClass();
}

function jumpContact() {
    let quoteRequestData = getQuoteRequestData();
    var param = "";
    for (var key in quoteRequestData) {
        param += "&" + key + "=" + quoteRequestData[key];
    }
    window.location.href = "/kr-ko/contact.do?celloInSelect=견적문의" + param;
}

$(document).ready(function () {
    // input check
    $("#firstName").keyup(function (e) {
        fnName("firstName", 'kr-ko');
    });
    $("#lastName").keyup(function (e) {
        fnName("lastName", 'kr-ko');
    });
    $("#emailAddress").keyup(function (e) {
        fnEmail("emailAddress", 'kr-ko');
    });
    $("#mobilePhone").keyup(function (e) {
        fnNumber("mobilePhone", 'kr-ko');
    });
    $("#company").keyup(function (e) {
        fnText("company", 'kr-ko');
    });
    $('#industry').change(function (e) {
        fnSelect("industry", 'kr-ko');
    })
    $('#title').change(function (e) {
        fnSelect("title", 'kr-ko');
    })
    $("input[type=radio][name=ecommerce]").change(function (e) {
        $('#eCommerceId').next("div.form-con-info").remove();
    })
    $("input[type=checkbox][name=contactInformation]").change(function (e) {
        getContactInformationArray();
    });
    $('#agree7').click(function (e) {
        agree7Click();
    })
    // 쿠키 셋팅
    /*$("#firstName").val($.cookie('firstName'));
    $("#lastName").val($.cookie('lastName'));
    $("#emailAddress").val($.cookie('emailAddress'));
    $("#mobilePhone").val($.cookie('mobilePhone'));
    $("#company").val($.cookie('company'));*/
    if ($.trim($("#firstName").val()) != "") {
        fnName("firstName", 'kr-ko');
    }
    if ($.trim($("#lastName").val()) != "") {
        fnName("lastName", 'kr-ko');
    }
    if ($.trim($("#emailAddress").val()) != "") {
        fnEmail("emailAddress", 'kr-ko');
    }
    if ($.trim($("#mobilePhone").val()) != "") {
        fnNumber("mobilePhone", 'kr-ko');
    }
    if ($.trim($("#company").val()) != "") {
        fnText("company", 'kr-ko');
    }
    $("#btnSend").click(function () {
        let titleCheck = fnSelect("title", 'kr-ko');
        let industryCheck = fnSelect("industry", 'kr-ko');
        let companyCheck = fnText("company", 'kr-ko');
        let mobilePhoneCheck = fnNumber("mobilePhone", 'kr-ko');
        let emailAddressCheck = fnEmail("emailAddress", 'kr-ko');
        let lastNameCheck = fnName("lastName", 'kr-ko');
        let contactInformationArray = getContactInformationArray();
        var retTF = true;
        $(".error-text").each(function () {
            var chkId = $(this).attr("id");
            if (chkId != "shipping-section-error" && chkId !=
                "contactInformationError" && chkId != "ecommerceErrorText") {
                retTF = false;
            }
        });
        
        if ($('#agree7').is(':checked') && contactInformationArray.length === 0) {
            retTF = false;
        }
        if (!$("#agree5").is(":checked") || !$("#agree1").is(":checked") || !$("#agree2").is(
            ":checked") || !$("#agree3").is(":checked") || !$("#agree4").is(":checked") || !
            $("#agree6").is(":checked")) {
            $("#terms-warning-text").show();
            retTF = false;
        } else {
            $("#terms-warning-text").hide();
        }
        if (lastNameCheck && mobilePhoneCheck && companyCheck && emailAddressCheck) {
            if (!industryCheck) {
                elementRollCenter($('#industryDivId'));
                return;
            }
            if (!titleCheck) {
                console.log("titleCheck");
                elementRollCenter($('#titleDivId'));
                return;
            }
            if (!ecommerceVal) {
                console.log("ecommerceVal");
                elementRollCenter($('#eCommerceId'));
                return;
            }
        }
        if (retTF) {
            var HQ_Optin_Terms = $("#agree5").is(":checked") ? "Yes" : "No";
            var HQ_Optin_Privacy = $("#agree1").is(":checked") ? "Yes" : "No";
            var HQ_Optin_Transfer_Overseas = $("#agree2").is(":checked") ? "Yes" : "No";
            var HQ_Optin_Share_GlobalOffices = $("#agree3").is(":checked") ? "Yes" : "No";
            var HQ_Optin_Age = $("#agree6").is(":checked") ? "Yes" : "No";
            var hqEmailOptIn = $("#agree4").is(":checked") ? "Yes" : "No";
            var hqMktEmail = $("#agree8").is(":checked") ? "Yes" : "No";
            var hqMktPhone = $("#agree9").is(":checked") ? "Yes" : "No";
            var hqMktSms = $("#agree10").is(":checked") ? "Yes" : "No";
            var formData = {
                "elqFormName": "CS_NewsletterSubscribeForm_Kr-Ko",
                "elqSiteID": "73756918",
                "elqCustomerGUID": elqCustomerGUID,
                "elqCookieWrite": "0",
                "lastName": $("#lastName").val(),
                "emailAddress": $("#emailAddress").val(),
                "mobilePhone": $("#mobilePhone").val(),
                "company": $("#company").val(),
                "title": $('#title').val(),
                "industry": $('#industry').val(),
                "ecommerce": $("input[type=radio][name=ecommerce]:checked").val(),
                "agree5": HQ_Optin_Terms,
                "agree1": HQ_Optin_Privacy,
                "agree2": HQ_Optin_Transfer_Overseas,
                "agree3": HQ_Optin_Share_GlobalOffices,
                "agree7": HQ_Optin_Age,
                "agree4": hqEmailOptIn,
                "hQMKTinfoEmail": hqMktEmail,
                "hQMKTinfoPhone": hqMktPhone,
                "hQMKTinfoSMS": hqMktSms
            };
            showLoading(function () {
                $.ajax({
                    url: "https://s73756918.t.eloqua.com/e/f2",
                    type: "POST",
                    dataType: 'json',
                    data: formData,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (data) {
                        offLoading();
                        console.log("successData: ", data);
                        location.href = "./newsletter-ok.do"
                    },
                    error: function (json) {
                        offLoading();
                        if (json.status === 200 && json.statusText ===
                            'OK') {
                            location.href = "./newsletter-ok.do"
                        } else {
                            console.log("eloquaResponse: ", json)
                            alert("Network Error");
                        }
                    }
                });
            })
        }
    });
    // 모두 동의
    $("#all-agree").click(function () {
        if ($(this).is(":checked")) {
            $("input[type='checkbox']").each(function () {
                $(this).prop("checked", true);
            });
        } else {
            $("input[type='checkbox']").each(function () {
                $(this).prop("checked", false);
            });
        }
        getContactInformationArray();
    });
    //하나라도 동의 안되어있으면 모두 동의 체크 해제
    $("input[type='checkbox']").click(function () {
        fnAgreeChk();
    });
    fnAgreeChk = function () {
        var tf = true;
        $("input[type='checkbox']").each(function () {
            if ($(this).prop("id") != "all-agree") {
                if ($(this).is(":checked")) {
                    tf = true;
                } else {
                    tf = false;
                    return false;
                }
            }
        });
        if (tf == false) {
            $("#all-agree").prop("checked", false);
        } else {
            $("#all-agree").prop("checked", true);
        }
        if (!$("#agree5").is(":checked") || !$("#agree1").is(":checked") || !$("#agree2").is(
            ":checked") || !$("#agree3").is(":checked") || !$("#agree4").is(":checked") || !$(
                "#agree6").is(":checked")) {
            $("#terms-warning-text").show();
            retTF = false;
        } else {
            $("#terms-warning-text").hide();
        }
    };
    /* 230817 start */
    $('.selectWrap').click(function (e) {
        // e.preventDefault();
        selectWrapUpd($(this));
    });
    // 실제 모바일 Device에서는 select 클릭으로 작동함
    if (/Android|iPhone/i.test(navigator.userAgent)) {
        $('.selectWrap select').change(function (e) {
            selectWrapMobileUpd($(this))
        });
    }
});

var type;

function goTerms(v, tf) {
    $("#agree" + v).prop("checked", tf);
    fnAgreeChk();
    $('#popup_term0' + v).getInstance().close();
    if (v == '4' && type == 'kr-ko') agree4Click() // Korean environment special treatment
}

function goTermsOpen(v, t) {
    $('#popup_term0' + v).getInstance().open();
    type = t
}

var content = '<p>hello hkg</p>';
  
$('.email-enter > div').html(content);

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
