(
    function($)
    {
        let textForm = $("#text_form");
        let textResponse = $("#response-div");
        let context = $("#context-text");

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

                    let pContextTag = document.createElement("p");
                    let pContextText = document.createTextNode(response.conText);
                    pContextTag.appendChild(pContextText);

                    context.append(pContextTag);
                });
            }
        })
    }
)(window.jQuery);