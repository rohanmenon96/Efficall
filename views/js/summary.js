(
    function($)
    {
        let textForm = $("#text_form");
        let textResponse = $("#response-div");

        textForm.submit(function(event){
            event.preventDefault();
            let text = $("#text_summary").val();

            if(text)
            {
                let requestConfig = {
                    method : "POST",
                    url : "/summarize/text",
                    content : "application/json",
                    data : {
                            "textData" : text
                        }
                };

                $.ajax(requestConfig).then(function(response){
                    let pTag = document.createElement("p");
                    let pTagText = document.createTextNode(response.textData);
                    pTag.appendChild(pTagText);

                    textResponse.append(pTag);
                });
            }
        })
    }
)(window.jQuery);