
var customerPoints;
var customerEmail = "";

function main_onLoad()
{
    pageState = 'main';
    
    $('#firstName').labelIntoInput().focus().blur();
    $('#lastName').labelIntoInput().focus().blur();
    $('#email').labelIntoInput().focus().blur();
    $('#reward').attr('disabled', "disabled");
    $('#rewardButton').attr('disabled', "disabled");
    disableRewardArea();
    $('#newSearch').attr('disabled', "disabled")
        .css('opacity', 0.3);
    
    customerPoints = new flipCounter('flip-counter', {
        inc: 2,
        pace: 51,
        value: '0000',
        auto: false
    });
    
    $('#searchBox').autocomplete({
        html: true,
        autoFocus: true,
        minLength: 0,
        source: function(request, responseCallback) {
            hideError();
            
            if (lastAjax['autocomplete'] != undefined) {
                lastAjax['autocomplete'].abort();
            }
            
            if (request.term.length == 0) {
                responseCallback();
                return;
            }
            
            $('#loader').css('top', ($('#searchBox').innerHeight() - $('#loader').outerHeight()) / 2 + $('#searchBox').offset().top)
                .css('left', $('#searchBox').offset().left + $('#searchBox').innerWidth() - $('#loader').outerWidth() - 30)
                .css('opacity', 0.6);
                // TODO: .animate({opacity: 0.6});
            
            var results = [];
            lastAjax['autocomplete'] = $.getJSON(autocompleteUri, {
                term: request.term
            }).done(function(response) {
                if (response.success) {
                    results = $.map(response.customers, function(item) {
                        return {
                            label: item.name +" <span style='color:gainsboro; font-size:small; margin-left:10px;'>"+ item.email +"</span>",
                            value: item.name,
                            name: item.name,
                            loyaltyNum: 123456,
                            email: item.email,
                            points: item.points
                        };
                    });
                    results.push({
                        label: "New Customer",
                        value: request.term
                    });
                    
                    $('.ui-autocomplete').css('marginLeft', 0);
                } else {
                    showError(response.errorMsg);
                }
            }).fail(function(response) {
                // readyState of 0 means the request never actually completed (ie: aborted)
                if (response.readyState != 0) {
                    showError("Cannot reach the database.");
                }
            }).always(function() {
                $('#loader').css('opacity', 0);
                responseCallback(results);
            });
        },
        select: function(event, ui) {
            if (lastAjax['autocomplete'] != undefined) {
                lastAjax['autocomplete'].abort();
            }
            
            if (ui.item.email == undefined) {
                log.info("Creating new customer ("+ $('#searchBox').val() +") ...");
                
                ui.item.value = $('#searchBox').val();
                openCreate(ui.item.value);
            } else {
                openCustomer(ui.item);
            }
        },
        open: function(event, ui) {
            $('.ui-autocomplete').css('marginLeft', 20)
                .css('width', "-=40px");
            $('.ui-autocomplete').children().last().css('background', "#F1FAE8");
            $('.ui-autocomplete').children().last().css('border-top', "1px solid #EAEAEA");
        }
    });
    
    $('#createCustomer').click(function(event) {
        doCreate();
    });
    
    $('#newSearch').click(function() {
        if (pageState == 'new') {
            closeCreate();
        } else if (pageState == 'selected') {
            closeCustomer();
        }
    });
    
    $('#rewardButton').click(function() {
        doReward();
    });
    
    $('.createInput').keydown(function(event) {
        if ((window.event ? event.keyCode : event.which) == 13) {
            doCreate();
        }
    });
    
    $('.rewardInput').keydown(function(event) {
        if ((window.event ? event.keyCode : event.which) == 13) {
            doReward();
        }
    });
    
    $('#reward').numeric({negative: false});
    
    $('.wide').width(2172);
    
    setInterval(pingServer, pingDelay);
    
    $('#searchBox').focus();
    
    if (storefrontId != 0) {
        animateTopBar();
    } else {
        $.blockUI({
            message: $('#storefrontSelector'),
            css: {
                top: ($(document).height() - $('#storefrontSelector').innerHeight()) / 2,
                left: ($(document).width() - $('#storefrontSelector').innerWidth()) / 2,
                width: '',
                cursor: 'default'
            },
            overlayCSS: {
                cursor: 'default'
            }
        });
        
        $('#locationBox').autocomplete({
            html: true,
            autoFocus: true,
            source: function(request, responseCallback) {
                var matches = filterArray(storefronts, function(storefront) {
                    return (storefront.code.search(new RegExp(request.term, "i")) != -1) || (storefront.name.search(new RegExp(request.term, "i")) != -1);
                });
                
                var results = $.map(matches, function(item) {
                    return {
                        label: item.name +" <span style='color:gainsboro; font-size:small; margin-left:10px;'>"+ item.address +"</span>",
                        value: item.name,
                        id: item.id,
                        code: item.code
                    };
                });
                responseCallback(results);
            },
            open: function(event, ui) {
                isAutocompleteOpen = true;
                $('.ui-autocomplete').css('marginLeft', 20)
                    .css('width', "-=20px");
            },
            close: function(event, ui) {
                isAutocompleteOpen = false;
                $('.ui-autocomplete').css('marginLeft', 0)
                    .css('width', "+=20px");
            },
            select: function(event, ui) {
                $('#locationBox').attr('disabled', "disabled");
                $('#autocompleteArrow').attr('disabled', "disabled");
                $('#storefrontSelector').animate({
                    opacity: 0.3
                });
                
                $.getJSON(setStorefrontUri, {
                    storefrontId: ui.item.id
                }).done(function(response) {
                    if (response.success) {
                        storefrontId = ui.item.id;
                        storefrontName = response.storefrontName;
                        
                        animateTopBar();
                    } else {
                        alert(response.errorMsg);
                    }
                }).fail(function() {
                    alert("System is unreachable.");
                }).always(function() {
                    $.unblockUI();
                    $('#searchBox').focus();
                });
            }
        });
        
        $('#autocompleteArrow').click(function() {
            if (isAutocompleteOpen) {
                $('#locationBox').focus().autocomplete('close');
            } else {
                $('#locationBox').focus()
                    .autocomplete('option', 'minLength', 0)
                    .autocomplete('search', "")
                    .autocomplete('option', 'minLength', 1);
            }
        });
        
        $('#locationBox').focus();
    }
}

