window.onload = function(){
    document.forms[0].onsubmit = validForm;
}

function validForm(){
    console.log("hello world!");

    var allGood = true;
    var allTags = document.forms[0].getElementsByTagName("*");

    for (var index = 0; index < allTags.length; index++) {
        if (!validTag(allTags[index])) {
            allGood = false;
        } 
    }
    return allGood;

    function validTag(thisTag) {
        var outClass = "";
        var allClasses = thisTag.className.split(" ");

        for (var index = 0; index < allClasses.length; index++) {
            outClass += validBasedOnClass(allClasses[index]) + " ";
        }

        thisTag.className = outClass;

        if (outClass.indexOf("invalid") > -1) {
            invalidLabel(thisTag.parentNode);
            thisTag.focus();
            if (thisTag.nodeName == "INPUT") {
                thisTag.select();
            }
            return false;
        }

        return true;
    

        function validBasedOnClass(thisClass) {
            var classBack = "";

            switch (thisClass) {
                case "":
                case "invalid":
                    break;
                case "email":
                    if (allGood && !validEmail(thisTag.value)) {
                        classBack = "invalid";
                    }
            
                default:
                    classBack += thisClass;
            }
            return classBack;
        }

        function validEmail(email) {
            var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            return re.test(email);
        }

        function invalidLabel(parentTag) {
            if (parentTag.nodeName == "LABEL") {
                parentTag.className += "invalid";
            }
        }
    }
}