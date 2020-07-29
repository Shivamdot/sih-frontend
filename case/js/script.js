function getColor(colors) {
    clrs = ""
    colors.forEach(color => {
        rgb = color.rgb;
        clrs = clrs + `<div class="c" style="background-color: rgb(${rgb[0]},${rgb[1]},${rgb[2]});"></div>`;
    });
    return clrs;
}

function updateCase(caseID) {
    const URL = baseURL + "/case"

    $('.loader').addClass('show');

    $.ajax({
        url: URL,
        type: 'GET',
        beforeSend: function(request) {
            request.setRequestHeader("caseID", caseID);
        },
        success: function(data){ 
            if(data.error){
                $('.loader').removeClass('show')
                console.log(data.error);
            } else {
                let res_case = data.case;
                $('.nav .box .case_name').text(res_case.name);

                $('.main .target .sides').empty();

                if(res_case.target.sides != null) {
                    res_case.target.sides.forEach(side => {
                        $('.main .target .sides').append(`
                            <div class="side">
                                <div class="blck">
                                    <img src="${baseURL + '/images/' + caseID + '/' + side.side + '.jpg'}" alt="">
                                </div>
                                <div class="info">
                                    <p class="name">Side : ${side.side}</p>
                                    <p class="feature">Features : error</p>
                                    <p class="clrs">Colors :- </p>
                                    <div class="colors">
                                        ${getColor(side.colors)}
                                    </div>
                                </div>
                            </div>
                        `)
                    });
                }
                
                $('.loader').removeClass('show')
            }
        },
        error: function(err) {
            $('.loader').removeClass('show')
            console.log("error" + err);
        }
    });
}

$(document).ready(function(){
    let caseID = localStorage.getItem('caseID');
    if(caseID) {
        updateCase(caseID);
    } else {
        console.log('CaseID not found');
        let url = "/cases";
        window.location.href = url; 
    }
});

$('.nav .box .refresh').click(function() {
    updateCase();
});

$('.main .target .add .add_side').click(function() {
    $('.loader').addClass('show')
    let url = "/case/settarget";
    window.location.href = url; 
});