function animateTopBar()
{
    $("#logoutBar a").attr('href', logoutUri);
    $('#userFullName').text(userFullName);
    $('#storefrontName').text(storefrontName);
    
    $('.centerPostLogin').slideDown(400);
    $('.centerPreLogin').animate({
        opacity: 0.01
    }, 400);
}

function enableRewardArea(callback)
{
    callback = callback ? callback : function() { };
    
    $('#reward').removeAttr('disabled');
    $('#rewardButton').removeAttr('disabled');
    
    $('#rewardArea').animate({opacity: 1}, 300, callback);
}

function disableRewardArea(callback)
{
    callback = callback ? callback : function() { };
    
    $('#rewardArea').animate({opacity: 0.3}, 300, callback);
    
    $('#reward').attr('disabled', "disabled");
    $('#rewardButton').attr('disabled', "disabled");
}

function clearRewardArea()
{
    $('.rewardInput').focus().val("").blur();
}

function enableCreateArea(callback)
{
    callback = callback ? callback : function() { };
    
    $('.createInput').removeAttr('disabled');
    $('#createCustomer').removeAttr('disabled');
    $('.createBg').animate({opacity: 1}, callback);
}

function disableCreateArea(callback)
{
    callback = callback ? callback : function() { };
    
    $('.createInput').attr('disabled', "disabled");
    $('#createCustomer').attr('disabled', "disabled");
    $('.createBg').animate({opacity: 0.3}, callback);
}

function clearCreateArea()
{
    $('.createInput').focus().val("").blur();
}

function clearSearch()
{
    $('#searchBox').focus().val("").blur();
}

