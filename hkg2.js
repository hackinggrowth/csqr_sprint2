

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

function hkgReady() {
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
    // $("input[type=radio][name=ecommerce]").change(function (e) {
    //     $('#eCommerceId').next("div.form-con-info").remove();
    // })
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
        console.log("click");
        let companyCheck = fnText("company", 'kr-ko');
        let mobilePhoneCheck = fnNumber("mobilePhone", 'kr-ko');
        let emailAddressCheck = fnEmail("emailAddress", 'kr-ko');
        let lastNameCheck = fnName("lastName", 'kr-ko');
        let contactInformationArray = getContactInformationArray();
        var retTF = true;
        // $(".error-text").each(function () {
        //     var chkId = $(this).attr("id");
        //     if (chkId != "shipping-section-error" && chkId !=
        //         "contactInformationError" && chkId != "ecommerceErrorText") {
        //         retTF = false;
        //     }
        // });
        
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
        
        console.log(retTF);
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
                // "industry": $('#industry').val(),
                // "ecommerce": $("input[type=radio][name=ecommerce]:checked").val(),
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
            // showLoading(function () {
            //     $.ajax({
            //         url: "https://s73756918.t.eloqua.com/e/f2",
            //         type: "POST",
            //         dataType: 'json',
            //         data: formData,
            //         contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            //         success: function (data) {
            //             offLoading();
            //             console.log("successData: ", data);
            //             location.href = "./newsletter-ok.do"
            //         },
            //         error: function (json) {
            //             offLoading();
            //             if (json.status === 200 && json.statusText ===
            //                 'OK') {
            //                 location.href = "./newsletter-ok.do"
            //             } else {
            //                 console.log("eloquaResponse: ", json)
            //                 alert("Network Error");
            //             }
            //         }
            //     });
            // })
            console.log("send");
            $('.email-enter').hide();
            $('#sortContentList').css('filter', 'none');
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
};

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

function Popup() {
  return {
    el: {
      $wrap: null,
      $openBtn: null,
      $closeBtn: null,
      $focusAbles: null,
      $combackBtn: null
    },
    selector: {
      wrap: '.popup-wrap',
      openBtn: '',
      closeBtn: '.btn-popup-close',
      focusAbles: 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]'
    },
    callback: {
      external: null
    },
    handler: {
      openBtnClick: function openBtnClick(e) {
        this.open();
        e.preventDefault();
      },
      closeBtnClick: function closeBtnClick(e) {
        this.close();
        e.preventDefault();
      }
    },
    open: function open() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          btn = _ref.btn;
      this.utils.scrollDisabled();
      this.el.$wrap.addClass('open');
      this.changeEmbedSrc(); // 접근성
      this.el.$focusAbles.filter(':first').focus();
      this.el.$combackBtn = btn ? $(btn) : $($.fn);
    },
    close: function close() {
      this.utils.scrollEnabled();
      this.el.$wrap.removeClass('open');
      this.stopVideo(); // 접근성
      if (this.el.$openBtn.length) {
        this.el.$openBtn.focus();
      } else if (this.el.$combackBtn && !!this.el.$combackBtn.length) {
        // open() 없이 실행할 경우 대비 $combackBtn && 체크
        this.el.$combackBtn.focus();
      }
    },
    changeEmbedSrc: function changeEmbedSrc() {
      var embedCon = this.el.$wrap.find('.embed-con');
      var iframe = this.el.$wrap.find('iframe');
      var dataSrc = embedCon.attr('data-src');
      if (dataSrc && iframe.attr('src') !== dataSrc) {
        iframe.attr('src', dataSrc);
      }
    },
    stopVideo: function stopVideo() {
      var iframe = this.el.$wrap.find('iframe');
      if (iframe.length > 0) {
        var src = iframe.attr('src');
        iframe.attr('src', src);
      }
    },
    setProperty: function setProperty(el) {
      var $popup = this.el.$wrap = $(el);
      var $body = this.common.el.$body; // 팝업 div 에 인스턴트 저장
      if ($popup.data('scope') === undefined) {
        $popup.data('scope', this);
      } // 팝업 div 속성 data-callback 네이밍 지정된 함수 호출
      if ($popup.data('callback') !== undefined) {
        if (window[$popup.data('callback')] !== undefined) {
          this.callback.external = window[$popup.data('callback')];
        }
      }
      if (this.selector.openBtn === '' && $popup.attr('id')) {
        this.selector.openBtn = "a[href=\"#".concat($popup.attr('id'), "\"]");
      }
      this.el.$openBtn = $body.find(this.selector.openBtn).filter(function () {
        return !$(this).closest('.swiper-slide').length; // swiper 내에 있는 팝업 연결 버튼은 제외 (복제 div 문제로 따로 .on 으로 구현)
      });
      this.el.$closeBtn = $popup.find(this.selector.closeBtn);
      this.el.$focusAbles = $popup.find(this.selector.focusAbles);
    },
    bind: function bind() {
      var _this = this;
      this.el.$openBtn.on('click', this.handler.openBtnClick.bind(this));
      this.el.$closeBtn.on('click', this.handler.closeBtnClick.bind(this)); // 접근성
      this.el.$focusAbles.filter(':last').on('keydown', function (e) {
        if (e.keyCode === 9 && !e.shiftKey) {
          e.preventDefault();
          _this.close();
        }
      });
    },
    init: function init(el) {
      this.common = window.mvJs.common;
      this.utils = window.mvJs.utils;
      this.setProperty(el);
      this.bind();
    }
  };
};

                    