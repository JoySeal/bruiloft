var questions = [{ question: "Van wie krijgen we dit cadeau?", answer: "" }];
var register;
var inputValueBeforeValidation;
var questionIndex = 0; // Keep track of the current question index
var isThankYouMode = false; // Flag to indicate if the form is in thank you mode

document.addEventListener('DOMContentLoaded', function() {
    for (var i = 1; i <= 19; i++) {
        var formId = 'reservationForm' + i;
        attachInputListener(formId);
    }
});

function attachInputListener(formId) {
    var inputField = document.querySelector('#' + formId + ' .username');

    if (inputField) {
        inputField.addEventListener('input', function() {
            // console.log("Updated value:", inputField.value);
            inputValueBeforeValidation = inputField.value; 
        });
    } else {
        // console.error('Input field with class "username" not found in form with ID:', formId);
    }
};

(function () {
    // console.log('Initializing Form');
    var tTime = 100;
    var wTime = 200; 
    var inputLabel = document.querySelector('label[for="username<?php echo $i; ?>"]');
    var inputField = document.querySelector('.username');
    register = document.querySelector('.register');
    var progress = document.querySelector('.progress');

    // init
    // console.log('Form initialization in progress');
    if (questions.length == 0) return;
    putQuestion();

    var forwardButtons = document.querySelectorAll('.forwardButton');
    forwardButtons.forEach(function(forwardButton) {
        forwardButton.addEventListener('click', function() {
            if (isThankYouMode) {
                resetForm();
            } else {
                validate();
            }
        });
    });

    inputField.addEventListener('keyup', function (e) {
        if (e.keyCode == 13 && !isThankYouMode) 
            validate();
    });

    var pattern = /^[a-zA-Z\u00C0-\u017F]+$/;
    function validate() {
        // console.log('validate() called');
        var value = inputValueBeforeValidation.trim();    
        if (value === '') {
            // console.log('Validation failed: Input value is empty');
            return;
        }
        // console.log('Input value:', value); 
        if (!value.match(pattern)) {
            // console.log('Validation failed: Input value does not match pattern');
            return;
        }
        wrong(inputField.focus.bind(inputField));
    
        ok(function () {
            // console.log('ok() called');
            questions[questionIndex].answer = inputField.value;
            if (questionIndex < questions.length - 1) {
                questionIndex++;
                hideCurrent(putQuestion);
            } else {
                showThankYouMessage();
            }
        });
    }

    function resetForm() {
        isThankYouMode = false; 
        inputField.value = '';
        questionIndex = 0;
        putQuestion();
    }
    
    // helper
    function hideCurrent(callback) {
        // console.log('hideCurrent() called');
        const inputContainers = document.querySelectorAll('.inputContainer');
        const inputProgress = document.querySelector('.inputProgress');
        const inputLabels = document.querySelectorAll('label[for^="username"]');
        var thankYouMessages = document.querySelectorAll('.ThankYouMessage');
        
        inputContainers.forEach(function(inputContainer) {
            inputContainer.classList.add('hide');
        });
    
        inputLabels.forEach(function(inputLabel) {
            inputLabel.style.marginLeft = 0;
        });
    
        inputProgress.style.width = 0;
        inputProgress.style.transition = 'none';
    
        thankYouMessages.forEach(function(thankYouMessage) {
            thankYouMessage.classList.remove('hide');
            thankYouMessage.classList.add('margin');
            thankYouMessage.textContent = 'Bedankt ' + inputValueBeforeValidation + ' voor dit mooie cadeau!';
        });
    setTimeout(resetForm, 7000); 
       
}

    function putQuestion() {
        // console.log('putQuestion() called');
        inputLabel.innerHTML = questions[questionIndex].question;
        inputField.type = questions[questionIndex].type || 'text';
        inputField.value = questions[questionIndex].answer || '';
    
        var thankYouMessages = document.querySelectorAll('.ThankYouMessage');
        thankYouMessages.forEach(function(thankYouMessage) {
            thankYouMessage.classList.add('hide');
            thankYouMessage.classList.remove('margin');
            thankYouMessage.textContent = '';
        });
    
        // Show input container
        var inputContainers = document.querySelectorAll('.inputContainer');
        inputContainers.forEach(function(inputContainer) {
            inputContainer.classList.remove('hide');
        });
    
        progress.style.width = (questionIndex * 100 / questions.length) + '%';
        showCurrent(); // Show current question
    }

    function showThankYouMessage() {
        // console.log('Showing thank you message');
        isThankYouMode = true;
        hideCurrent(function() {
            const inputContainers = document.querySelectorAll('.inputContainer');
            inputContainers.forEach(function(inputContainer) {
                inputContainer.classList.add('hide');
            });
            const thankYouMessages = document.querySelectorAll('.ThankYouMessage');
            thankYouMessages.forEach(function(thankYouMessage) {
                thankYouMessage.classList.remove('hide');
                thankYouMessage.classList.add('margin');
            });
        });
    }

    function showCurrent(callback) {
        // console.log('showCurrent() called');
        const inputContainer = document.querySelector('.inputContainer');
        const inputProgress = document.querySelector('.inputProgress');
    
        inputContainer.style.opacity = 1;
        inputProgress.style.transition = '';
        inputProgress.style.width = '100%';
        setTimeout(callback, wTime);
    }
    
    function transform(x, y) {
        var inputContainers = document.querySelectorAll('.inputContainer');
        inputContainers.forEach(function(inputContainer) {
            inputContainer.style.transform = 'translate(' + x + 'px ,  ' + y + 'px)';
        });
    }

    function ok(callback) {
        // console.log('ok() called');
        register.className = '';
        setTimeout(transform, tTime * 0, 0, 10);
        setTimeout(transform, tTime * 1, 0, 0);
        setTimeout(callback, tTime * 2);
    }

    function wrong(callback) {
        register.className = 'wrong';
        for (var i = 0; i < 6; i++) // shaking motion
            setTimeout(transform, tTime * i, (i % 2 * 2 - 1) * 20, 0);
        setTimeout(transform, tTime * 6, 0, 0);
        setTimeout(callback, tTime * 7);
    }
})();