function openCreate(term)
{
    hideError();
    
    if (lastAjax['autocomplete'] != undefined) {
        lastAjax['autocomplete'].abort();
    }
    
    $('#newSearch').removeAttr('disabled')
        .animate({opacity: 1});
    
    $('.createBg').fadeIn();
    $('.selectCustomer').animate({
        opacity: 0.01
    });
    $('.customerArea').animate({
        height: $('.createBg').outerHeight()
    });
    
    $('#firstName').focus();
    if (term != undefined) {
        if (term.indexOf("@") != -1) {
            $('#email').focus().val(term).blur();
            $('#firstName').focus();
        } else {
            if (term.indexOf(" ") != -1) {
                var parts = term.split(" ");
                $('#lastName').focus().val(ucfirst(parts.pop())).blur();
                $('#firstName').focus().val(ucfirst(parts.join(" "))).blur();
                $('#email').focus();
            } else {
                $('#firstName').focus().val(ucfirst(term)).blur();
                $('#lastName').focus();
            }
        }
    }
    pageState = "new";
}

function closeCreate()
{
    hideError();
    
    clearCreateArea();
    clearSearch();
    
    $('#newSearch').attr('disabled', "disabled")
        .animate({opacity: 0.3});
    
    $('.selectCustomer').css('opacity', 1);
    $('.createBg').fadeOut();
    $('.customerArea').animate({
        height: $('.selectCustomer').outerHeight()
    });
    
    $('#searchBox').focus();
    pageState = "main";
}

function openCustomer(customer, transfers)
{
    hideError();
    
    transfers = transfers || [];
    
    $('.infoCustomer').show();
    
    selectCustomer(customer.name, customer.email, customer.loyaltyNum, customer.points);
    
    $('#newSearch').removeAttr('disabled')
        .animate({opacity: 1});
    
    $('.selectCustomer').animate({
        left: -$('.selectCustomer').outerWidth()
    });
    if (pageState == "new") {
        $('.createBg').animate({
            left: -$('.createBg').outerWidth() * 2
        }, function() {
            $('.createBg').slideUp(function() {
                $('.createBg').css('left', -$('.createBg').outerWidth());
                $('.infoCustomer').css('left', -$('.infoCustomer').outerWidth());
            });
        });
        $('.infoCustomer').show().animate({
            left: -$('.infoCustomer').outerWidth() * 2
        }, function() {
            if (transfers.length > 0) {
                showTransfers(transfers);
            }
        });
    } else if (pageState == "main") {
        $('.infoCustomer').show().animate({
            left: -$('.infoCustomer').outerWidth()
        }, function() {
            if (transfers.length > 0) {
                showTransfers(transfers);
            }
        });
    }
    $('.customerArea').animate({
        height: $('.infoCustomer').outerHeight()
    });
    
    enableRewardArea(function() {
        $('#reward').focus();
    });
    pageState = "selected";
}

function closeCustomer()
{
    hideError();
    
    clearRewardArea();
    clearSearch();
    
    $('#newSearch').attr('disabled', "disabled")
        .animate({opacity: 0.3});
    
    $('.selectCustomer').css('opacity', 1).animate({
        left: 0
    });
    $('.infoCustomer').show().animate({
        left: 0
    });
    $('.customerArea').animate({
        height: $('.selectCustomer').outerHeight()
    });
    
    disableRewardArea();
    $('#searchBox').focus();
    pageState = "main";
}

