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

                    let pContextTag = document.createElement("ul");

                    let array = response.conText;

                    for(let i = 0; i < array.length; i++)
                    {
                        let list = document.createElement("li");
                        let text = document.createTextNode(array[i]);
                        list.appendChild(text);

                        pContextTag.append(list);
                    }

                    context.append(pContextTag);
                });
            }
        })
    }
)(window.jQuery);