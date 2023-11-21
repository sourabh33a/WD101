let userForm = document.getElementById("form");
let table = document.getElementById("user-table");
let dob = document.getElementById("dob");
let email = document.getElementById("email");
let message_email = "Email must be valid";

const retrieveEntries = () =>{
    let entries = localStorage.getItem("user-entries");
    if (entries){
        entries = JSON.parse(entries);
    }
    else{
        entries=[];
    }
    return entries;
}
let retrivedentries = retrieveEntries();
const displayentries = () =>{
    const entries = retrieveEntries();
    let str = `<tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Dob</th>
                    <th>Accepted terms?</th>
                </tr>\n`;
    for(let i=0;i<entries.length;i++){
        str += `<tr>
                    <td>${entries[i].name}</td>
                    <td>${entries[i].email}</td>
                    <td>${entries[i].password}</td>
                    <td>${entries[i].dob}</td>
                    <td>${entries[i].checkbox}</td>
                </tr>\n`;
    }
    table.innerHTML = str;
}
let message_dob = "You age must be between 18 and 55 to continue";
dob.addEventListener("input", (e) => {
    let cond_dob = !checkDOB();
    e.preventDefault();
    verify(dob,message_dob,cond_dob);
});
function checkDOB(){
    let age = new Date().getFullYear() - new Date(dob.value).getFullYear();
    if(age < 18 || age>55){
        return false;
    }else{
        return true;
    }
}
function verify(elem,message,cnd){
    if(cnd){
        elem.style.border = "2px solid red";
        elem.setCustomValidity(message);
        elem.reportValidity();
    }else{
        elem.style.border = "2px solid green";
        elem.setCustomValidity('');

    }
}
email.addEventListener("input", (e) => {
    let cond_email = !(email.value.includes("@") && email.value.includes("."));
    e.preventDefault();
    verify(email,message_email,cond_email);
});

let userEntries = [];
const saveuserform= (event) =>{
    event.preventDefault();
    const name = document.getElementById("name").value;
    const Email= document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const dob = document.getElementById("dob").value;

    const checkbox=document.getElementById("checkbox").checked;

    const entry = {
        name:name,
        Email:Email,
        password:password,
        dob:dob,
        checkbox:checkbox
    };
    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
}
userForm.addEventListener("submit",saveuserform);
window.onload = (event) => {
displayentries();
}
