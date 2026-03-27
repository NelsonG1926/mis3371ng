/*
form-validation.js
Author: Nelson Guevara
Date Created: 3/26/26
Description: JavaScript functions for validating the patient registration form in patient-form.html for assignment2
*/

function updatePainLevelValue(val) {
    document.getElementById("pain_display").innerHTML = val;
}

function checkUserID()  {
    var field=document.getElementById("user_id");
    var errorMessage=document.getElementById("userIDError");
    var value=field.value;

    errorMessage.innerHTML = "";
    if (value.length ==0) return;
    if (value[0] >='0' && value[0] <= '9') {
        errorMessage.innerHTML = "User ID must start with a letter.";
        return;
    }
    if (value.indexOf(" ") != -1) {
        errorMessage.innerHTML = "User ID cannot contain spaces.";
        return;
    }
    var allowed = /^[A-Za-z][A-Za-z0-9_\-]*$/;
    if (!allowed.test(value)) {
        errorMessage.innerHTML = "User ID can only contain letters, numbers, and underscores.";
        return;
    }
    if (value.length < 5) {
        errorMessage.innerHTML = "User ID must be at least 5 characters long.";
        return;
    }
}
function checkpassword() {
    var field=document.getElementById("password");
    var errorMessage=document.getElementById("passwordError");
    var value=field.value;
    errorMessage.innerHTML = "";
    if (value.length ==0) return;
    if (value.length < 8) {
        errorMessage.innerHTML = "Password must be at least 8 characters long.";
        return;
    }
    if (!/[A-Z]/.test(value)) {
        errorMessage.innerHTML = "Password must contain at least one uppercase letter.";
        return;
    }
    if (!/[a-z]/.test(value)) {
        errorMessage.innerHTML = "Password must contain at least one lowercase letter.";
        return;
    }   
    
    if (!/[0-9]/.test(value)) {
        errorMessage.innerHTML = "Password must contain at least one number.";
        return;
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
        errorMessage.innerHTML = "Password must contain at least one special character.";
        return;
    }
    if(value.indexOf('"') != -1 || value.indexOf("'") != -1) {
        errorMessage.innerHTML = "Password cannot contain quotation marks.";
        return;
    }
    errorMessage.innerHTML = "";

}