function doCreate()
{
    hideError();
    
    var firstName = $('#firstName').val();
    if (firstName == "" || firstName == "First Name") {
        showError("You must supply a <b>first name</b>.");
        $('#firstName').focus();
        return;
    }
    
    var lastName = $('#lastName').val();
    if (lastName == "" || lastName == "Last Name") {
        showError("You must supply a <b>last name</b>.");
        $('#lastName').focus();
        return;
    }
    
    var email = $('#email').val();
    if (email == "" || email == "email@address.com") {
        showError("You must supply an <b>email address</b>.");
        $('#email').focus();
        return;
    }
    
    disableCreateArea();
    $('#loader').css('top', ($('.createBg').innerHeight() - $('#loader').outerHeight()) / 2 + $('#mainDiv').offset().top)
        .css('left', ($('.createBg').innerWidth() - $('#loader').outerWidth()) / 2 + $('#mainDiv').offset().left - parseInt($('.customerArea').css('marginLeft')))
        .css('opacity', 0.6);
        // TODO: .animate({opacity: 0.6});
    
    $.getJSON(createUri, {
        'email': email,
        'firstName': firstName,
        'lastName': lastName
    }).done(function(response) {
        if (response.success) {
            var customer = {};
            customer.name = ucfirst(firstName) + " " + ucfirst(lastName);
            customer.email = email;
            customer.loyaltyNum = 123456;
            customer.points = 0;
            
            clearCreateArea();
            enableCreateArea();
            $('#loader').css('opacity', 0);
            
            $('#rewardMessage').text("Points added for signing up!");
            openCustomer(customer, response.transfers);
        } else {
            showError(response.errorMsg);
            
            clearCreateArea();
            enableCreateArea();
            $('#loader').css('opacity', 0); // TODO: .animate({opacity: 0});
            $('#firstName').focus();
        }
    }).fail(function() {
        showError("Database is unreachable.");
        
        clearCreateArea();
        enableCreateArea();
        $('#loader').css('opacity', 0); // TODO: .animate({opacity: 0});
        $('#firstName').focus();
    }).always(function() {
        
    });
}

function doReward()
{
    hideError();
    
    var subtotal = $('#reward').val();
    if (subtotal == "") {
        showError("You must supply a purchase <b>subtotal</b>.");
        return;
    }
    
    disableRewardArea();
    $('#loader').css('top', ($('#reward').innerHeight() - $('#loader').outerHeight()) / 2 + $('#reward').offset().top)
        .css('left', $('#reward').offset().left + $('#reward').innerWidth() - $('#loader').outerWidth() - 30)
        .css('opacity', 0.6);
        // TODO: .animate({opacity: 0.6});
    
    $.getJSON(rewardUri, {
        'email': customerEmail,
        'subtotal': subtotal
    }).done(function(response) {
        if (response.success) {
            if (response.transfers.length > 0) {
                $('#rewardMessage').text("Points added for purchase!");
                showTransfers(response.transfers);
                // TODO: display the total points someplace?
            } else {
                $('#rewardedValue').text("");
                $('#rewardMessage').text("No points earned on this order.");
                showTransferMessage();
            }
            $('#newSearch').focus();
        } else {
            showError(response.errorMsg);
            
            enableRewardArea();
            clearRewardArea();
            $('#reward').focus();
        }
    }).fail(function() {
        showError("Database is unreachable.");
        
        enableRewardArea();
        clearRewardArea();
        $('#reward').focus();
    }).always(function() {
        $('#loader').css('opacity', 0); // TODO: .animate({opacity: 0});
    });
}

// TODO: maybe we should pass the customer object into this instead of all the attributes
function selectCustomer(name, email, loyaltyNum, points)
{
    customerEmail = email;
    
    $('.user').text(name);
    $('.info #loyaltyNum').text(loyaltyNum);
    $('.info #emailLabel').text(email);
    customerPoints.setValue(parseInt(points));
}

function showTransfers(transfers)
{
    var transfer = transfers.shift();
    
    var totalPoints = parseInt(customerPoints.getValue()) + parseInt(transfer.points);
    var totalTime = (transfer.points < 13) ? 1 : 2;
    customerPoints.incrementTo(totalPoints, totalTime, 51);
    
    $('#rewardedValue').text("+" + transfer.points);
    showTransferMessage(function() {
        if (transfers.length > 0) {
            showTransfers(transfers);
        }
    });
}

function showTransferMessage(callback)
{
    $('.rewarded').animate({opacity: 1, top: 0}, 500, function() {
        $('.rewarded').delay(1500).animate({opacity: 0, top: -15}, 500, function() {
            $('.rewarded').css('top', 15);
            if (callback != undefined) {
                callback();
            }
        });
    });
}

function pingServer()
{
    $.get(pingUri);
}