function checkPasswordMatch() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm_password").value;
    var errorMessage = document.getElementById("confirmPasswordError");
    errorMessage.innerHTML = "";
    if (confirmPassword.length == 0) return;
    if (password !== confirmPassword) {
        errorMessage.innerHTML = "Passwords do not match.";
    } 
}
function showReview() {
    var firstName = document.getElementById("first_name").value;
    var middleName = document.getElementById("middle_initial").value;
    var lastName = document.getElementById("last_name").value;
    var dateOfBirth = document.getElementById("dob").value;
    var socialSecurityNumber = document.getElementById("ssn").value;

    var gender="";
    var genderBtns=document.getElementsByName("gender");
    for (var i=0; i<genderBtns.length; i++) {
        if (genderBtns[i].checked) gender= genderBtns[i].value;
        }
        var email = document.getElementById("email").value.trim();
        var phoneNumber = document.getElementById("phone_number").value.trim();
        var address1= document.getElementById("address1").value.trim();
        var address2 = document.getElementById("address2").value.trim();
        var city = document.getElementById("city").value.trim();
        var state = document.getElementById("state").value.trim();
        var zipCode = document.getElementById("zip").value.trim();

        var vaccinationStatus = "";
        var vaccinationBtns = document.getElementsByName("vaccinated");
        for (var i=0; i<vaccinationBtns.length; i++) {
            if (vaccinationBtns[i].checked) vaccinationStatus = vaccinationBtns[i].value;
        }

        var insurance = "";
        var insuranceBtns = document.getElementsByName("insurance");
        for (var i=0; i<insuranceBtns.length; i++) {
            if (insuranceBtns[i].checked) insurance = insuranceBtns[i].value;
        }

        var symptoms = [];
        if (document.getElementsByName("feel_fever")[0].checked) symptoms.push("Fever");
        if (document.getElementsByName("feel_cough")[0].checked) symptoms.push("Cough");
        if (document.getElementsByName("feel_shortness_of_breath")[0].checked) symptoms.push("Shortness of Breath");
        if (document.getElementsByName("feel_fatigue")[0].checked) symptoms.push("Fatigue");
  if(document.getElementsByName("feel_headache")[0].checked) symptoms.push("Headache");

  var painLevel = document.getElementById("pain_level").value;
  var medHistory = document.getElementById("medical_history").value.trim();

  var userId = document.getElementById("user_id").value.trim();
  userId=userId.toLowerCase();
  document.getElementById("user_id").value = userId;

  var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm_password").value;
     
    var errorCount = 0;

    function fillRow(ValId, statusId, displayValue, isOk, errorMessage){
        document.getElementById(ValId).innerHTML = displayValue;
        if (isOk) {
            document.getElementById(statusId).innerHTML = "<span class='pass'>pass</span>";
        }else {
            document.getElementById(statusId).innerHTML = "<span class='fail'>ERROR: " + errorMessage + "</span>";
            errorCount++;
        }
    }
    var fullName = firstName;
    if (middleName !="") fullName += " " + middleName;
    fullName += " " + lastName;

    var nameOk = true;
    var nameErrorMessage = "";
    if (firstName == "" || lastName == "") {
        nameOk = false;
        nameErrorMessage = "First and last name are required.";
    } else if (!/^[A-Za-z'\-]{1,30}]+$/.test(firstName)) {
        nameOk = false;
        nameErrorMessage = "First name can only contain letters, apostrophes, and hyphens.";
    }
    else if (!/^[A-Za-z'\-]{1,30}]+$/.test(lastName)) {
        nameOk = false;
        nameErrorMessage = "Last name can only contain letters, apostrophes, and hyphens.";
    }
    fillRow('review_name', 'review_name_status', fullName, nameOk, nameErrorMessage);

    var dobOk = false;
    var dobErrorMessage = "";
    if (dateOfBirth == "") {
        dobErrorMessage = "Date of birth is required.";
    } else {
        var dobDate = new Date(dateOfBirth);
        var today = new Date();
        today.setHours(0,0,0,0);
        if (dobDate > today) {
            dobErrorMessage = "Date of birth cannot be in the future.";
        } else {
            var oldest = new Date();
            oldest.setFullYear(today.getFullYear() - 120);
            if (dobDate < oldest) {
                dobErrorMessage = "Date of birth cannot be more than 120 years ago.";
            } else {
                dobOk = true;
            }
        }
    }
    fillRow('review_dob', 'review_dob_status', dateOfBirth, dobOk, dobErrorMessage);

    var ssnOk = false;
    var ssnErrorMessage = "";
    var socialSecurityNumberDisplay = "";
    if (socialSecurityNumber == "") {
        ssnErrorMessage = "Social security number is required.";    
    } else if (!/^\d{3}-\d{2}-\d{4}$/.test(socialSecurityNumber)) {
        ssnErrorMessage = "Social security number must be in the format 123-45-6789.";
    } else {
        ssnOk = true;
        socialSecurityNumberDisplay = "***-**-" + socialSecurityNumber.substring(7);
    
    }
    fillRow('review_ssn', 'review_ssn_status', socialSecurityNumberDisplay, ssnOk, ssnErrorMessage);

    fillRow("review_gender", "review_gender_status", gender, gender != "", "Please select a gender.");

    var emailOk = false;
    var emailErrorMessage = "";
    if (email == "") {
        emailErrorMessage = "Email is required.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        emailErrorMessage = "Email must be in a valid format (e.g., example@domain.com).";
    } else {
        emailOk = true;
    }
    fillRow("review_email", "review_email_status", email, emailOk, emailErrorMessage);

    var phoneOk = false;
    var phoneErrorMessage = "";
    if (phoneNumber == "") {
        phoneErrorMessage = "Phone number is required.";
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(phoneNumber)) {
        phoneErrorMessage = "Phone number must be in the format 123-456-7890.";
    } else {
        phoneOk = true;
    }
    fillRow("review_phone", "review_phone_status", phoneNumber, phoneOk, phoneErrorMessage);

    var shortZip = zipCode.substring(0,5);
    var addressDisplay = address1;
    if (address2 != "") addressDisplay += "<br>" + address2;
    if (city != "" && state != "") {
        addressDisplay += "<br>" + city + ", " + state + " " + shortZip;

        }
    var addressOk = true;
    var addressErrorMessage = "";
    if (address1 ==""){
        addressOk = false;
        addressErrorMessage = "Address line 1 is required.";
    } else if (city == "") {
        addressOk = false;
        addressErrorMessage = "City is required.";
    } else if (state == "") {
        addressOk = false;
        addressErrorMessage = "State is required.";
    } else if (!/^\d{5}(-\d{4})?$/.test(zipCode)) {
        addressOk = false;
        addressErrorMessage = "Zip code must be in the format 12345 or 12345-6789.";
    
    }
    fillRow("review_address", "review_address_status", addressDisplay, addressOk, addressErrorMessage);

    var vacDisplay = vaccinationStatus == "Y" ? "Yes" : (vaccinationStatus == "N" ? "No" : "");
    fillRow("review_vaccinated", "review_vaccinated_status", vacDisplay, vaccinationStatus != "", "Please select a vaccination status.");

    var insuranceDisplay = insurance == "Y" ? "Yes" : (insurance == "N" ? "No" : "");
    fillRow("review_insurance", "review_insurance_status", insuranceDisplay, insurance != "", "Please select an insurance status.");

    fillRow("review_pain", "review_pain_status", painLevel + "/10", true, "");

var histDisplay = medHistory == "" ? "(No medical history provided)" : medHistory;
    fillRow("review_medical", "review_medical_status", histDisplay, true, "");

    var symptomsDisplay = symptoms.length > 0 ? symptoms.join(", ") : "(No symptoms selected)";
    fillRow("review_symptoms", "review_symptoms_status", symptomsDisplay, true, "");

    var userIdOk = false;
    var userIdErrorMessage = "";
    if (userId == "") {
        userIdErrorMessage = "User ID is required.";
    } else if (userId.length < 5) {
        userIdErrorMessage = "User ID must be at least 5 characters long.";
    } else if (!/^[a-z][a-z0-9_\-]{4,29}$/.test(userId)){
        userIdErrorMessage = "User ID must start with a letter and can only contain lowercase letters, numbers, underscores, and hyphens.";
    } else {
        userIdOk = true;
    }

    fillRow("review_user_id", "review_user_id_status", userId, userIdOk, userIdErrorMessage);

    var passwordOk = false;
    var passwordErrorMessage = "";
    if (password == "") {
        passwordErrorMessage = "Password is required.";
    } else if (password.length < 8) {
        passwordErrorMessage = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(password)) {
        passwordErrorMessage = "Password must contain at least one uppercase letter.";
    } else  if (!/[a-z]/.test(password)) {
        passwordErrorMessage = "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(password)) {
        passwordErrorMessage = "Password must contain at least one number.";
    } else if (!/[!@#%^&*()\-_+=\\\/><.,`~]/.test(password)) {
        passwordErrorMessage = "Password must contain at least one special character.";
    } else if (password.indexOf('"') != -1 || password.indexOf("'") != -1) {
        passwordErrorMessage = "Password cannot contain double or single quotes.";
    } else if (password != confirmPassword) {
        passwordErrorMessage = "Passwords do not match.";
    } else if (userId != "" && password.toLowerCase().indexOf(userId.toLowerCase()) != -1) {
        passwordErrorMessage = "Password cannot contain the User ID.";
    } else if (firstName != "" && password.toLowerCase().indexOf(firstName.toLowerCase()) != -1) {
        passwordErrorMessage = "Password cannot contain the first name.";
    } else if (lastName != "" && password.toLowerCase().indexOf(lastName.toLowerCase()) != -1) {
        passwordErrorMessage = "Password cannot contain the last name.";
    } else {
        passwordOk = true;
    }
    var passwordDisplay = passwordOk ? "********" : "";
    fillRow("review_password", "review_password_status", passwordDisplay, passwordOk, passwordErrorMessage);

    var summary = document.getElementById("review_summary");
    if (errorCount == 0) {
        summary.innerHTML = "All information looks good! You can submit the form.";
        summary.className = "all-good";
    } else {
        summary.innerHTML = "Please fix the errors above before submitting the form.";
        summary.className = "haserrors";
    }
    document.getElementById("review_msg").style.display = "none";
}
    function clearReviewPanel1(){
        var valueIds = ["review_name", "review_dob", "review_ssn", "review_gender", "review_email", "review_phone", "review_address", "review_vaccinated", "review_insurance", "review_pain", "review_medical", "review_symptoms", "review_user_id", "review_password"];
        var statusIds = ["review_name_status", "review_dob_status", "review_ssn_status","review_gender_status", "review_email_status", "review_phone_status", "review_address_status", "review_vaccinated_status", "review_insurance_status", "review_pain_status", "review_medical_status", "review_symptoms_status", "review_user_id_status", "review_password_status"];
        for (var i=0; i<valueIds.length; i++) {
            document.getElementById(valueIds[i]).innerHTML = "";
            document.getElementById(statusIds[i]).innerHTML = "";
        }
        document.getElementById("review_summary").innerHTML = "";
        document.getElementById("review_summary").className = "";
        document.getElementById("review_msg").style.display = "block";
        document.getElementById("pain_level").innerHTML = "1";

        var errors = document.querySelectorAll(".error-message");
        for (var i = 0; i < errors.length; i++) {
            errors[i].innerHTML = "";
        }
    }


function submitForm() {
    showReview();

    var fails = document.querySelectorAll(".fail");
    if (fails.length > 0) {
        alert("Please fix the errors in the review panel before submitting the form.");
        return;
    }
    alert("Thank you! The form has been submitted successfully!");

}
